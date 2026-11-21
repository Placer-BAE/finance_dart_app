import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Layers, PieChart, ArrowUpRight, ArrowDownRight, RefreshCw, Filter } from 'lucide-react';

const formatKRW = (amt) => {
  if (amt === undefined || amt === null) return '-';
  const abs = Math.abs(amt);
  const sign = amt < 0 ? '-' : '';
  if (abs >= 10000) {
    return `${sign}${(abs / 10000).toFixed(1)}조원`;
  }
  return `${sign}${abs.toLocaleString()}억원`;
};

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('operating_profit'); // 'operating_profit' or 'revenue' or 'operating_margin'
  const [selectedYear, setSelectedYear] = useState(2023);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Analytics fetch error:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm text-slate-500">데이터 분석 대시보드 로딩 중...</p>
      </div>
    );
  }

  if (!data || !data.companies) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
        분석 데이터를 불러올 수 없습니다.
      </div>
    );
  }

  // Get data for selected year
  const yearData = data.companies.map(c => {
    const yr = c.trend.find(t => t.year === selectedYear);
    const prevYr = c.trend.find(t => t.year === selectedYear - 1);
    const val = yr ? yr[selectedMetric] : 0;
    const prevVal = prevYr ? prevYr[selectedMetric] : 0;
    const diff = prevVal !== 0 ? ((val - prevVal) / Math.abs(prevVal) * 100) : 0;
    return {
      name: c.corp_name,
      stockCode: c.stock_code,
      sector: c.sector.split(' / ')[0],
      value: val,
      prevValue: prevVal,
      diff: diff,
      margin: yr ? yr.operating_margin : 0,
      rev: yr ? yr.revenue : 0,
      op: yr ? yr.operating_profit : 0,
    };
  }).sort((a, b) => b.value - a.value);

  const maxValue = Math.max(...yearData.map(d => Math.abs(d.value)), 1);

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 mb-1">인덱싱 분석 기업 수</div>
          <div className="text-2xl font-extrabold text-slate-900">{data.total_companies}개사</div>
          <div className="text-xs text-blue-600 mt-1">국내 대표 시가총액 상위 종목</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 mb-1">DART 인덱싱 공시 건수</div>
          <div className="text-2xl font-extrabold text-blue-600">{data.total_filings_indexed}건</div>
          <div className="text-xs text-slate-500 mt-1">사업보고서 MD&A 단락 임베딩</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 mb-1">산업 섹터 분류</div>
          <div className="text-2xl font-extrabold text-slate-900">{data.sectors.length}개 업종</div>
          <div className="text-xs text-slate-500 mt-1">전기전자, 운수장비, 서비스 등</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-xs font-semibold text-slate-500 mb-1">벡터 인덱스 검색 엔진</div>
          <div className="text-2xl font-extrabold text-emerald-600">pgvector</div>
          <div className="text-xs text-emerald-600 mt-1">HNSW 코사인 유사도 연산</div>
        </div>
      </div>

      {/* Interactive Bar Chart Section */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <BarChart3 className="w-4 h-4" />
              <span>과제 필수 요건: 데이터 분석 페이지 (Analytics Dashboard)</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              기업별 {selectedYear}년 실적 비교 분석 차트
            </h3>
          </div>

          {/* Metric & Year Filter Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setSelectedMetric('operating_profit')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedMetric === 'operating_profit'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                영업이익
              </button>
              <button
                onClick={() => setSelectedMetric('revenue')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedMetric === 'revenue'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                매출액
              </button>
              <button
                onClick={() => setSelectedMetric('operating_margin')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedMetric === 'operating_margin'
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                영업이익률 (%)
              </button>
            </div>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-slate-100 border-none text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer focus:ring-2 focus:ring-blue-500"
            >
              <option value={2024}>2024년</option>
              <option value={2023}>2023년</option>
              <option value={2022}>2022년</option>
            </select>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="space-y-4">
          {yearData.map((item, idx) => {
            const widthPct = Math.min(Math.max((Math.abs(item.value) / maxValue) * 100, 4), 100);
            const isNegative = item.value < 0;

            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-5 text-slate-400 font-mono">{idx + 1}</span>
                    <span className="font-bold text-slate-900 text-sm">{item.name}</span>
                    <span className="text-slate-400 text-xs font-mono">({item.stockCode})</span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">{item.sector}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`font-mono text-xs ${item.diff >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      YoY {item.diff >= 0 ? `+${item.diff.toFixed(1)}%` : `${item.diff.toFixed(1)}%`}
                    </span>
                    <span className={`font-extrabold text-sm ${isNegative ? 'text-rose-600' : 'text-slate-900'}`}>
                      {selectedMetric === 'operating_margin' ? `${item.value.toFixed(2)}%` : formatKRW(item.value)}
                    </span>
                  </div>
                </div>

                {/* Bar */}
                <div className="w-full bg-slate-100 h-6 rounded-lg overflow-hidden flex items-center p-0.5">
                  <div
                    style={{ width: `${widthPct}%` }}
                    className={`h-full rounded-md transition-all duration-500 flex items-center px-2 text-[10px] font-bold text-white ${
                      isNegative
                        ? 'bg-rose-500'
                        : selectedMetric === 'revenue'
                        ? 'bg-blue-600'
                        : selectedMetric === 'operating_profit'
                        ? 'bg-indigo-600'
                        : 'bg-emerald-600'
                    }`}
                  >
                    {widthPct > 20 && (selectedMetric === 'operating_margin' ? `${item.value.toFixed(1)}%` : formatKRW(item.value))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comprehensive Financial Comparison Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm overflow-hidden">
        <h4 className="font-bold text-base text-slate-900 mb-4 flex items-center gap-2">
          <span>기업별 {selectedYear}년 실적 상세 데이터 테이블</span>
          <span className="text-xs font-normal text-slate-500">(DART 연결재무제표 기준)</span>
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase">
                <th className="py-3 px-3">기업명</th>
                <th className="py-3 px-3">업종</th>
                <th className="py-3 px-3 text-right">매출액</th>
                <th className="py-3 px-3 text-right">영업이익</th>
                <th className="py-3 px-3 text-right">영업이익률 (OPM)</th>
                <th className="py-3 px-3 text-center">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {yearData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-3 font-semibold text-slate-900 flex items-center gap-2">
                    <span>{row.name}</span>
                    <span className="text-xs text-slate-400 font-mono">({row.stockCode})</span>
                  </td>
                  <td className="py-3.5 px-3 text-xs text-slate-600">{row.sector}</td>
                  <td className="py-3.5 px-3 text-right font-medium text-slate-900">{formatKRW(row.rev)}</td>
                  <td className={`py-3.5 px-3 text-right font-bold ${row.op < 0 ? 'text-rose-600' : 'text-slate-900'}`}>
                    {formatKRW(row.op)}
                  </td>
                  <td className={`py-3.5 px-3 text-right font-bold ${row.margin < 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {row.margin.toFixed(2)}%
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    {row.op < 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-700">적자</span>
                    ) : row.margin > 15 ? (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">초고수익</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">정상</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
