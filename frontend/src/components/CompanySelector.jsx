import React from 'react';
import { Building2, Calendar, Search, MessageSquareCode, ArrowRight } from 'lucide-react';

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

  const years = [2024, 2023, 2022];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <Building2 className="w-5 h-5 text-blue-600" />
        <h3 className="font-bold text-slate-900 text-base">분석 기업 및 사업보고서 연도 선택</h3>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* 기업 선택 */}
          <div className="md:col-span-5">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              분석 대상 기업
            </label>
            <div className="relative">
              <select
                value={selectedCorpCode}
                onChange={(e) => setSelectedCorpCode(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
              >
                {companies.map((c) => (
                  <option key={c.corp_code} value={c.corp_code}>
                    {c.corp_name} ({c.stock_code}) - {c.sector.split(' / ')[0]}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                ▼
              </div>
            </div>
            {currentCompany && (
              <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>{currentCompany.description}</span>
              </p>
            )}
          </div>

          {/* 공시 사업연도 선택 */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              사업보고서 연도
            </label>
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}년 (전년 대비 YoY 분석)
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                ▼
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-1.5">
              {selectedYear}년 vs {selectedYear - 1}년 비교 계산
            </p>
          </div>

          {/* 추가 관심 질문 / 프롬프트 */}
          <div className="md:col-span-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              투자자 맞춤 집중 질문 (선택 사항)
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="예: 반도체 부문 영업손실 및 메모리 판가 추이"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1.5">
              미입력 시 회사의 종합 실적 변동 원인을 브리핑합니다.
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-5 flex items-center justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md shadow-blue-500/20 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>DART 공시 원문 RAG 검색 & 브리핑 생성 중...</span>
              </>
            ) : (
              <>
                <span>실적 변화 브리핑 생성하기</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
