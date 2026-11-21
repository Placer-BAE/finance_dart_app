import React from 'react';
import { ExternalLink, BookmarkCheck, FileSearch, Calendar, Hash, Quote } from 'lucide-react';

export default function SourceCitation({ sources }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <BookmarkCheck className="w-4 h-4" />
            <span>과제 필수 요건: 데이터 출처 명시 (Citations)</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            DART 전자공시시스템 공식 원문 출처 및 RAG 발췌 근거
          </h3>
        </div>
        <div className="text-xs text-slate-500 font-mono">
          총 {sources.length}건의 공시 단락 인용됨
        </div>
      </div>

      <div className="space-y-4">
        {sources.map((src, index) => (
          <div
            key={index}
            className="border border-slate-200 rounded-xl p-5 bg-slate-50/60 hover:bg-slate-50 transition-colors"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-sm text-slate-900">{src.title}</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                  {src.section}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                  유사도 {(src.similarity_score * 100).toFixed(1)}%
                </span>
              </div>

              {/* DART Link Button */}
              {src.dart_url && (
                <a
                  href={src.dart_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline shrink-0"
                >
                  <span>DART 원문 조회</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {/* Metadata Badges */}
            <div className="flex items-center gap-4 text-xs text-slate-500 mb-3 font-mono">
              <span className="flex items-center gap-1">
                <Hash className="w-3.5 h-3.5 text-slate-400" />
                <span>접수번호: {src.rcept_no}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>접수일자: {src.rcept_dt}</span>
              </span>
            </div>

            {/* Quote Excerpt */}
            <div className="relative pl-4 border-l-2 border-blue-500 bg-white p-3.5 rounded-r-lg text-xs sm:text-sm text-slate-700 leading-relaxed font-sans shadow-xs">
              <Quote className="w-4 h-4 text-blue-400/40 absolute -top-1 right-2 pointer-events-none" />
              <p className="italic">"{src.excerpt}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
