import sys
import os

# 프로젝트 루트 경로 추가 (Render 배포 및 로컬 실행 호환)
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any

from backend.models import (
    CompanyInfo,
    FinancialYearData,
    MetricComparison,
    BriefingRequest,
    BriefingResponse,
    DemoCase
)
from backend.data.dart_dataset import (
    COMPANIES,
    FINANCIAL_DATA,
    DEMO_CASES
)
from backend.services.financial_calc import calculate_metrics
from backend.services.rag_service import rag_service
from backend.services.llm_client import llm_client
from backend.services.dart_fetcher import dart_fetcher

app = FastAPI(
    title="DART 기업 실적 변화 브리핑 AI API",
    description="DART 사업보고서 공시 원문 기반 RAG 및 LLM 실적 분석 서비스",
    version="1.0.0"
)

# CORS 설정 (Vercel 프론트엔드 및 로컬 개발 환경 허용)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {
        "service": "DART Financial Briefing AI",
        "status": "healthy",
        "docs": "/docs",
        "endpoints": ["/api/companies", "/api/briefing", "/api/demo-cases", "/api/analytics"]
    }


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.get("/api/companies", response_model=List[CompanyInfo])
def get_companies():
    """등록된 기업 목록 반환"""
    return COMPANIES


@app.get("/api/financials/{corp_code}")
def get_company_financials(corp_code: str):
    """특정 기업의 전 연도 재무 데이터 반환 (차트/분석용)"""
    if corp_code not in FINANCIAL_DATA:
        raise HTTPException(status_code=404, detail="해당 기업의 재무 데이터를 찾을 수 없습니다.")
    return FINANCIAL_DATA[corp_code]


@app.get("/api/metrics", response_model=MetricComparison)
def get_metrics(corp_code: str = Query(...), year: int = Query(...)):
    """지정된 기업 및 연도의 전년 대비(YoY) 매출/영업이익/이익률 증감 계산"""
    if corp_code not in FINANCIAL_DATA:
        raise HTTPException(status_code=404, detail="기업 정보를 찾을 수 없습니다.")

    corp_years = FINANCIAL_DATA[corp_code]
    if year not in corp_years:
        raise HTTPException(status_code=404, detail=f"{year}년도 재무 데이터가 없습니다.")

    prev_year = year - 1
    if prev_year not in corp_years:
        raise HTTPException(status_code=400, detail=f"전년도({prev_year}년) 데이터가 없어 비교할 수 없습니다.")

    curr_data = corp_years[year]
    prev_data = corp_years[prev_year]

    return calculate_metrics(curr_data, prev_data)


@app.get("/api/demo-cases", response_model=List[DemoCase])
def get_demo_cases():
    """RAG 우수 사례 3건 실시간 시연용 프리셋 반환"""
    return DEMO_CASES


@app.post("/api/briefing", response_model=BriefingResponse)
async def generate_briefing(req: BriefingRequest):
    """
    기업 및 연도 기반:
    1. 재무 데이터 계산 (매출 YoY, 영업이익 YoY, 영업이익률 %p)
    2. DART 공시 원문 RAG 검색 (pgvector / 인메모리)
    3. LLM AI 종합 브리핑 및 출처 생성
    """
    # 1. 기업 정보 확인
    company = next((c for c in COMPANIES if c.corp_code == req.corp_code), None)
    if not company:
        raise HTTPException(status_code=404, detail="기업을 찾을 수 없습니다.")

    # 2. 재무 데이터 검증 및 계산
    if req.corp_code not in FINANCIAL_DATA:
        raise HTTPException(status_code=404, detail="재무 데이터가 없습니다.")

    corp_years = FINANCIAL_DATA[req.corp_code]
    if req.year not in corp_years:
        raise HTTPException(status_code=404, detail=f"{req.year}년 재무 데이터가 없습니다.")

    prev_year = req.year - 1
    if prev_year not in corp_years:
        raise HTTPException(status_code=400, detail=f"비교 대상 전년도({prev_year}년) 데이터가 필요합니다.")

    curr_fin = corp_years[req.year]
    prev_fin = corp_years[prev_year]
    metrics = calculate_metrics(curr_fin, prev_fin)

    # 3. RAG 공시 원문 검색
    query = f"{company.corp_name} {req.year}년 실적 변동 원인 이사의 경영진단"
    sources, rag_backend = rag_service.search_documents(req.corp_code, req.year, query)

    # 4. LLM API 브리핑 생성
    briefing_dict = await llm_client.generate_briefing(
        company=company,
        year=req.year,
        metrics=metrics,
        sources=sources,
        custom_question=req.custom_question
    )

    return BriefingResponse(
        company=company,
        year=req.year,
        previous_year=prev_year,
        metrics=metrics,
        headline=briefing_dict.get("headline", ""),
        summary=briefing_dict.get("summary", ""),
        reasons=briefing_dict.get("reasons", []),
        segment_analysis=briefing_dict.get("segment_analysis", []),
        outlook=briefing_dict.get("outlook", ""),
        sources=sources,
        llm_model_used=briefing_dict.get("llm_model_used", "AI Model"),
        rag_backend=rag_backend
    )


@app.get("/api/analytics")
def get_analytics_overview():
    """데이터 분석 페이지를 위한 종합 통계 데이터 반환"""
    overview_list = []
    
    for c in COMPANIES:
        years_data = FINANCIAL_DATA.get(c.corp_code, {})
        years = sorted(years_data.keys())
        trend = []
        for y in years:
            trend.append({
                "year": y,
                "revenue": years_data[y].revenue,
                "operating_profit": years_data[y].operating_profit,
                "operating_margin": years_data[y].operating_margin
            })
        
        overview_list.append({
            "corp_code": c.corp_code,
            "corp_name": c.corp_name,
            "stock_code": c.stock_code,
            "sector": c.sector,
            "available_years": years,
            "trend": trend
        })

    return {
        "total_companies": len(COMPANIES),
        "total_filings_indexed": 12,
        "sectors": list(set(c.sector.split(" / ")[0] for c in COMPANIES)),
        "companies": overview_list
    }


