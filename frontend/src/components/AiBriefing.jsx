import React from 'react';
import { Bot, CheckCircle2, AlertTriangle, RefreshCw, Cpu, Layers, Compass, FileCheck } from 'lucide-react';

export default function AiBriefing({ briefing, isLoading, error, onRetry }) {
  if (isLoading) {
    return (
      <div className="bg-[#10121a] rounded-2xl border border-[#232738] p-8 shadow-sm mb-8 animate-pulse text-slate-100">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#232738]">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Cpu className="w-5 h-5 animate-spin" />
          </div>
          <div>
            <div className="h-4 bg-[#232738] rounded w-48 mb-2"></div>
            <div className="h-3 bg-[#1a1d2c] rounded w-64"></div>
          </div>
        </div>

        {/* Step Progress Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="p-3 bg-[#161926] border border-amber-500/30 rounded-xl flex items-center gap-2 text-xs font-mono text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>1. DART pgvector RETRIEVAL</span>
          </div>
          <div className="p-3 bg-[#161926] border border-[#262b3d] rounded-xl flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-slate-500"></span>
            <span>2. METRIC VARIANCE AUDIT</span>
          </div>
          <div className="p-3 bg-[#161926] border border-[#262b3d] rounded-xl flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-slate-500"></span>
            <span>3. SYNTHESIZING BRIEFING</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="h-4 bg-[#232738] rounded w-3/4"></div>
          <div className="h-3 bg-[#1a1d2c] rounded w-full"></div>
          <div className="h-3 bg-[#1a1d2c] rounded w-5/6"></div>
          <div className="h-3 bg-[#1a1d2c] rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-rose-950/20 border border-rose-900/50 rounded-2xl p-6 mb-8 text-rose-200">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          <h4 className="font-bold text-sm font-mono uppercase tracking-wider">RESEARCH NOTE GENERATION FAILED</h4>
        </div>
        <p className="text-xs text-rose-300 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-mono font-semibold transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>RETRY ANALYSIS</span>
        </button>
      </div>
    );
  }

  if (!briefing) return null;

  return (
    <div className="bg-[#10121a] rounded-2xl border border-[#232738] p-6 sm:p-8 shadow-sm mb-8 text-slate-100">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#232738]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase">
              EQUITY RESEARCH NOTE · DISCLOSURE AUDIT
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/30">
              VERIFIED
            </span>
          </div>
          <h3 className="font-bold text-lg text-white font-sans">
            {briefing.company.corp_name} ({briefing.company.stock_code}.KS) 실적 변화 종합 분석 리포트
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            FY {briefing.year} ANNUAL REPORT · SOURCE: FINANCIAL SUPERVISORY SERVICE (DART)
          </p>
        </div>

        {/* Engine Badges */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#181b26] border border-[#2d3248] text-slate-300 rounded text-[11px]">
            <Cpu className="w-3 h-3 text-amber-400" />
            {briefing.llm_model_used}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#181b26] border border-[#2d3248] text-cyan-400 rounded text-[11px]">
            <Layers className="w-3 h-3 text-cyan-400" />
            RAG: {briefing.rag_backend}
          </span>
        </div>
      </div>

      {/* Headline Banner */}
      <div className="bg-[#161a26] border-l-4 border-amber-400 rounded-r-xl p-4 sm:p-5 mb-6">
        <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest mb-1">
          EXECUTIVE SUMMARY HEADLINE
        </div>
        <p className="font-bold text-white text-base sm:text-lg leading-snug font-sans">
          {briefing.headline}
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>애널리스트 총평 및 실적 브리핑</span>
        </h4>
        <p className="text-sm text-slate-200 leading-relaxed bg-[#141622] p-4 rounded-xl border border-[#232738] font-sans">
          {briefing.summary}
        </p>
      </div>

      {/* 회사가 밝힌 실적 변동 이유 */}
      <div className="mb-6">
        <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <FileCheck className="w-4 h-4 text-emerald-400" />
          <span>공시 원문 근거: 회사가 밝힌 실적 변동 핵심 사유 (Official Management Rationale)</span>
        </h4>
        <div className="space-y-2.5">
          {briefing.reasons.map((reason, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3.5 bg-[#141622] hover:bg-[#181b28] rounded-xl border border-[#232738] transition-colors"
            >
              <span className="w-5 h-5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {index + 1}
              </span>
              <p className="text-sm text-slate-200 leading-normal font-sans">{reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 사업부문별 분석 & 향후 전망 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {briefing.segment_analysis && briefing.segment_analysis.length > 0 && (
          <div className="p-4 bg-[#141622] rounded-xl border border-[#232738]">
            <h5 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>DIVISIONAL PERFORMANCE (사업부문별 분석)</span>
            </h5>
            <ul className="text-xs text-slate-300 space-y-2 font-sans">
              {briefing.segment_analysis.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {briefing.outlook && (
          <div className="p-4 bg-[#141622] rounded-xl border border-[#232738]">
            <h5 className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>OUTLOOK & CAPEX STRATEGY (사업 전망 및 투자 전략)</span>
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {briefing.outlook}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
