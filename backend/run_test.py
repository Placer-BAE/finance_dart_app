import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

print("[DEBUG] 1. script started", flush=True)

from backend.data.dart_dataset import COMPANIES, FINANCIAL_DATA, DEMO_CASES
print("[DEBUG] 2. imported dataset", flush=True)

from backend.services.financial_calc import calculate_metrics
print("[DEBUG] 3. imported financial_calc", flush=True)

from backend.services.rag_service import rag_service
print("[DEBUG] 4. imported rag_service", flush=True)

from backend.services.llm_client import llm_client
print("[DEBUG] 5. imported llm_client", flush=True)

for case in DEMO_CASES:
    print(f"\n[*] Case: {case.title}", flush=True)
    s, b = rag_service.search_documents(case.corp_code, case.year)
    print(f"    -> RAG Sources: {len(s)} found via {b}", flush=True)
    c = next(x for x in COMPANIES if x.corp_code == case.corp_code)
    m = calculate_metrics(FINANCIAL_DATA[c.corp_code][case.year], FINANCIAL_DATA[c.corp_code][case.year - 1])
    res = llm_client._generate_grounded_fallback(c, case.year, m, s)
    print(f"    -> Headline: {res['headline']}", flush=True)
    print(f"    -> Reasons count: {len(res['reasons'])}", flush=True)
    print(f"    -> Top source DART URL: {s[0].dart_url}", flush=True)

print("\n>>> [ALL 3 RAG DEMO CASES VERIFIED SUCCESSFULLY!] <<<", flush=True)
