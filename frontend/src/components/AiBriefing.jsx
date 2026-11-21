import React from 'react';
import { Bot, CheckCircle2, AlertTriangle, RefreshCw, Cpu, Layers, HelpCircle, Compass } from 'lucide-react';

export default function AiBriefing({ briefing, isLoading, error, onRetry }) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm mb-8 animate-pulse">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <Bot className="w-5 h-5 text-blue-600 animate-bounce" />
          </div>
          <div>
            <div className="h-5 bg-slate-200 rounded w-48 mb-2"></div>
            <div className="h-3 bg-slate-100 rounded w-64"></div>
          </div>
        </div>

        {/* Step Progress Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl flex items-center gap-2 text-xs font-semibold text-blue-700">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
            <span>1. DART 공시 원문 pgvector RAG 검색</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
            <span>2. 매출·영업이익률 YoY 증감 산출</span>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
            <span>3. LLM 금융 분석 및 브리핑 생성</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-100 rounded w-full"></div>
          <div className="h-4 bg-slate-100 rounded w-5/6"></div>
          <div className="h-4 bg-slate-100 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-6 mb-8 text-rose-800">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="w-5 h-5 text-rose-600" />
          <h4 className="font-bold text-base">분석 브리핑 생성 실패</h4>
        </div>
        <p className="text-sm text-rose-700 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>다시 시도하기</span>
        </button>
      </div>
    );
  }

  if (!briefing) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-slate-900">AI 실적 변화 종합 브리핑</h3>
              <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full">
                공시 검증 완료
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {briefing.company.corp_name} ({briefing.year}년 사업보고서 기반)
            </p>
          </div>
        </div>

        {/* Engine Badges */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-mono">
            <Cpu className="w-3 h-3 text-blue-600" />
            {briefing.llm_model_used}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg font-mono">
            <Layers className="w-3 h-3 text-blue-600" />
            RAG: {briefing.rag_backend}
          </span>
        </div>
      </div>

      {/* Headline Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4 mb-6">
        <div className="text-xs font-bold text-blue-600 mb-1 uppercase tracking-wide">핵심 요약 헤드라인</div>
        <p className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug">
          {briefing.headline}
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
          <span>투자자 총평 및 실적 브리핑</span>
        </h4>
        <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/50 p-4 rounded-xl border border-slate-100">
          {briefing.summary}
        </p>
      </div>

      {/* 회사가 밝힌 실적 변동 이유 (공시 원문 근거) */}
      <div className="mb-6">
        <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>회사가 밝힌 실적 변동의 핵심 원인 (DART 공시 근거)</span>
        </h4>
        <div className="space-y-2.5">
          {briefing.reasons.map((reason, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3.5 bg-slate-50 hover:bg-blue-50/40 rounded-xl border border-slate-200/70 transition-colors"
            >
              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {index + 1}
              </span>
              <p className="text-sm text-slate-800 leading-normal">{reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 사업부문별 분석 & 향후 전망 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {briefing.segment_analysis && briefing.segment_analysis.length > 0 && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <h5 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>사업부문별 주요 동향</span>
            </h5>
            <ul className="text-xs text-slate-600 space-y-1.5">
              {briefing.segment_analysis.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {briefing.outlook && (
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
            <h5 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>향후 전망 및 투자 전략</span>
            </h5>
            <p className="text-xs text-slate-600 leading-relaxed">
              {briefing.outlook}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
