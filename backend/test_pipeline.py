import sys
import os
import asyncio
import json

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.services.dart_fetcher import dart_fetcher
from backend.services.llm_client import llm_client

async def test_full_pipeline(query="카카오", year=2024):
    print(f"\n==========================================")
    print(f"🚀 [1단계] OpenDART 기업 검색: '{query}'")
    comp = dart_fetcher.find_company(query)
    if not comp:
        print(f"❌ 기업을 찾을 수 없습니다: {query}")
        return
    print(f"✅ 기업 확인: {comp['corp_name']} (종목코드: {comp['stock_code']}, DART법인코드: {comp['corp_code']})")

    print(f"\n🚀 [2단계] OpenDART 실시간 재무제표 수집 ({year}년 사업보고서)")
    fin_res = dart_fetcher.get_financials(comp['corp_code'], bsns_year=year)
    if fin_res.get('status') != '000':
        print(f"❌ 재무제표 수집 실패: {fin_res.get('message')}")
        return
    fin = fin_res['financials']
    print(f"✅ 재무제표 수집 완료:")
    print(f"   · 매출액: {fin['revenue']['current']:,}원 (YoY: {fin['revenue']['growth_rate']:+.2f}%)")
    print(f"   · 영업이익: {fin['operating_profit']['current']:,}원 (YoY: {fin['operating_profit']['growth_rate']:+.2f}%)")
    print(f"   · 영업이익률: {fin['operating_margin']['current']:.2f}% (변동폭: {fin['operating_margin']['diff_pp']:+.2f}%p)")

    print(f"\n🚀 [3단계] OpenDART 사업보고서 원문 발췌 (MD&A)")
    mda = dart_fetcher.get_latest_report_mda(comp['corp_code'], bsns_year=year)
    if mda:
        print(f"✅ 공시 접수번호: {mda['rcept_no']}, 보고서명: {mda['report_nm']}")
        print(f"   원문 텍스트 길이: {len(mda['mda_text']):,}글자 추출 완료")
    else:
        print("⚠️ 공시 원문 다운로드 건너뜀 (기본 템플릿 사용)")

    print(f"\n🚀 [4단계] Google Gemini LLM 실적 분석 및 브리핑 생성 (Live API)")
    system_prompt = (
        "당신은 공시 및 재무제표 분석 전문 금융 수석 애널리스트입니다.\n"
        "제공된 DART 재무 수치와 사업보고서 원문을 바탕으로 투자자를 위한 객관적인 실적 변화 브리핑을 작성하세요."
    )
    user_prompt = f"""
[분석 대상]
- 기업명: {comp['corp_name']} ({comp['stock_code']})
- 대상 연도: {year}년
- 매출액: {fin['revenue']['current']:,}원 (전년 대비 {fin['revenue']['growth_rate']:+.2f}%)
- 영업이익: {fin['operating_profit']['current']:,}원 (전년 대비 {fin['operating_profit']['growth_rate']:+.2f}%)
- 영업이익률: {fin['operating_margin']['current']:.2f}% (변동폭: {fin['operating_margin']['diff_pp']:+.2f}%p)

[공시 원문 발췌]
{mda['mda_text'][:3000] if mda else "공시 내용 분석 중"}

다음 JSON 포맷으로만 응답해주세요:
{{
  "headline": "핵심 실적 변동 요약 한 줄 헤드라인",
  "summary": "투자자를 위한 3~4문장의 총평 및 종합 브리핑",
  "reasons": ["실적 변동 원인 1", "실적 변동 원인 2"],
  "outlook": "향후 사업 전망 및 전략"
}}
"""
    ai_res = await llm_client._call_gemini(system_prompt, user_prompt)
    if ai_res:
        print(f"✅ Gemini AI 브리핑 생성 성공! (모델: {ai_res.get('_model', 'Gemini')})")
        print(f"   · 헤드라인: {ai_res.get('headline')}")
        print(f"   · 총평: {ai_res.get('summary')}")
        print(f"   · 주요 원인: {ai_res.get('reasons')}")
        print(f"   · 전망: {ai_res.get('outlook')}")
    else:
        print("❌ Gemini 호출 실패")

if __name__ == "__main__":
    asyncio.run(test_full_pipeline("카카오", 2024))
