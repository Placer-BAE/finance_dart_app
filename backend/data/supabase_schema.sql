-- ========================================================
-- Supabase PostgreSQL + pgvector 스키마 설정 스크립트
-- 프로젝트: DART 기업 실적 변화 브리핑 AI 서비스
-- ========================================================

-- 1. pgvector 확장(Extension) 활성화
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. DART 공시 원문 및 임베딩 저장 테이블 생성
CREATE TABLE IF NOT EXISTS public.dart_documents (
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
    embedding VECTOR(768), -- Google Gemini Text-Embedding-004 또는 OpenAI text-embedding-3-small 등
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. HNSW 코사인 유사도 벡터 인덱스 생성 (초고속 RAG 검색)
CREATE INDEX IF NOT EXISTS dart_documents_embedding_hnsw_idx 
ON public.dart_documents 
USING hnsw (embedding vector_cosine_ops);

-- 보조 필터링 B-Tree 인덱스
CREATE INDEX IF NOT EXISTS dart_documents_corp_year_idx 
ON public.dart_documents (corp_code, fiscal_year);

-- 4. RAG 유사도 검색 RPC 함수 정의 (FastAPI 서버에서 호출)
CREATE OR REPLACE FUNCTION match_dart_documents (
    query_embedding VECTOR(768),
    match_count INT DEFAULT 5,
    filter_corp_code VARCHAR DEFAULT NULL,
    filter_year INT DEFAULT NULL
)
RETURNS TABLE (
    id UUID,
    corp_code VARCHAR,
    corp_name VARCHAR,
    stock_code VARCHAR,
    fiscal_year INT,
    report_nm TEXT,
    rcept_no VARCHAR,
    rcept_dt VARCHAR,
    section_nm VARCHAR,
    content TEXT,
    dart_url TEXT,
    similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT
        d.id,
        d.corp_code,
        d.corp_name,
        d.stock_code,
        d.fiscal_year,
        d.report_nm,
        d.rcept_no,
        d.rcept_dt,
        d.section_nm,
        d.content,
        d.dart_url,
        1 - (d.embedding <=> query_embedding) AS similarity
    FROM public.dart_documents d
    WHERE
        (filter_corp_code IS NULL OR d.corp_code = filter_corp_code)
        AND (filter_year IS NULL OR d.fiscal_year = filter_year)
    ORDER BY d.embedding <=> query_embedding
    LIMIT match_count;
END;
$$;

-- 5. Row Level Security (RLS) 설정: Read 권한 허용
ALTER TABLE public.dart_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to dart_documents"
ON public.dart_documents
FOR SELECT
USING (true);
