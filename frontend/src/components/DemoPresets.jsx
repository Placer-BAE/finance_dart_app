import React from 'react';
import { Sparkles, ArrowRight, TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';

export default function DemoPresets({ demoCases, onSelectCase, selectedCaseId, isLoading }) {
  const getBadgeStyle = (color) => {
    switch (color) {
      case 'red':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'green':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'purple':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const getIcon = (color) => {
    switch (color) {
      case 'red':
        return <TrendingDown className="w-4 h-4 text-rose-600" />;
      case 'green':
        return <TrendingUp className="w-4 h-4 text-emerald-600" />;
      case 'purple':
        return <AlertCircle className="w-4 h-4 text-purple-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden mb-8">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs font-semibold text-blue-300 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>과제 평가 필수 요건: RAG 우수 사례 3건 실시간 시연</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            실시간 RAG 공시 분석 우수 사례 프리셋
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            원클릭으로 사업보고서 원문 발췌, 코사인 유사도 검색, 정량 지표 계산 및 AI 브리핑을 실시간 시연합니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {demoCases.map((c) => {
          const isSelected = selectedCaseId === c.id;
          return (
            <div
              key={c.id}
              onClick={() => !isLoading && onSelectCase(c)}
              className={`group text-left p-5 rounded-xl border transition-all cursor-pointer relative bg-white/5 backdrop-blur-sm ${
                isSelected
                  ? 'border-blue-400 bg-white/10 ring-2 ring-blue-400/50 shadow-lg'
                  : 'border-white/10 hover:border-blue-400/50 hover:bg-white/10'
              } ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getBadgeStyle(c.badge_color)}`}>
                  {getIcon(c.badge_color)}
                  {c.badge}
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  {c.corp_name} ({c.year}년)
                </span>
              </div>

              <h3 className="font-semibold text-base text-white group-hover:text-blue-300 transition-colors mb-2 leading-snug">
                {c.title}
              </h3>

              <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                {c.description}
              </p>

              <div className="border-t border-white/10 pt-3">
                <ul className="text-xs text-slate-300 space-y-1 mb-4">
                  {c.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-blue-400 text-xs font-bold">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <button
                  disabled={isLoading}
                  className={`w-full py-2 px-3 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-white/10 hover:bg-blue-600 text-white'
                  }`}
                >
                  <span>{isSelected && isLoading ? 'RAG 분석 실행 중...' : '이 사례 실시간 시연하기'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
