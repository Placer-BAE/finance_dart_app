import React, { useState } from 'react';
import { Database, Server, Globe, GitBranch, Check, Copy, Terminal } from 'lucide-react';

export default function ArchitectureView() {
  const [copied, setCopied] = useState(false);

  const sqlCode = `-- 1. pgvector 확장 활성화
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. DART 공시 문서 테이블 생성
CREATE TABLE public.dart_documents (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    corp_code VARCHAR(20) NOT NULL,
    corp_name VARCHAR(100) NOT NULL,
    stock_code VARCHAR(10) NOT NULL,
    fiscal_year INT NOT NULL,
    report_nm TEXT NOT NULL,
    rcept_no VARCHAR(30) NOT NULL,
    rcept_dt VARCHAR(15) NOT NULL,
    section_nm VARCHAR(150) NOT NULL,
    content TEXT NOT NULL,
    dart_url TEXT NOT NULL,
    embedding VECTOR(768),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. HNSW 코사인 유사도 인덱스 생성
CREATE INDEX dart_documents_embedding_hnsw_idx 
ON public.dart_documents 
USING hnsw (embedding vector_cosine_ops);`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 text-slate-100">
      {/* 4-Tier Stack Overview */}
      <div className="bg-[#10121a] rounded-2xl border border-[#232738] p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-2 font-mono">
          <Terminal className="w-4 h-4 text-amber-400" />
          <h3 className="text-base font-bold text-white uppercase tracking-wider">
            SYSTEM ARCHITECTURE & CLOUD INFRASTRUCTURE
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-6 font-sans">
          DART Terminal은 React, FastAPI, Supabase pgvector, GitHub 배포 파이프라인으로 구성된 금융 데이터 분석 시스템입니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Frontend */}
          <div className="p-5 rounded-xl border border-[#232738] bg-[#141622]">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-3">
              <Globe className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-bold text-blue-400 uppercase">FRONTEND</span>
            <h4 className="font-bold text-white text-sm mt-1">React (Vite)</h4>
            <div className="text-xs text-slate-400 mt-2 space-y-1 font-sans">
              <div>• Bloomberg Terminal 스타일 UI</div>
              <div>• 재무 분석 대시보드 시각화</div>
              <div className="font-mono text-blue-400 pt-1 text-[11px]">DEPLOY: Vercel Edge</div>
            </div>
          </div>

          {/* Backend */}
          <div className="p-5 rounded-xl border border-[#232738] bg-[#141622]">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-3">
              <Server className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">BACKEND</span>
            <h4 className="font-bold text-white text-sm mt-1">FastAPI</h4>
            <div className="text-xs text-slate-400 mt-2 space-y-1 font-sans">
              <div>• LLM API (Gemini/OpenAI) 연동</div>
              <div>• 재무 지표 YoY 자동 연산 엔진</div>
              <div className="font-mono text-emerald-400 pt-1 text-[11px]">DEPLOY: Render Web Service</div>
            </div>
          </div>

          {/* Database */}
          <div className="p-5 rounded-xl border border-[#232738] bg-[#141622]">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-3">
              <Database className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">DATABASE</span>
            <h4 className="font-bold text-white text-sm mt-1">PostgreSQL (pgvector)</h4>
            <div className="text-xs text-slate-400 mt-2 space-y-1 font-sans">
              <div>• HNSW 코사인 유사도 벡터 인덱스</div>
              <div>• DART MD&A 공시 원문 임베딩</div>
              <div className="font-mono text-amber-400 pt-1 text-[11px]">DEPLOY: Supabase Cloud</div>
            </div>
          </div>

          {/* Source Code */}
          <div className="p-5 rounded-xl border border-[#232738] bg-[#141622]">
            <div className="w-8 h-8 rounded-lg bg-slate-500/10 border border-slate-500/30 text-slate-300 flex items-center justify-center mb-3">
              <GitBranch className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">REPOSITORY</span>
            <h4 className="font-bold text-white text-sm mt-1">GitHub Monorepo</h4>
            <div className="text-xs text-slate-400 mt-2 space-y-1 font-sans">
              <div>• 풀스택 모노레포 구조</div>
              <div>• CI/CD 자동 빌드 연동</div>
              <div className="font-mono text-slate-300 pt-1 text-[11px]">REPO: GitHub Public</div>
            </div>
          </div>
        </div>
      </div>

      {/* Supabase SQL Viewer */}
      <div className="bg-[#10121a] rounded-2xl border border-[#232738] p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#232738]">
          <div>
            <h4 className="font-bold text-white text-sm font-mono uppercase tracking-wider">
              SUPABASE PGVECTOR SCHEMA DDL
            </h4>
            <p className="text-xs text-slate-400 mt-0.5 font-sans">
              Supabase SQL Editor에서 실행하여 벡터 테이블 및 HNSW 인덱스를 생성합니다.
            </p>
          </div>
          <button
            onClick={copySql}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#181b26] hover:bg-[#232738] text-amber-400 rounded-lg text-xs font-mono font-semibold transition-all border border-[#2d3248]"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIED!' : 'COPY SQL'}</span>
          </button>
        </div>

        <pre className="text-xs font-mono bg-[#090a0f] p-4 rounded-xl overflow-x-auto text-amber-400 border border-[#1e2233]">
          <code>{sqlCode}</code>
        </pre>
      </div>
    </div>
  );
}
