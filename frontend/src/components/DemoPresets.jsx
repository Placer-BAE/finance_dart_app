import React from 'react';
import { TrendingDown, TrendingUp, AlertCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function DemoPresets({ demoCases, onSelectCase, selectedCaseId, isLoading }) {
  const getBadgeStyle = (color) => {
    switch (color) {
      case 'red':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'green':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'purple':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    }
  };

  const getIcon = (color) => {
    switch (color) {
      case 'red':
        return <TrendingDown className="w-3.5 h-3.5 text-rose-400" />;
      case 'green':
        return <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />;
      case 'purple':
        return <AlertCircle className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <ArrowUpRight className="w-3.5 h-3.5 text-blue-400" />;
    }
  };

  return (
    <section className="bg-[#0f111a] border border-[#232738] rounded-2xl p-6 sm:p-7 shadow-xl mb-8 relative overflow-hidden">
      {/* Subtle Terminal Grid Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#232738]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase">
              FEATURED EQUITY RESEARCH · DISCLOSURE INTELLIGENCE
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white font-sans">
            실적 시즌 핵심 분석 기업 (Market Highlights)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            기업과 연도를 선택하면 DART 사업보고서 공시 원문(MD&A)을 벡터 검색하여 실적 변동 원인을 즉시 브리핑합니다.
          </p>
        </div>
        <div className="text-right hidden sm:block font-mono text-[11px] text-slate-500">
          <div>RAG PIPELINE: ACTIVE</div>
          <div className="text-slate-400">INDEX: KOSPI TOP TIER</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {demoCases.map((c) => {
          const isSelected = selectedCaseId === c.id;
          return (
            <div
              key={c.id}
              onClick={() => !isLoading && onSelectCase(c)}
              className={`group text-left p-5 rounded-xl border transition-all cursor-pointer relative ${
                isSelected
                  ? 'border-amber-500/80 bg-[#161a26] ring-1 ring-amber-500/40 shadow-lg'
                  : 'border-[#232738] bg-[#121520] hover:border-slate-500/50 hover:bg-[#161926]'
              } ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-bold border ${getBadgeStyle(c.badge_color)}`}>
                  {getIcon(c.badge_color)}
                  {c.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono font-bold">
                  {c.stock_code}.KS
                </span>
              </div>

              <div className="text-xs font-mono text-slate-400 mb-1">
                {c.corp_name} · {c.year}년 사업보고서
              </div>

              <h3 className="font-bold text-sm text-white group-hover:text-amber-300 transition-colors mb-2.5 leading-snug">
                {c.title}
              </h3>

              <div className="border-t border-[#232738] pt-3">
                <ul className="text-xs text-slate-300 space-y-1.5 mb-4 font-sans">
                  {c.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-amber-400 text-xs font-bold">•</span>
                      <span className="leading-tight">{h}</span>
                    </li>
                  ))}
                </ul>

                <button
                  disabled={isLoading}
                  className={`w-full py-2 px-3 text-xs font-mono font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-black font-bold shadow-md'
                      : 'bg-[#1e2233] hover:bg-amber-500 hover:text-black text-slate-200'
                  }`}
                >
                  <span>{isSelected && isLoading ? 'ANALYZING...' : '이 기업 실적 브리핑 열기'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
