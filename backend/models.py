from typing import List, Optional
from pydantic import BaseModel, Field


class CompanyInfo(BaseModel):
    corp_code: str
    corp_name: str
    stock_code: str
    sector: str
    description: str


class FinancialYearData(BaseModel):
    year: int
    revenue: float  # 단위: 억원
    operating_profit: float  # 단위: 억원
    net_profit: float  # 단위: 억원
    operating_margin: float  # 단위: %


class MetricComparison(BaseModel):
    current_year: int
    previous_year: int
    current_revenue: float
    previous_revenue: float
    revenue_diff: float
    revenue_change_pct: float
    current_op_profit: float
    previous_op_profit: float
    op_profit_diff: float
    op_profit_change_pct: float
    current_op_margin: float
    previous_op_margin: float
    op_margin_change_pp: float  # %p
    is_turnaround: bool = False  # 흑자전환
    is_deficit: bool = False  # 적자지속/적자전환


class SourceCitation(BaseModel):
    title: str
    rcept_no: str
    rcept_dt: str
    section: str
    excerpt: str
    dart_url: str
    similarity_score: float = Field(default=0.9)


class BriefingRequest(BaseModel):
    corp_code: str
    year: int
    custom_question: Optional[str] = None


class BriefingResponse(BaseModel):
    company: CompanyInfo
    year: int
    previous_year: int
    metrics: MetricComparison
    headline: str
    summary: str
    reasons: List[str]
    segment_analysis: List[str]
    outlook: str
    sources: List[SourceCitation]
    llm_model_used: str
    rag_backend: str  # 'supabase_pgvector' 또는 'in_memory_vector'


class DemoCase(BaseModel):
    id: str
    title: str
    corp_code: str
    corp_name: str
    stock_code: str
    year: int
    badge: str
    badge_color: str
    description: str
    highlights: List[str]
