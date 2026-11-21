"""
Supabase PostgreSQL DB에 DART 공시 데이터 및 벡터 임베딩을 적재(Seed)하는 유틸리티 스크립트.
실행 방법: python -m backend.data.seed_data
"""
import os
import sys
from backend.config import SUPABASE_URL, SUPABASE_KEY
from backend.data.dart_dataset import DART_DISCLOSURE_CHUNKS

def seed_to_supabase():
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("[INFO] SUPABASE_URL 또는 SUPABASE_KEY 환경변수가 설정되지 않았습니다.")
        print("[INFO] 인메모리 벡터 검색 모드로 로컬 구동됩니다.")
        return False

    try:
        from supabase import create_client, Client
        supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
        
        print(f"[SEED] Supabase 연결 성공 ({SUPABASE_URL})")
        print(f"[SEED] 총 {len(DART_DISCLOSURE_CHUNKS)}건의 공시 데이터 적재를 시작합니다...")

        for chunk in DART_DISCLOSURE_CHUNKS:
            row = {
                "corp_code": chunk["corp_code"],
                "corp_name": chunk["corp_name"],
                "stock_code": chunk["stock_code"],
                "fiscal_year": chunk["fiscal_year"],
                "report_nm": chunk["report_nm"],
                "rcept_no": chunk["rcept_no"],
                "rcept_dt": chunk["rcept_dt"],
                "section_nm": chunk["section_nm"],
                "content": chunk["content"],
                "dart_url": chunk["dart_url"],
            }
            # upsert or insert
            supabase.table("dart_documents").insert(row).execute()
            print(f" -> 적재 완료: {chunk['corp_name']} ({chunk['fiscal_year']}) - {chunk['section_nm'][:30]}...")

        print("[SUCCESS] Supabase 데이터 시딩이 성공적으로 완료되었습니다!")
        return True
    except Exception as e:
        print(f"[ERROR] Supabase 데이터 적재 중 오류 발생: {e}")
        return False

if __name__ == "__main__":
    seed_to_supabase()