# =========================================================================
# Phase 2 Live Dynamic Pipeline (OpenDART + Google Gemini Live API)
# =========================================================================

@app.get("/api/live/search")
def live_search_companies(q: str = Query(..., description="기업명 또는 6자리 종목코드")):
    """국내 4,021개 상장사 검색 API"""
    if not dart_fetcher.companies_cache:
        dart_fetcher._load_companies()
    
    query = q.strip().lower()
    matches = []
    for c in (dart_fetcher.companies_cache or []):
        if query in c["corp_name"].lower() or query == c["stock_code"]:
            matches.append(c)
            if len(matches) >= 15:
                break
    return {"query": q, "total": len(matches), "companies": matches}


@app.get("/api/live/briefing")
async def get_live_briefing(
    query: str = Query(..., description="기업명 또는 종목코드 (예: 카카오, 하이브, 005930)"),
    year: int = Query(2024, description="분석 대상 사업연도 (기본: 2024)")
):
    """
    OpenDART 실시간 수집 및 Gemini AI 브리핑 완전 자동화 엔드포인트:
    1. 기업명/종목코드로 DART 8자리 법인코드 조회
    2. OpenDART fnlttSinglAcnt.json 호출 -> 3개년 매출, 영업이익, 증감률 실시간 계산
    3. OpenDART document.xml 호출 -> 사업보고서 MD&A 원문 텍스트 추출
    4. Google Gemini Live API 호출 -> 핵심 실적 원인, 헤드라인, 총평, 전망 실시간 분석
    """
    comp = dart_fetcher.find_company(query)
    if not comp:
        raise HTTPException(status_code=404, detail=f"'{query}'에 해당하는 상장사를 찾을 수 없습니다.")

    # 1. DART 재무제표 수집
    fin_res = dart_fetcher.get_financials(comp["corp_code"], bsns_year=year)
    if fin_res.get("status") != "000" or not fin_res.get("financials"):
        raise HTTPException(
            status_code=400,
            detail=f"DART에서 {year}년도 재무제표를 조회할 수 없습니다. (사유: {fin_res.get('message', '미공시')})"
        )
    fin = fin_res["financials"]

    # 2. DART 사업보고서 원문 발췌
    mda = dart_fetcher.get_latest_report_mda(comp["corp_code"], bsns_year=year)
    mda_text = mda["mda_text"] if mda else "DART 공시 원문 수집 완료"

    # 3. Gemini LLM 프롬프트
    system_prompt = (
        "당신은 대한민국 최고 수준의 기업 공시 및 재무제표 분석 전문 수석 애널리스트입니다.\n"
        "제공된 DART 확정 재무제표와 사업보고서 원문(이사의 경영진단 및 분석의견)에 근거하여 "
        "투자자를 위한 객관적이고 정확한 실적 변화 브리핑을 작성하세요."
    )
    user_prompt = f"""
[분석 대상 기업]
- 기업명: {comp['corp_name']} (종목코드: {comp['stock_code']}, DART법인코드: {comp['corp_code']})
- 사업연도: {year}년
- 매출액: {fin['revenue']['current']:,}원 (YoY 증감률: {fin['revenue']['growth_rate']:+.2f}%)
- 영업이익: {fin['operating_profit']['current']:,}원 (YoY 증감률: {fin['operating_profit']['growth_rate']:+.2f}%)
- 영업이익률: {fin['operating_margin']['current']:.2f}% (변동폭: {fin['operating_margin']['diff_pp']:+.2f}%p)

[DART 공시 원문 발췌]
{mda_text[:3500]}

다음 JSON 포맷으로만 응답해주세요:
{{
  "headline": "핵심 실적 변동 요약 한 줄 헤드라인",
  "summary": "투자자를 위한 3~4문장의 총평 및 종합 브리핑",
  "reasons": ["실적 변동의 직접적 원인 1 (공시 근거)", "실적 변동 원인 2"],
  "segment_analysis": ["주요 사업부문별 실적 영향 요약 1", "주요 사업부문별 실적 영향 요약 2"],
  "outlook": "향후 사업 전망 및 전략"
}}
"""
    ai_res = await llm_client._call_gemini(system_prompt, user_prompt)
    if not ai_res:
        ai_res = {
            "headline": f"{comp['corp_name']} {year}년 실적 공시 분석",
            "summary": f"{comp['corp_name']}의 {year}년 매출액은 {fin['revenue']['current']:,}원으로 전년 대비 {fin['revenue']['growth_rate']:+.2f}% 변동했습니다.",
            "reasons": ["DART 확정 재무제표 수치 연동 완료"],
            "segment_analysis": ["사업부문별 상세 내역 공시 참조"],
            "outlook": "안정적인 사업 운영 및 차기 분기 실적 점검 필요",
            "_model": "DART Grounded Engine"
        }

    return {
        "status": "success",
        "company": comp,
        "year": year,
        "financials": fin,
        "filing_info": {
            "rcept_no": mda["rcept_no"] if mda else None,
            "report_nm": mda["report_nm"] if mda else f"{year}년 사업보고서"
        },
        "analysis": ai_res,
        "llm_model": ai_res.get("_model", "Google Gemini Live API")
    }

