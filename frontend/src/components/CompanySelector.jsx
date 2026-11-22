import React from 'react';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';

export default function CompanySelector({
  companies,
  selectedCorpCode,
  setSelectedCorpCode,
  selectedYear,
  setSelectedYear,
  customQuestion,
  setCustomQuestion,
  onSubmit,
  isLoading
}) {
  const currentCompany = companies.find(c => c.corp_code === selectedCorpCode) || companies[0];
  const years = [2025, 2024, 2023, 2022];

  return (
    <div className="bg-[#10121a] rounded-2xl border border-[#232738] p-6 shadow-sm mb-8 text-slate-100">
      <div className="flex items-center justify-between gap-2 mb-5 pb-3 border-b border-[#232738]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-amber-400" />
          <h3 className="font-bold text-white text-sm uppercase font-mono tracking-wider">
            SECURITY & DISCLOSURE QUERY (기업 및 사업보고서 연도 선택)
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
          DART FILING RETRIEVER
        </span>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* 기업 선택 */}
          <div className="md:col-span-5">
            <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              TARGET CORP (분석 기업)
            </label>
            <div className="relative">
              <select
                value={selectedCorpCode}
                onChange={(e) => setSelectedCorpCode(e.target.value)}
                className="w-full bg-[#181b26] border border-[#2d3248] rounded-xl px-4 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 transition-all appearance-none cursor-pointer font-sans"
              >
                {companies.map((c) => (
                  <option key={c.corp_code} value={c.corp_code} className="bg-[#12141c] text-white">
                    {c.corp_name} ({c.stock_code}.KS) — {c.sector.split(' / ')[0]}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs font-mono">
                ▼
              </div>
            </div>
            {currentCompany && (
              <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1.5 font-sans">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                <span>{currentCompany.description}</span>
              </p>
            )}
          </div>

          {/* 공시 사업연도 선택 */}
          <div className="md:col-span-3">
            <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              FISCAL YEAR (사업연도)
            </label>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full bg-[#181b26] border border-[#2d3248] rounded-xl px-4 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 transition-all appearance-none cursor-pointer font-mono"
              >
                {years.map((y) => (
                  <option key={y} value={y} className="bg-[#12141c] text-white">
                    FY {y} (vs FY {y - 1} YoY)
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs font-mono">
                ▼
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-1.5 font-mono">
              YoY BASE: FY {selectedYear - 1}
            </p>
          </div>

          {/* 추가 관심 질문 */}
          <div className="md:col-span-4">
            <label className="block text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              RESEARCH FOCUS (집중 분석 질의)
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="예: 반도체 부문 영업손실 및 메모리 판가 추이"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                className="w-full bg-[#181b26] border border-[#2d3248] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400 focus:border-amber-400 transition-all font-sans"
              />
            </div>
            <p className="text-xs text-slate-500 mt-1.5 font-sans">
              비워둘 경우 전사 실적 변동의 주 요인을 종합 분석합니다.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-5 flex items-center justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold font-mono text-xs uppercase px-6 py-2.5 rounded-xl shadow-md disabled:opacity-50 transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                <span>RETRIEVING DART FILING & ANALYZING...</span>
              </>
            ) : (
              <>
                <span>실적 변화 브리핑 생성</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
