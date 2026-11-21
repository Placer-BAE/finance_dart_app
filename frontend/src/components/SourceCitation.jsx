import React from 'react';
import { ExternalLink, ShieldCheck, Calendar, Hash, Quote } from 'lucide-react';

export default function SourceCitation({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="bg-[#10121a] rounded-2xl border border-[#232738] p-6 sm:p-8 shadow-sm mb-8 text-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-[#232738]">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-amber-400 uppercase tracking-widest mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>REGULATORY AUDIT TRAIL (DART 공시 원문 검증)</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white font-sans">
            금융감독원 전자공시시스템(DART) 공식 사업보고서 인용 근거
          </h3>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          CITATIONS: {sources.length} SECTIONS RETRIEVED
        </div>
      </div>

      <div className="space-y-4">
        {sources.map((src, index) => (
          <div
            key={index}
            className="border border-[#232738] rounded-xl p-5 bg-[#141622] hover:bg-[#181b28] transition-colors"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm text-white font-sans">{src.title}</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#1e2335] text-cyan-300 border border-[#2d344d]">
                  {src.section}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  SIMILARITY {(src.similarity_score * 100).toFixed(1)}%
                </span>
              </div>

              {/* DART Link Button */}
              {src.dart_url && (
                <a
                  href={src.dart_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-amber-400 hover:text-amber-300 hover:underline shrink-0"
                >
                  <span>VIEW ON DART</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Metadata Badges */}
            <div className="flex items-center gap-5 text-xs text-slate-400 mb-3 font-mono">
              <span className="flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-slate-500" />
                <span>RCPT NO: {src.rcept_no}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>FILED AT: {src.rcept_dt}</span>
              </span>
            </div>

            {/* Quote Excerpt */}
            <div className="relative pl-4 border-l-2 border-amber-400 bg-[#0c0d13] p-3.5 rounded-r-lg text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              <Quote className="w-4 h-4 text-amber-400/20 absolute -top-1 right-2 pointer-events-none" />
              <p className="italic">"{src.excerpt}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
