import os
import json
import urllib.request
import zipfile
import io
import re
import xml.etree.ElementTree as ET
from typing import Dict, Any, Optional, List

class OpenDartFetcher:
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("OPENDART_API_KEY", "1c3175ddfbf927ad408598aec6cb2c4ea7685cf1")
        self.base_url = "https://opendart.fss.or.kr/api"
        self.companies_cache = None
        self._load_companies()

    def _load_companies(self):
        """상장사 고유번호 매핑 데이터 로드"""
        path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data", "listed_companies.json")
        if os.path.exists(path):
            with open(path, "r", encoding="utf-8") as f:
                self.companies_cache = json.load(f)

    def find_company(self, query: str) -> Optional[Dict[str, str]]:
        """기업명 또는 6자리 종목코드로 기업 정보 검색"""
        if not self.companies_cache:
            self._load_companies()
            if not self.companies_cache:
                return None

        q = query.strip()
        # 1. 종목코드 일치 검색
        for c in self.companies_cache:
            if c.get("stock_code") == q:
                return c

        # 2. 기업명 완전 일치 검색
        for c in self.companies_cache:
            if c.get("corp_name") == q:
                return c

        # 3. 기업명 부분 일치 검색
        for c in self.companies_cache:
            if q in c.get("corp_name"):
                return c

        return None

    def get_financials(self, corp_code: str, bsns_year: int = 2024, reprt_code: str = "11011") -> Dict[str, Any]:
        """단일회사 주요계정 수집 (연결재무제표 CFS 우선, 없으면 개별 OFS)"""
        url = f"{self.base_url}/fnlttSinglAcnt.json?crtfc_key={self.api_key}&corp_code={corp_code}&bsns_year={bsns_year}&reprt_code={reprt_code}"
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))

        if data.get("status") != "000":
            return {"status": data.get("status"), "message": data.get("message"), "financials": None}

        # 파싱 로직
        result = {
            "bsns_year": bsns_year,
            "corp_code": corp_code,
            "revenue": {"current": 0, "prior": 0, "growth_rate": 0.0},
            "operating_profit": {"current": 0, "prior": 0, "growth_rate": 0.0},
            "net_profit": {"current": 0, "prior": 0, "growth_rate": 0.0},
            "operating_margin": {"current": 0.0, "prior": 0.0, "diff_pp": 0.0}
        }

        def clean_num(val_str):
            if not val_str or val_str == "-":
                return 0
            try:
                return int(val_str.replace(",", "").strip())
            except ValueError:
                return 0

        # 연결재무제표(CFS) 데이터 우선 필터
        rows = data.get("list", [])
        cfs_rows = [r for r in rows if r.get("fs_div") == "CFS"]
        target_rows = cfs_rows if cfs_rows else rows

        for r in target_rows:
            nm = r.get("account_nm", "")
            thstrm = clean_num(r.get("thstrm_amount"))
            frmtrm = clean_num(r.get("frmtrm_amount"))

            if "매출액" in nm or "수익(매출액)" in nm or nm == "영업수익":
                if result["revenue"]["current"] == 0:
                    result["revenue"]["current"] = thstrm
                    result["revenue"]["prior"] = frmtrm

            elif "영업이익" in nm:
                if result["operating_profit"]["current"] == 0:
                    result["operating_profit"]["current"] = thstrm
                    result["operating_profit"]["prior"] = frmtrm

            elif "당기순이익" in nm:
                if result["net_profit"]["current"] == 0:
                    result["net_profit"]["current"] = thstrm
                    result["net_profit"]["prior"] = frmtrm

        # 증감률 및 마진율 계산
        def calc_growth(curr, prior):
            if prior == 0:
                return 0.0
            return round(((curr - prior) / abs(prior)) * 100, 2)

        rev_c, rev_p = result["revenue"]["current"], result["revenue"]["prior"]
        op_c, op_p = result["operating_profit"]["current"], result["operating_profit"]["prior"]
        np_c, np_p = result["net_profit"]["current"], result["net_profit"]["prior"]

        result["revenue"]["growth_rate"] = calc_growth(rev_c, rev_p)
        result["operating_profit"]["growth_rate"] = calc_growth(op_c, op_p)
        result["net_profit"]["growth_rate"] = calc_growth(np_c, np_p)

        if rev_c > 0:
            result["operating_margin"]["current"] = round((op_c / rev_c) * 100, 2)
        if rev_p > 0:
            result["operating_margin"]["prior"] = round((op_p / rev_p) * 100, 2)

        result["operating_margin"]["diff_pp"] = round(
            result["operating_margin"]["current"] - result["operating_margin"]["prior"], 2
        )

        return {"status": "000", "financials": result}

    def get_latest_report_mda(self, corp_code: str, bsns_year: int = 2024) -> Optional[Dict[str, Any]]:
        """사업보고서 공시 목록에서 '이사의 경영진단 및 분석의견' 원문 텍스트 추출"""
        list_url = f"{self.base_url}/list.json?crtfc_key={self.api_key}&corp_code={corp_code}&bgn_de={bsns_year}0101&pblntf_ty=A"
        req = urllib.request.Request(list_url, headers={"User-Agent": "Mozilla/5.0"})
        
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode("utf-8"))

        if data.get("status") != "000" or not data.get("list"):
            return None

        # 사업보고서 접수번호 찾기
        rcept_no = None
        report_nm = None
        for item in data.get("list", []):
            if "사업보고서" in item.get("report_nm", ""):
                rcept_no = item.get("rcept_no")
                report_nm = item.get("report_nm")
                break

        if not rcept_no:
            rcept_no = data["list"][0].get("rcept_no")
            report_nm = data["list"][0].get("report_nm")

        # 원문 다운로드
        doc_url = f"{self.base_url}/document.xml?crtfc_key={self.api_key}&rcept_no={rcept_no}"
        doc_req = urllib.request.Request(doc_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(doc_req, timeout=25) as resp:
            zip_bytes = resp.read()

        text_content = ""
        with zipfile.ZipFile(io.BytesIO(zip_bytes)) as z:
            for fname in z.namelist():
                if fname.endswith(".xml"):
                    xml_str = z.read(fname).decode("utf-8", errors="ignore")
                    # 태그 제거 및 텍스트 정제
                    clean_text = re.sub(r"<[^>]+>", " ", xml_str)
                    clean_text = re.sub(r"\s+", " ", clean_text)
                    if "경영진단" in clean_text or "영업실적" in clean_text or "경영성과" in clean_text:
                        text_content += "\n" + clean_text[:8000] # 분석용 핵심 구간 발췌

        return {
            "rcept_no": rcept_no,
            "report_nm": report_nm,
            "mda_text": text_content[:10000]
        }

# 싱글톤 인스턴스
dart_fetcher = OpenDartFetcher()
