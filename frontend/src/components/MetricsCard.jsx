import React from 'react';
import { TrendingUp, TrendingDown, Percent, DollarSign, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

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
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">정량 재무 지표 변동 계산</span>
          <h3 className="text-lg font-bold text-slate-900 mt-0.5">
            {companyName} {year}년 vs {metrics.previous_year}년 주요 실적 비교
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {metrics.is_turnaround && (
            <span className="px-3 py-1 text-xs font-bold bg-purple-100 text-purple-700 rounded-full border border-purple-200">
              흑자 전환
            </span>
          )}
          {metrics.is_deficit && !metrics.is_turnaround && (
            <span className="px-3 py-1 text-xs font-bold bg-rose-100 text-rose-700 rounded-full border border-rose-200">
              영업 적자
            </span>
          )}
          {!metrics.is_deficit && metrics.op_profit_change_pct > 30 && (
            <span className="px-3 py-1 text-xs font-bold bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200">
              이익 고성장 (+{metrics.op_profit_change_pct}%)
            </span>
          )}
          <span className="text-xs text-slate-400 font-mono">단위: 원화(연결기준)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. 매출액 */}
        <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-100 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>매출액 (Revenue)</span>
            <span className={`inline-flex items-center font-bold text-xs px-2 py-0.5 rounded-full ${
              revIsUp ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
            }`}>
              {revIsUp ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {metrics.revenue_change_pct > 0 ? `+${metrics.revenue_change_pct}%` : `${metrics.revenue_change_pct}%`}
            </span>
          </div>

          <div className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
            {formatKRW(metrics.current_revenue)}
          </div>

          <div className="text-xs text-slate-500 space-y-1 pt-2 border-t border-slate-200/60">
            <div className="flex justify-between">
              <span>전년도 ({metrics.previous_year}년):</span>
              <span className="font-medium text-slate-700">{formatKRW(metrics.previous_revenue)}</span>
            </div>
            <div className="flex justify-between">
              <span>전년 대비 증감액:</span>
              <span className={`font-semibold ${revIsUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                {metrics.revenue_diff > 0 ? `+${formatKRW(metrics.revenue_diff)}` : formatKRW(metrics.revenue_diff)}
              </span>
            </div>
          </div>
        </div>

        {/* 2. 영업이익 */}
        <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-100 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>영업이익 (Operating Profit)</span>
            <span className={`inline-flex items-center font-bold text-xs px-2 py-0.5 rounded-full ${
              opIsUp ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
            }`}>
              {opIsUp ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {metrics.op_profit_change_pct > 0 ? `+${metrics.op_profit_change_pct}%` : `${metrics.op_profit_change_pct}%`}
            </span>
          </div>

          <div className={`text-2xl font-extrabold tracking-tight mb-2 ${
            metrics.current_op_profit < 0 ? 'text-rose-600' : 'text-slate-900'
          }`}>
            {formatKRW(metrics.current_op_profit)}
          </div>

          <div className="text-xs text-slate-500 space-y-1 pt-2 border-t border-slate-200/60">
            <div className="flex justify-between">
              <span>전년도 ({metrics.previous_year}년):</span>
              <span className="font-medium text-slate-700">{formatKRW(metrics.previous_op_profit)}</span>
            </div>
            <div className="flex justify-between">
              <span>전년 대비 증감액:</span>
              <span className={`font-semibold ${opIsUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                {metrics.op_profit_diff > 0 ? `+${formatKRW(metrics.op_profit_diff)}` : formatKRW(metrics.op_profit_diff)}
              </span>
            </div>
          </div>
        </div>

        {/* 3. 영업이익률 */}
        <div className="bg-slate-50/80 rounded-xl p-5 border border-slate-100 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-2">
            <span>영업이익률 (OPM)</span>
            <span className={`inline-flex items-center font-bold text-xs px-2 py-0.5 rounded-full ${
              marginIsUp ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
            }`}>
              {marginIsUp ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {metrics.op_margin_change_pp > 0 ? `+${metrics.op_margin_change_pp}%p` : `${metrics.op_margin_change_pp}%p`}
            </span>
          </div>

          <div className={`text-2xl font-extrabold tracking-tight mb-2 ${
            metrics.current_op_margin < 0 ? 'text-rose-600' : 'text-slate-900'
          }`}>
            {metrics.current_op_margin.toFixed(2)}%
          </div>

          <div className="text-xs text-slate-500 space-y-1 pt-2 border-t border-slate-200/60">
            <div className="flex justify-between">
              <span>전년도 이익률:</span>
              <span className="font-medium text-slate-700">{metrics.previous_op_margin.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span>마진 변동 폭:</span>
              <span className={`font-semibold ${marginIsUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                {metrics.op_margin_change_pp > 0 ? `+${metrics.op_margin_change_pp}%p` : `${metrics.op_margin_change_pp}%p`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
