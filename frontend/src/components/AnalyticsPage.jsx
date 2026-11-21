import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Layers, ArrowUpRight, ArrowDownRight, RefreshCw, Filter } from 'lucide-react';

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
  const [selectedMetric, setSelectedMetric] = useState('operating_profit');
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
      <div className="bg-[#10121a] rounded-2xl border border-[#232738] p-12 text-center text-slate-100 font-mono">
        <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs text-slate-400">LOADING MARKET ANALYTICS...</p>
      </div>
    );
  }

  if (!data || !data.companies) {
    return (
      <div className="bg-[#10121a] rounded-2xl border border-[#232738] p-8 text-center text-slate-400 font-mono text-xs">
        NO ANALYTICS DATA AVAILABLE.
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
    <div className="space-y-8 text-slate-100">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 font-mono">
        <div className="bg-[#10121a] p-5 rounded-2xl border border-[#232738]">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">COVERAGE UNIVERSE</div>
          <div className="text-2xl font-extrabold text-white">{data.total_companies} CORPORATIONS</div>
          <div className="text-xs text-amber-400 mt-1 font-sans">KOSPI 대형 상장사</div>
        </div>
        <div className="bg-[#10121a] p-5 rounded-2xl border border-[#232738]">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">INDEXED FILINGS</div>
          <div className="text-2xl font-extrabold text-cyan-400">{data.total_filings_indexed} SECTIONS</div>
          <div className="text-xs text-slate-400 mt-1 font-sans">사업보고서 MD&A 단락 임베딩</div>
        </div>
        <div className="bg-[#10121a] p-5 rounded-2xl border border-[#232738]">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">INDUSTRY SECTORS</div>
          <div className="text-2xl font-extrabold text-white">{data.sectors.length} SECTORS</div>
          <div className="text-xs text-slate-400 mt-1 font-sans">전기전자, 운수장비, 서비스 등</div>
        </div>
        <div className="bg-[#10121a] p-5 rounded-2xl border border-[#232738]">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">VECTOR ENGINE</div>
          <div className="text-2xl font-extrabold text-emerald-400">pgvector</div>
          <div className="text-xs text-emerald-400 mt-1 font-sans">HNSW Cosine Ops</div>
        </div>
      </div>

      {/* Interactive Bar Chart Section */}
      <div className="bg-[#10121a] p-6 sm:p-8 rounded-2xl border border-[#232738] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#232738]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest mb-1">
              <BarChart3 className="w-4 h-4" />
              <span>CROSS-SECTIONAL PEER COMPARISON (기업별 실적 비교)</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white font-sans">
              국내 주요 상장사 FY {selectedYear} 실적 비교 분석 차트
            </h3>
          </div>

          {/* Metric & Year Filter Controls */}
          <div className="flex items-center gap-2 flex-wrap font-mono text-xs">
            <div className="flex bg-[#161926] p-1 rounded-xl border border-[#262b3d]">
              <button
                onClick={() => setSelectedMetric('operating_profit')}
                className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                  selectedMetric === 'operating_profit'
                    ? 'bg-amber-500 text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                영업이익
              </button>
              <button
                onClick={() => setSelectedMetric('revenue')}
                className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                  selectedMetric === 'revenue'
                    ? 'bg-amber-500 text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                매출액
              </button>
              <button
                onClick={() => setSelectedMetric('operating_margin')}
                className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
                  selectedMetric === 'operating_margin'
                    ? 'bg-amber-500 text-black font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                영업이익률 (%)
              </button>
            </div>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="bg-[#161926] border border-[#262b3d] text-white text-xs font-mono font-bold px-3 py-1.5 rounded-xl cursor-pointer focus:ring-1 focus:ring-amber-400"
            >
              <option value={2024}>FY 2024</option>
              <option value={2023}>FY 2023</option>
              <option value={2022}>FY 2022</option>
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
                <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-5 text-slate-500">{idx + 1}</span>
                    <span className="font-bold text-white text-sm font-sans">{item.name}</span>
                    <span className="text-slate-500 text-xs font-mono">({item.stockCode}.KS)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#1c202e] text-slate-300 font-sans border border-[#2b3147]">{item.sector}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs ${item.diff >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      YoY {item.diff >= 0 ? `+${item.diff.toFixed(1)}%` : `${item.diff.toFixed(1)}%`}
                    </span>
                    <span className={`font-extrabold text-sm ${isNegative ? 'text-rose-400' : 'text-white'}`}>
                      {selectedMetric === 'operating_margin' ? `${item.value.toFixed(2)}%` : formatKRW(item.value)}
                    </span>
                  </div>
                </div>

                {/* Bar */}
                <div className="w-full bg-[#161926] h-6 rounded-lg overflow-hidden flex items-center p-0.5 border border-[#232738]">
                  <div
                    style={{ width: `${widthPct}%` }}
                    className={`h-full rounded-md transition-all duration-500 flex items-center px-2 text-[10px] font-mono font-bold text-white ${
                      isNegative
                        ? 'bg-rose-600'
                        : selectedMetric === 'revenue'
                        ? 'bg-blue-600'
                        : selectedMetric === 'operating_profit'
                        ? 'bg-amber-500 text-black'
                        : 'bg-emerald-600'
                    }`}
                  >
                    {widthPct > 25 && (selectedMetric === 'operating_margin' ? `${item.value.toFixed(1)}%` : formatKRW(item.value))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comprehensive Financial Comparison Table */}
      <div className="bg-[#10121a] rounded-2xl border border-[#232738] p-6 sm:p-8 shadow-sm overflow-hidden font-mono text-xs">
        <h4 className="font-bold text-sm text-white mb-4 flex items-center gap-2 uppercase tracking-wider font-mono">
          <span>FINANCIAL STATEMENT SUMMARY TABLE (FY {selectedYear})</span>
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#232738] text-[11px] font-bold text-slate-400 uppercase">
                <th className="py-3 px-3">TICKER / CORP</th>
                <th className="py-3 px-3">SECTOR</th>
                <th className="py-3 px-3 text-right">REVENUE</th>
                <th className="py-3 px-3 text-right">OPERATING PROFIT</th>
                <th className="py-3 px-3 text-right">OP MARGIN (OPM)</th>
                <th className="py-3 px-3 text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2233]">
              {yearData.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#161a26] transition-colors">
                  <td className="py-3.5 px-3 font-semibold text-white flex items-center gap-2 font-sans">
                    <span>{row.name}</span>
                    <span className="text-[11px] text-slate-500 font-mono">({row.stockCode}.KS)</span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-400 font-sans">{row.sector}</td>
                  <td className="py-3.5 px-3 text-right font-medium text-slate-200">{formatKRW(row.rev)}</td>
                  <td className={`py-3.5 px-3 text-right font-bold ${row.op < 0 ? 'text-rose-400' : 'text-white'}`}>
                    {formatKRW(row.op)}
                  </td>
                  <td className={`py-3.5 px-3 text-right font-bold ${row.margin < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {row.margin.toFixed(2)}%
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    {row.op < 0 ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">DEFICIT</span>
                    ) : row.margin > 15 ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">HIGH MARGIN</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">NORMAL</span>
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
