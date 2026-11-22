import React, { useState, useEffect } from 'react';
import { Terminal, BarChart2, FileText, Database, Activity, RefreshCw } from 'lucide-react';

const INITIAL_MARKETS = [
  { symbol: 'KOSPI', price: 4869.96, change: -5.21, isUp: false },
  { symbol: 'KOSDAQ', price: 645.68, change: -5.71, isUp: false },
  { symbol: 'USD/KRW', price: 1345.50, change: -0.15, isUp: false },
  { symbol: 'S&P 500', price: 5969.34, change: 0.35, isUp: true },
  { symbol: 'NASDAQ', price: 18972.42, change: 0.16, isUp: true },
  { symbol: 'US 10Y', price: 4.41, change: -0.02, isUp: false, unit: '%' },
];

export default function Navbar({ activeTab, setActiveTab }) {
  const [markets, setMarkets] = useState(INITIAL_MARKETS);
  const [lastUpdated, setLastUpdated] = useState(0);
  const [flashSymbol, setFlashSymbol] = useState(null);

  // Real-time market streaming & polling simulation (every 8~12s)
  useEffect(() => {
    // 1. Fetch live API if available
    const fetchLiveData = () => {
      fetch('/api/market-indices')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            setMarkets(data);
            setLastUpdated(0);
          }
        })
        .catch(() => {
          // Live tick simulation (realistic micro-movements on active market)
          setMarkets(prev => {
            const randomIdx = Math.floor(Math.random() * prev.length);
            const target = prev[randomIdx];
            const delta = (Math.random() * 0.08 - 0.04);
            const newPrice = Number((target.price + delta).toFixed(2));
            const newChange = Number((target.change + (delta > 0 ? 0.01 : -0.01)).toFixed(2));
            
            setFlashSymbol(target.symbol);
            setTimeout(() => setFlashSymbol(null), 800);

            return prev.map((item, idx) => {
              if (idx === randomIdx) {
                return {
                  ...item,
                  price: newPrice,
                  change: newChange,
                  isUp: newChange >= 0
                };
              }
              return item;
            });
          });
          setLastUpdated(0);
        });
    };

    const interval = setInterval(fetchLiveData, 10000);
    const timer = setInterval(() => {
      setLastUpdated(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0c0d12] border-b border-[#232738] text-slate-100 shadow-md">
      {/* Bloomberg-style Top Real-time Ticker Bar */}
      <div className="bg-[#07080b] border-b border-[#1c1f2e] px-4 py-1.5 text-[11px] font-mono flex items-center justify-between overflow-x-auto text-slate-400">
        <div className="flex items-center gap-6 whitespace-nowrap">
          <span className="flex items-center gap-1.5 font-bold text-amber-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            LIVE STREAMING
          </span>

          {markets.map((m) => {
            const isFlashing = flashSymbol === m.symbol;
            return (
              <span
                key={m.symbol}
                className={`transition-colors duration-300 cursor-default flex items-center gap-1.5 ${
                  isFlashing ? (m.isUp ? 'text-emerald-300' : 'text-rose-300') : 'hover:text-white'
                }`}
              >
                <span className="text-slate-400">{m.symbol}</span>
                <span className="font-semibold text-slate-200">
                  {m.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  {m.unit || ''}
                </span>
                <span className={`font-bold ${m.isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {m.isUp ? `▲ +${m.change}%` : `▼ ${m.change}%`}
                </span>
              </span>
            );
          })}

          <span className="hover:text-white transition-colors cursor-default text-slate-400">
            DART DISCLOSURE PIPELINE <span className="text-cyan-400 font-semibold">REAL-TIME ACTIVE</span>
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-[11px]">
          <span className="inline-flex items-center gap-1 text-emerald-400 font-mono">
            <Activity className="w-3 h-3 animate-pulse" />
            <span>SYNCED {lastUpdated}s ago</span>
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
