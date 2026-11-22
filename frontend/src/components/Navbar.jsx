import React from 'react';
import { Terminal, BarChart2, FileText, Database, ShieldCheck, Activity } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="sticky top-0 z-50 bg-[#0c0d12] border-b border-[#232738] text-slate-100 shadow-md">
      {/* Bloomberg-style Top Ticker Bar */}
      <div className="bg-[#07080b] border-b border-[#1c1f2e] px-4 py-1.5 text-[11px] font-mono flex items-center justify-between overflow-x-auto text-slate-400">
        <div className="flex items-center gap-6 whitespace-nowrap">
          <span className="flex items-center gap-1.5 font-bold text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            LIVE MARKETS
          </span>
          <span className="hover:text-white transition-colors cursor-default">
            KOSPI <span className="font-semibold text-slate-200">2,593.42</span> <span className="text-emerald-400">▲ +0.58%</span>
          </span>
          <span className="hover:text-white transition-colors cursor-default">
            KOSDAQ <span className="font-semibold text-slate-200">853.15</span> <span className="text-emerald-400">▲ +0.32%</span>
          </span>
          <span className="hover:text-white transition-colors cursor-default">
            USD/KRW <span className="font-semibold text-slate-200">1,388.50</span> <span className="text-emerald-400">▲ +0.25%</span>
          </span>
          <span className="hover:text-white transition-colors cursor-default">
            S&P 500 <span className="font-semibold text-slate-200">5,969.34</span> <span className="text-emerald-400">▲ +0.35%</span>
          </span>
          <span className="hover:text-white transition-colors cursor-default">
            NASDAQ <span className="font-semibold text-slate-200">18,972.42</span> <span className="text-emerald-400">▲ +0.16%</span>
          </span>
          <span className="hover:text-white transition-colors cursor-default">
            US 10Y <span className="font-semibold text-slate-200">4.41%</span> <span className="text-rose-400">▼ -0.02%p</span>
          </span>
          <span className="hover:text-white transition-colors cursor-default">
            DART DISCLOSURE PIPELINE <span className="text-cyan-400 font-semibold">REAL-TIME ACTIVE</span>
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-[11px]">
          <span className="inline-flex items-center gap-1 text-emerald-400 font-mono">
            <Activity className="w-3 h-3" />
            LIVE FEED
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 font-mono">KRX / SEC CONNECTED</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Editorial Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-xs">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-wider text-white font-mono uppercase">
                  DART TERMINAL
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold font-mono tracking-wider bg-amber-500 text-black rounded uppercase">
                  INTELLIGENCE
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans tracking-tight">
                Corporate Earnings & Disclosure RAG Research Platform
              </p>
            </div>
          </div>

          {/* Clean Editorial Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-[#151824] p-1 rounded-xl border border-[#262b3d]">
            <button
              onClick={() => setActiveTab('briefing')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'briefing'
                  ? 'bg-amber-500 text-black shadow-xs font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>실적 브리핑</span>
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'analytics'
                  ? 'bg-amber-500 text-black shadow-xs font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>재무 분석 대시보드</span>
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'architecture'
                  ? 'bg-amber-500 text-black shadow-xs font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>시스템 아키텍처</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
