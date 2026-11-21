import sys
import os
import asyncio

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.main import app
from backend.models import BriefingRequest
from backend.services.rag_service import rag_service
from backend.services.llm_client import llm_client
from backend.data.dart_dataset import DEMO_CASES, COMPANIES, FINANCIAL_DATA
from backend.services.financial_calc import calculate_metrics

async def test_all():
    print("=== [1] Testing DEMO_CASES count ===")
    assert len(DEMO_CASES) == 3, f"Expected 3 demo cases, got {len(DEMO_CASES)}"
    print(f"PASS: 3 demo cases defined ({[c.title[:20] for c in DEMO_CASES]})")

    print("\n=== [2] Testing RAG search for Samsung Electronics 2023 ===")
    sources, backend_used = rag_service.search_documents("00126380", 2023)
    assert len(sources) > 0, "No sources retrieved!"
    print(f"PASS: Retrieved {len(sources)} sources (Backend: {backend_used})")
    print(f" -> Top source: {sources[0].title} / {sources[0].section}")
    print(f" -> DART URL: {sources[0].dart_url}")

    print("\n=== [3] Testing AI Briefing Generation ===")
    company = COMPANIES[0]
    metrics = calculate_metrics(FINANCIAL_DATA[company.corp_code][2023], FINANCIAL_DATA[company.corp_code][2022])
    print(f" -> Calculated Metrics: Rev Change {metrics.revenue_change_pct}%, OP Change {metrics.op_profit_change_pct}%, OPM {metrics.current_op_margin}% ({metrics.op_margin_change_pp}%p)")

    briefing = await llm_client.generate_briefing(company, 2023, metrics, sources)
    assert "headline" in briefing and "summary" in briefing
    print(f"PASS: AI Briefing Generated!")
    print(f" -> Headline: {briefing['headline']}")
    print(f" -> Reasons count: {len(briefing['reasons'])}")
    print(f" -> Model used: {briefing.get('llm_model_used')}")

    print("\n[ALL TESTS PASSED SUCCESSFULLY!]")

if __name__ == "__main__":
    asyncio.run(test_all())
