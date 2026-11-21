import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

const formatKRW = (amountHundredMillion) => {
  if (amountHundredMillion === undefined || amountHundredMillion === null) return '-';
  const abs = Math.abs(amountHundredMillion);
  const sign = amountHundredMillion < 0 ? '-' : '';
  if (abs >= 10000) {
    return `${sign}${(abs / 10000).toFixed(1)}조원`;
  }
  return `${sign}${abs.toLocaleString()}억원`;
};

export default function MetricsCard({ metrics, companyName, year }) {
  if (!metrics) return null;

  const revIsUp = metrics.revenue_diff >= 0;
  const opIsUp = metrics.op_profit_diff >= 0;
  const marginIsUp = metrics.op_margin_change_pp >= 0;

  return (
    <div className="bg-[#10121a] rounded-2xl border border-[#232738] p-6 shadow-sm mb-8 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-[#232738]">
        <div>
          <span className="text-[11px] font-mono font-bold text-amber-400 tracking-widest uppercase">
            KEY FINANCIAL METRICS (YoY VARIANCE)
          </span>
          <h3 className="text-base sm:text-lg font-bold text-white mt-0.5 font-sans">
            {companyName} {year}년 vs {metrics.previous_year}년 주요 실적 비교
          </h3>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          {metrics.is_turnaround && (
            <span className="px-2.5 py-0.5 font-bold bg-purple-500/10 text-purple-400 rounded border border-purple-500/30">
              TURNAROUND (흑자전환)
            </span>
          )}
          {metrics.is_deficit && !metrics.is_turnaround && (
            <span className="px-2.5 py-0.5 font-bold bg-rose-500/10 text-rose-400 rounded border border-rose-500/30">
              OPERATING DEFICIT (영업적자)
            </span>
          )}
          {!metrics.is_deficit && metrics.op_profit_change_pct > 30 && (
            <span className="px-2.5 py-0.5 font-bold bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/30">
              HIGH GROWTH (+{metrics.op_profit_change_pct}%)
            </span>
          )}
          <span className="text-slate-500 text-[11px]">CONSOLIDATED · KRW</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* 1. 매출액 */}
        <div className="bg-[#161926] rounded-xl p-5 border border-[#262b3d] relative">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span className="uppercase tracking-wider font-semibold">REVENUE (매출액)</span>
            <span className={`inline-flex items-center font-bold px-2 py-0.5 rounded text-xs ${
              revIsUp ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
            }`}>
              {revIsUp ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
              {metrics.revenue_change_pct > 0 ? `+${metrics.revenue_change_pct}%` : `${metrics.revenue_change_pct}%`}
            </span>
          </div>

          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3 font-mono">
            {formatKRW(metrics.current_revenue)}
          </div>

          <div className="text-xs text-slate-400 space-y-1 pt-3 border-t border-[#232738] font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">FY {metrics.previous_year}:</span>
              <span className="text-slate-300 font-medium">{formatKRW(metrics.previous_revenue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">YoY Change:</span>
              <span className={`font-semibold ${revIsUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                {metrics.revenue_diff > 0 ? `+${formatKRW(metrics.revenue_diff)}` : formatKRW(metrics.revenue_diff)}
              </span>
            </div>
          </div>
        </div>

        {/* 2. 영업이익 */}
        <div className="bg-[#161926] rounded-xl p-5 border border-[#262b3d] relative">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span className="uppercase tracking-wider font-semibold">OPERATING PROFIT (영업이익)</span>
            <span className={`inline-flex items-center font-bold px-2 py-0.5 rounded text-xs ${
              opIsUp ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
            }`}>
              {opIsUp ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
              {metrics.op_profit_change_pct > 0 ? `+${metrics.op_profit_change_pct}%` : `${metrics.op_profit_change_pct}%`}
            </span>
          </div>

          <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 font-mono ${
            metrics.current_op_profit < 0 ? 'text-rose-400' : 'text-white'
          }`}>
            {formatKRW(metrics.current_op_profit)}
          </div>

          <div className="text-xs text-slate-400 space-y-1 pt-3 border-t border-[#232738] font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">FY {metrics.previous_year}:</span>
              <span className="text-slate-300 font-medium">{formatKRW(metrics.previous_op_profit)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">YoY Change:</span>
              <span className={`font-semibold ${opIsUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                {metrics.op_profit_diff > 0 ? `+${formatKRW(metrics.op_profit_diff)}` : formatKRW(metrics.op_profit_diff)}
              </span>
            </div>
          </div>
        </div>

        {/* 3. 영업이익률 */}
        <div className="bg-[#161926] rounded-xl p-5 border border-[#262b3d] relative">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-2">
            <span className="uppercase tracking-wider font-semibold">OP MARGIN (영업이익률)</span>
            <span className={`inline-flex items-center font-bold px-2 py-0.5 rounded text-xs ${
              marginIsUp ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
            }`}>
              {marginIsUp ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
              {metrics.op_margin_change_pp > 0 ? `+${metrics.op_margin_change_pp}%p` : `${metrics.op_margin_change_pp}%p`}
            </span>
          </div>

          <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 font-mono ${
            metrics.current_op_margin < 0 ? 'text-rose-400' : 'text-white'
          }`}>
            {metrics.current_op_margin.toFixed(2)}%
          </div>

          <div className="text-xs text-slate-400 space-y-1 pt-3 border-t border-[#232738] font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">FY {metrics.previous_year} OPM:</span>
              <span className="text-slate-300 font-medium">{metrics.previous_op_margin.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Margin Spread:</span>
              <span className={`font-semibold ${marginIsUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                {metrics.op_margin_change_pp > 0 ? `+${metrics.op_margin_change_pp}%p` : `${metrics.op_margin_change_pp}%p`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
