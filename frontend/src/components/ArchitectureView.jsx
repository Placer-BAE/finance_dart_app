import React, { useState } from 'react';
import { Database, Server, Globe, GitBranch, CheckCircle2, Copy, Check } from 'lucide-react';

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
    <div className="space-y-8">
      {/* 4-Tier Stack Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          과제 요구사항: 풀스택 기술 스택 및 배포 구조
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          본 프로젝트는 요구사항에 명시된 React + FastAPI + Supabase pgvector + GitHub 배포 파이프라인으로 구성되었습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Frontend */}
          <div className="p-5 rounded-xl border border-blue-200 bg-blue-50/40">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-3">
              <Globe className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-blue-600 uppercase">프론트엔드</span>
            <h4 className="font-bold text-slate-900 mt-1">React (Vite)</h4>
            <div className="text-xs text-slate-600 mt-2 space-y-1">
              <div>• 입력·로딩·오류·응답·출처 표시</div>
              <div>• 분석 대시보드 페이지 구현</div>
              <div className="font-semibold text-blue-700 pt-1">배포: Vercel</div>
            </div>
          </div>

          {/* Backend */}
          <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50/40">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-3">
              <Server className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-600 uppercase">백엔드</span>
            <h4 className="font-bold text-slate-900 mt-1">FastAPI</h4>
            <div className="text-xs text-slate-600 mt-2 space-y-1">
              <div>• LLM API (Gemini/OpenAI) 연동</div>
              <div>• 매출·영업이익률 YoY 자동 계산</div>
              <div className="font-semibold text-emerald-700 pt-1">배포: Render</div>
            </div>
          </div>

          {/* Database */}
          <div className="p-5 rounded-xl border border-indigo-200 bg-indigo-50/40">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center mb-3">
              <Database className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-indigo-600 uppercase">데이터베이스</span>
            <h4 className="font-bold text-slate-900 mt-1">PostgreSQL + pgvector</h4>
            <div className="text-xs text-slate-600 mt-2 space-y-1">
              <div>• HNSW 코사인 유사도 RAG 검색</div>
              <div>• DART 공시 MD&A 원문 임베딩</div>
              <div className="font-semibold text-indigo-700 pt-1">배포: Supabase</div>
            </div>
          </div>

          {/* Source Code */}
          <div className="p-5 rounded-xl border border-slate-300 bg-slate-50/80">
            <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center mb-3">
              <GitBranch className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-slate-600 uppercase">소스 코드</span>
            <h4 className="font-bold text-slate-900 mt-1">GitHub 저장소</h4>
            <div className="text-xs text-slate-600 mt-2 space-y-1">
              <div>• 풀스택 모노레포 구조</div>
              <div>• Render & Vercel 자동 빌드 연동</div>
              <div className="font-semibold text-slate-900 pt-1">저장소: GitHub</div>
            </div>
          </div>
        </div>
      </div>

      {/* Supabase SQL Viewer */}
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div>
            <h4 className="font-bold text-white text-base">Supabase pgvector 스키마 DDL</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Supabase SQL Editor에 복사하여 붙여넣으면 즉시 pgvector 테이블과 인덱스가 생성됩니다.
            </p>
          </div>
          <button
            onClick={copySql}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-all border border-slate-700"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '복사됨!' : 'SQL 복사'}</span>
          </button>
        </div>

        <pre className="text-xs font-mono bg-slate-950 p-4 rounded-xl overflow-x-auto text-emerald-400 border border-slate-800">
          <code>{sqlCode}</code>
        </pre>
      </div>
    </div>
  );
}
