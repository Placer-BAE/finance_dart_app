import React from 'react';
import { Target, AlertCircle, Database, Cpu, Layout, CheckCircle2, ArrowRight, UserCheck, Layers, ExternalLink } from 'lucide-react';

export default function IdeaPitchPage({ onGoToPrototype }) {
  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs font-semibold text-blue-300 mb-3">
          <span>5주차 팀별 과제: 아이디어 기획 및 UI 프로토타입 발표</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
          DART 기업 실적 변화 브리핑 AI
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
          수백 페이지의 DART 사업보고서를 일일이 뒤질 필요 없이, 기업과 연도만 고르면 
          <strong> 실적 변동률 계산과 회사가 공식 공시한 이유를 원문 출처와 함께 즉시 브리핑</strong>해 주는 금융 AI 서비스
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={onGoToPrototype}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
          >
            <span>👉 UI 프로토타입 바로 체험하기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <span className="text-xs text-slate-400">
            * 5주차 LMS 제출용 「발표 URL」 및 「프로토타입 URL」을 동시에 만족하도록 구성되었습니다.
          </span>
        </div>
      </div>

      {/* 1. 대상 사용자 및 페르소나 & 문제 정의 */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">1</div>
          <h2 className="text-xl font-bold text-slate-900">대상 사용자 및 문제 정의 (Target & Problem)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Persona 1 */}
          <div className="p-5 rounded-xl border border-blue-100 bg-blue-50/30">
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span>페르소나 1: 증권사 주니어 애널리스트 및 리서치 RA</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              실적 시즌마다 수십 개 기업의 사업보고서와 감사보고서를 검토해야 하며, 기업이 공시한 공식 원문 표현을 토대로 신속하게 실적 코멘트 리포트를 작성해야 함.
            </p>
          </div>

          {/* Persona 2 */}
          <div className="p-5 rounded-xl border border-indigo-100 bg-indigo-50/30">
            <div className="flex items-center gap-2 mb-2 font-bold text-slate-900">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>페르소나 2: 기업 가치 분석을 중시하는 개인 가치투자자</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              "영업이익이 왜 전년 대비 -80%나 급감했는지", "이익률이 왜 급등했는지" 등 원인 분석을 원하지만, 500페이지가 넘는 공시 보고서 속에서 관련 목차를 찾기 어려움.
            </p>
          </div>
        </div>

        {/* 핵심 문제 정의 */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
          <h3 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>기존 시장의 핵심 페인 포인트 (Pain Points)</span>
          </h3>
          <ul className="text-xs sm:text-sm text-slate-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="font-bold text-rose-500">❌</span>
              <span><strong>공시 문서의 방대한 분량</strong>: 정기 사업보고서는 평균 300~500페이지에 달해 비전문가가 실적 변동 원인을 찾기 위해 1건당 최소 30분 이상 소요.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-rose-500">❌</span>
              <span><strong>단순 수치 제공의 한계</strong>: 네이버 증권 등 기존 금융 포털은 재무제표 수치만 보여줄 뿐, "회사가 공식적으로 밝힌 변동 사유"는 공시 원문을 직접 뒤져야 함.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-rose-500">❌</span>
              <span><strong>일반 LLM의 환각(Hallucination)</strong>: 챗GPT 등에 질문할 경우 최근 공시 원문을 잘못 인용하거나 허위 사실을 답변하여 투자 판단에 치명적 리스크 초래.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 2. 데이터 확보 및 분석 방향 */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">2</div>
          <h2 className="text-xl font-bold text-slate-900">데이터 확보 및 분석 방향 (Data Pipeline)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-3">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">DART 공시 데이터 확보</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              금융감독원 DART 전자공시시스템 Open API 및 정기 사업보고서 내 <strong>「이사의 경영진단 및 분석의견(MD&A)」, 「사업의 내용」</strong> 섹션 전문 수집 및 파싱.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">정량 재무 지표 연산</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              매출액 및 영업이익의 <strong>전년 대비(YoY) 증감액·증감률(%)</strong>, 영업이익률(OPM)의 <strong>변동폭(%p)</strong>, 흑자전환/적자 판별 자동 산출.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/50">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center mb-3">
              <Cpu className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">벡터 임베딩 & pgvector</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              공시 텍스트를 문맥 단위로 청킹(Chunking) 후 벡터 임베딩 생성, <strong>Supabase PostgreSQL pgvector</strong>에 저장하여 HNSW 코사인 유사도 검색 인덱싱.
            </p>
          </div>
        </div>
      </section>

      {/* 3. AI 활용 계획 (RAG + LLM) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center font-bold">3</div>
          <h2 className="text-xl font-bold text-slate-900">AI 활용 계획 (RAG & LLM Architecture)</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-purple-50/40 border border-purple-100 rounded-xl">
            <div className="font-bold text-sm text-purple-900 mb-1">RAG (Retrieval-Augmented Generation) 파이프라인</div>
            <p className="text-xs text-slate-700 leading-relaxed">
              사용자가 선택한 기업코드(`corp_code`)와 연도(`year`)를 기반으로 pgvector에서 가장 연관성이 높은 DART 공시 원문 단락(MD&A) 상위 3건을 추출하여 프롬프트 컨텍스트에 주입합니다.
            </p>
          </div>

          <div className="p-4 bg-blue-50/40 border border-blue-100 rounded-xl">
            <div className="font-bold text-sm text-blue-900 mb-1">환각 방지 및 근거 중심 생성 (Fact-Grounded Prompting)</div>
            <p className="text-xs text-slate-700 leading-relaxed">
              LLM에게 단순 추론을 금지하고, <strong>반드시 검색된 공시 원문 내에 회사가 직접 명시한 사유만을 기반으로 브리핑을 작성</strong>하도록 엄격한 시스템 프롬프트를 적용합니다.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl">
            <div className="font-bold text-sm text-emerald-900 mb-1">데이터 출처 명시 (Citation & DART Deep Link)</div>
            <p className="text-xs text-slate-700 leading-relaxed">
              공시 보고서명, DART 고유 접수번호(`rcept_no`), 접수일자, 세부 목차 단락명 및 금융감독원 DART 공식 웹 뷰어 링크를 사용자 화면에 카드 형태로 투명하게 노출합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 4. 사용자 이용 흐름 (User Flow) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2.5 mb-6 pb-3 border-b border-slate-100">
          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold">4</div>
          <h2 className="text-xl font-bold text-slate-900">사용자 이용 흐름 (User Flow & Interface)</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mx-auto mb-2">1</div>
            <h4 className="font-bold text-xs text-slate-900 mb-1">기업 및 연도 선택</h4>
            <p className="text-[11px] text-slate-500">분석할 상장 기업과 사업보고서 연도 지정 (또는 우수 사례 프리셋 클릭)</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mx-auto mb-2">2</div>
            <h4 className="font-bold text-xs text-slate-900 mb-1">정량 수치 자동 계산</h4>
            <p className="text-[11px] text-slate-500">매출액 YoY, 영업이익 YoY, 영업이익률 변동폭(%p) 즉시 카드 출력</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mx-auto mb-2">3</div>
            <h4 className="font-bold text-xs text-slate-900 mb-1">AI 공시 사유 브리핑</h4>
            <p className="text-[11px] text-slate-500">회사가 밝힌 실적 변동 핵심 원인 및 사업부문별 분석 리포트 확인</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center mx-auto mb-2">4</div>
            <h4 className="font-bold text-xs text-slate-900 mb-1">공시 원문 검증 & 분석</h4>
            <p className="text-[11px] text-slate-500">DART 공식 원문 발췌문 대조 및 데이터 분석 대시보드 비교</p>
          </div>
        </div>
      </section>

      {/* 5. UI 프로토타입 바로가기 CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div>
          <h3 className="font-bold text-lg sm:text-xl">지금 바로 완성된 동작형 UI 프로토타입을 테스트해보세요!</h3>
          <p className="text-xs sm:text-sm text-blue-100 mt-1">
            삼성전자, 현대자동차, SK하이닉스 등 실제 DART 공시 데이터가 연결되어 실시간으로 연산 및 RAG 브리핑이 동작합니다.
          </p>
        </div>
        <button
          onClick={onGoToPrototype}
          className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-md shrink-0 cursor-pointer flex items-center gap-2"
        >
          <span>UI 프로토타입 보기</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
