from typing import Dict, List
from backend.models import CompanyInfo, FinancialYearData, DemoCase

# 기업 기본 정보 목록
COMPANIES: List[CompanyInfo] = [
    CompanyInfo(
        corp_code="00126380",
        corp_name="삼성전자",
        stock_code="005930",
        sector="전기전자 / 반도체·스마트폰·가전",
        description="글로벌 메모리 반도체 및 스마트폰, 디스플레이 선도 기업"
    ),
    CompanyInfo(
        corp_code="00164779",
        corp_name="현대자동차",
        stock_code="005380",
        sector="운수장비 / 자동차 제조",
        description="제네시스·SUV 중심의 글로벌 3대 완성차 제조 그룹"
    ),
    CompanyInfo(
        corp_code="00164742",
        corp_name="SK하이닉스",
        stock_code="000660",
        sector="전기전자 / 메모리 반도체",
        description="HBM(고대역폭메모리) 및 고성능 DRAM/NAND 선도 기업"
    ),
    CompanyInfo(
        corp_code="01515325",
        corp_name="LG에너지솔루션",
        stock_code="373220",
        sector="전기전자 / 이차전지",
        description="EV 배터리 및 에너지 저장장치(ESS) 글로벌 제조사"
    ),
    CompanyInfo(
        corp_code="00149944",
        corp_name="POSCO홀딩스",
        stock_code="005490",
        sector="철강금속 / 친환경 인프라·이차전지 소재",
        description="철강 및 리튬·니켈 등 차세대 이차전지 소재 지주회사"
    ),
    CompanyInfo(
        corp_code="00266961",
        corp_name="NAVER",
        stock_code="035420",
        sector="서비스업 / 인터넷 포털·플랫폼·AI",
        description="검색, 이커머스, 핀테크, 콘텐츠 및 클라우드 AI 플랫폼 기업"
    ),
]

# 연도별 재무제표 (매출, 영업이익, 당기순이익, 영업이익률 - 단위: 억원)
FINANCIAL_DATA: Dict[str, Dict[int, FinancialYearData]] = {
    # 삼성전자 (00126380)
    "00126380": {
        2021: FinancialYearData(year=2021, revenue=2796048, operating_profit=516339, net_profit=399074, operating_margin=18.47),
        2022: FinancialYearData(year=2022, revenue=3022314, operating_profit=433766, net_profit=556541, operating_margin=14.35),
        2023: FinancialYearData(year=2023, revenue=2589355, operating_profit=65670, net_profit=154871, operating_margin=2.54),
        2024: FinancialYearData(year=2024, revenue=3058000, operating_profit=356000, net_profit=342000, operating_margin=11.64),
        2025: FinancialYearData(year=2025, revenue=3324000, operating_profit=428000, net_profit=385000, operating_margin=12.88),
    },
    # 현대자동차 (00164779)
    "00164779": {
        2021: FinancialYearData(year=2021, revenue=1176106, operating_profit=66789, net_profit=56931, operating_margin=5.68),
        2022: FinancialYearData(year=2022, revenue=1425275, operating_profit=98198, net_profit=79836, operating_margin=6.89),
        2023: FinancialYearData(year=2023, revenue=1626636, operating_profit=151269, net_profit=122723, operating_margin=9.30),
        2024: FinancialYearData(year=2024, revenue=1752000, operating_profit=152400, net_profit=119000, operating_margin=8.70),
        2025: FinancialYearData(year=2025, revenue=1865000, operating_profit=161200, net_profit=131000, operating_margin=8.64),
    },
    # SK하이닉스 (00164742)
    "00164742": {
        2021: FinancialYearData(year=2021, revenue=429978, operating_profit=124103, net_profit=96162, operating_margin=28.86),
        2022: FinancialYearData(year=2022, revenue=446481, operating_profit=68094, net_profit=22416, operating_margin=15.25),
        2023: FinancialYearData(year=2023, revenue=327657, operating_profit=-77303, net_profit=-91375, operating_margin=-23.59),
        2024: FinancialYearData(year=2024, revenue=661900, operating_profit=234600, net_profit=197800, operating_margin=35.44),
        2025: FinancialYearData(year=2025, revenue=784500, operating_profit=312000, net_profit=258000, operating_margin=39.77),
    },
    # LG에너지솔루션 (01515325)
    "01515325": {
        2022: FinancialYearData(year=2022, revenue=255986, operating_profit=12132, net_profit=7796, operating_margin=4.74),
        2023: FinancialYearData(year=2023, revenue=337455, operating_profit=21632, net_profit=16380, operating_margin=6.41),
        2024: FinancialYearData(year=2024, revenue=256200, operating_profit=5750, net_profit=3380, operating_margin=2.24),
        2025: FinancialYearData(year=2025, revenue=284000, operating_profit=11200, net_profit=8400, operating_margin=3.94),
    },
    # POSCO홀딩스 (00149944)
    "00149944": {
        2022: FinancialYearData(year=2022, revenue=847502, operating_profit=48501, net_profit=35605, operating_margin=5.72),
        2023: FinancialYearData(year=2023, revenue=771272, operating_profit=35314, net_profit=18456, operating_margin=4.58),
        2024: FinancialYearData(year=2024, revenue=726800, operating_profit=28900, net_profit=14100, operating_margin=3.98),
        2025: FinancialYearData(year=2025, revenue=762000, operating_profit=34500, net_profit=22000, operating_margin=4.53),
    },
    # NAVER (00266961)
    "00266961": {
        2022: FinancialYearData(year=2022, revenue=82201, operating_profit=13047, net_profit=6731, operating_margin=15.87),
        2023: FinancialYearData(year=2023, revenue=96706, operating_profit=14888, net_profit=9884, operating_margin=15.39),
        2024: FinancialYearData(year=2024, revenue=107500, operating_profit=19200, net_profit=14500, operating_margin=17.86),
        2025: FinancialYearData(year=2025, revenue=119800, operating_profit=22500, net_profit=17200, operating_margin=18.78),
    },
}

# DART 공시 원문 데이터베이스 (RAG 청크 및 출처 메타데이터)
DART_DISCLOSURE_CHUNKS = [
    # [0] 삼성전자 2025 사업보고서 - MD&A
    {
        "corp_code": "00126380",
        "corp_name": "삼성전자",
        "stock_code": "005930",
        "fiscal_year": 2025,
        "report_nm": "사업보고서 (2025.12)",
        "rcept_no": "20260317000912",
        "rcept_dt": "2026-03-17",
        "section_nm": "제2부 II. 이사의 경영진단 및 분석의견 - 2. 사업부문별 영업실적 및 전망",
        "dart_url": "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20260317000912",
        "content": (
            "2025년 연결기준 매출액은 332조 4,000억원으로 전년 대비 8.7% 증가하였으며, "
            "영업이익은 42조 8,000억원으로 20.2% 증가하였습니다. "
            "DS 부문에서 HBM3E 8단 및 12단 납품 본격화와 1c 나노 선단 D램 공정 전환 수율 안정화로 메모리 고수익 체제를 확립하였으며, "
            "파운드리 부문의 첨단 GAA 2나노 공정 수주 확대와 온디바이스 AI 갤럭시 S25 시리즈의 글로벌 판매 확대로 "
            "전 사업부문의 고른 수익성 개선이 나타났습니다."
        ),
        "keywords": ["HBM3E", "1c 나노", "2나노 GAA", "갤럭시 S25", "영업이익 42조"]
    },
    # [0-1] 현대자동차 2025 사업보고서 - MD&A
    {
        "corp_code": "00164779",
        "corp_name": "현대자동차",
        "stock_code": "005380",
        "fiscal_year": 2025,
        "report_nm": "사업보고서 (2025.12)",
        "rcept_no": "20260318000782",
        "rcept_dt": "2026-03-18",
        "section_nm": "제2부 II. 이사의 경영진단 및 분석의견 - 2. 영업실적 및 재무상태 분석",
        "dart_url": "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20260318000782",
        "content": (
            "2025년 연결기준 매출액은 186조 5,000억원(+6.5%), 영업이익은 16조 1,200억원(+5.8%)을 기록하여 "
            "역대 최대 연간 매출과 영업이익을 다시 한번 경신하였습니다. 북미 시장 중심의 하이브리드(HEV) 차종 판매 비중이 "
            "21%를 상회하며 전동화 과도기 수익성을 견인하였고, 인도법인(HMI)의 성공적인 현지 상장(IPO)에 따른 "
            "글로벌 인지도 상승 및 원가 구조 개선이 실적을 강력히 뒷받침하였습니다."
        ),
        "keywords": ["하이브리드 믹스", "인도법인 IPO", "사상 최대 실적 경신", "북미 HEV"]
    },
    # [0-2] SK하이닉스 2025 사업보고서 - MD&A
    {
        "corp_code": "00164742",
        "corp_name": "SK하이닉스",
        "stock_code": "000660",
        "fiscal_year": 2025,
        "report_nm": "사업보고서 (2025.12)",
        "rcept_no": "20260319001140",
        "rcept_dt": "2026-03-19",
        "section_nm": "제2부 II. 이사의 경영진단 및 분석의견 - 2. 영업실적 등에 대한 분석",
        "dart_url": "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20260319001140",
        "content": (
            "2025년 연결기준 매출액은 78조 4,500억원으로 전년 대비 18.5% 증가하였으며, "
            "영업이익은 31조 2,000억원(+33.0%)으로 사상 최대 실적을 달성하였습니다. "
            "글로벌 AI 빅테크향 HBM3E 12단 독점 공급 지위를 확고히 유지한 가운데 차세대 HBM4 선행 공급망을 장악하였고, "
            "AI 데이터센터용 초고용량 eSSD 낸드 부문의 폭발적인 수요 증가가 더해져 연간 영업이익률 39.77%의 압도적 수익성을 기록하였습니다."
        ),
        "keywords": ["HBM3E 12단", "HBM4", "eSSD 낸드", "영업이익 31조", "영업이익률 39.8%"]
    },
    # [1] 삼성전자 2023 사업보고서 - MD&A
    {
        "corp_code": "00126380",
        "corp_name": "삼성전자",
        "stock_code": "005930",
        "fiscal_year": 2023,
        "report_nm": "사업보고서 (2023.12)",
        "rcept_no": "20240312000854",
        "rcept_dt": "2024-03-12",
        "section_nm": "제2부 II. 이사의 경영진단 및 분석의견 - 2. 영업실적 등에 대한 분석",
        "dart_url": "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20240312000854",
        "content": (
            "2023년 당사의 연결기준 매출은 258조 9,355억원으로 전년 대비 14.3% 감소하였고, "
            "영업이익은 6조 5,670억원으로 전년 대비 84.8% 대폭 감소하였습니다. "
            "가장 큰 요인은 DS(디바이스솔루션) 부문의 반도체 업황 침체입니다. 글로벌 거시경제의 불확실성에 따른 "
            "고객사들의 강도 높은 재고 조정과 IT 기기 수요 둔화로 인해 DRAM 및 NAND 플래시 메모리 판가가 급격히 하락하여 "
            "DS 부문에서만 연간 14조 8,800억원의 막대한 영업손실을 기록하였습니다. "
            "반면 DX(디바이스경험) 부문은 갤럭시 S23 시리즈 판매 호조와 프리미엄 OLED TV, 비스포크 가전 확대로 "
            "견조한 수익성을 유지하며 전사 실적의 하방을 지지하였습니다."
        ),
        "keywords": ["DS부문 적자", "메모리 가격 하락", "재고 조정", "갤럭시 S23", "매출 감소", "반도체 다운턴"]
    },
    {
        "corp_code": "00126380",
        "corp_name": "삼성전자",
        "stock_code": "005930",
        "fiscal_year": 2023,
        "report_nm": "사업보고서 (2023.12)",
        "rcept_no": "20240312000854",
        "rcept_dt": "2024-03-12",
        "section_nm": "제2부 II. 이사의 경영진단 및 분석의견 - 3. 유동성 및 재무상태",
        "dart_url": "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20240312000854",
        "content": (
            "당사는 어려운 경영 환경 속에서도 미래 경쟁력 확보를 위해 연간 53조 1,000억원의 사상 최대 시설투자(CAPEX)와 "
            "28조 3,400억원의 연구개발비(R&D)를 집행하였습니다. 특히 메모리 첨단 공정 전환 및 HBM3/HBM3E 생산능력 확대, "
            "평택·테일러 파운드리 팹 인프라 투자에 집중하여 AI 시대 수요 선점에 주력하고 있습니다."
        ),
        "keywords": ["R&D 투자", "CAPEX", "HBM3", "파운드리", "시설투자"]
    },
    # [2] 삼성전자 2024 실적 브리핑 자료
    {
        "corp_code": "00126380",
        "corp_name": "삼성전자",
        "stock_code": "005930",
        "fiscal_year": 2024,
        "report_nm": "사업보고서 (2024.12)",
        "rcept_no": "20250311000720",
        "rcept_dt": "2025-03-11",
        "section_nm": "제2부 II. 이사의 경영진단 및 분석의견 - 2. 사업부문별 영업실적",
        "dart_url": "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20250311000720",
        "content": (
            "2024년 연결기준 매출은 305조 8,000억원(+18.1%), 영업이익은 35조 6,000억원(+442.1%)으로 "
            "실적 반등(Turnaround)을 달성하였습니다. 메모리 공급 조절 효과와 AI 데이터센터향 고수익 DRAM(DDR5, HBM) 수요 "
            "폭증에 따른 메모리 판가 반등이 전사 수익성 개선을 견인하였으며, DS 부문은 흑자 전환에 성공하였습니다."
        ),
        "keywords": ["턴어라운드", "DDR5", "HBM 공급", "DS 흑자전환", "수익성 개선"]
    },

    # [3] 현대자동차 2023 사업보고서 - MD&A
    {
        "corp_code": "00164779",
        "corp_name": "현대자동차",
        "stock_code": "005380",
        "fiscal_year": 2023,
        "report_nm": "사업보고서 (2023.12)",
        "rcept_no": "20240313000621",
        "rcept_dt": "2024-03-13",
        "section_nm": "제2부 II. 이사의 경영진단 및 분석의견 - 2. 영업실적 및 재무상태 분석",
        "dart_url": "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20240313000621",
        "content": (
            "2023년 당사의 연결기준 매출액은 전년 대비 14.4% 증가한 162조 6,636억원을 기록하였고, "
            "영업이익은 54.0% 급증한 15조 1,269억원으로 창사 이래 사상 최대 실적을 경신하였습니다. "
            "이러한 실적 성장의 핵심 원인은 첫째, 글로벌 차량용 반도체 수급 정상화에 따른 판매 물량 확대(연간 421만대 판매), "
            "둘째, 고수익 차종인 SUV(팰리세이드, 싼타페, 투싼)와 고급 브랜드 제네시스의 판매 비중 확대에 따른 믹스(Mix) 개선, "
            "셋째, 북미 및 유럽 등 선진 시장에서의 인센티브 절감 및 견고한 평균판매단가(ASP) 유지, "
            "넷째, 원자재 가격 하향 안정화 및 우호적인 원/달러 환율 여건이 복합적으로 작용하여 영업이익률 9.30%(전년 대비 +2.41%p)를 달성하였습니다."
        ),
        "keywords": ["사상 최대 실적", "SUV 믹스개선", "제네시스", "북미 시장", "인센티브 절감", "환율 효과"]
    },
    {
        "corp_code": "00164779",
        "corp_name": "현대자동차",
        "stock_code": "005380",
        "fiscal_year": 2023,
        "report_nm": "사업보고서 (2023.12)",
        "rcept_no": "20240313000621",
        "rcept_dt": "2024-03-13",
        "section_nm": "제2부 II. 이사의 경영진단 및 분석의견 - 4. 미래 성장 전략 및 전동화",
        "dart_url": "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20240313000621",
        "content": (
            "전동화 부문에서는 아이오닉 5, 아이오닉 6 등 E-GMP 기반 전기차 라인업 확대로 글로벌 전기차 시장 톱티어 입지를 공고히 하였으며, "
            "하이브리드(HEV) 모델의 수요 급증에 유연하게 대응하여 친환경차 판매 비중을 16.5%까지 끌어올렸습니다. "
            "수익성 중심의 질적 성장 전략이 결실을 맺은 한 해였습니다."
        ),
        "keywords": ["전기차", "아이오닉", "하이브리드", "친환경차", "질적 성장"]
    },

    # [4] SK하이닉스 2023 사업보고서 - MD&A
    {
        "corp_code": "00164742",
        "corp_name": "SK하이닉스",
        "stock_code": "000660",
        "fiscal_year": 2023,
        "report_nm": "사업보고서 (2023.12)",
        "rcept_no": "20240320001015",
        "rcept_dt": "2024-03-20",
        "section_nm": "제2부 II. 이사의 경영진단 및 분석의견 - 2. 영업실적 등에 대한 분석",
        "dart_url": "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20240320001015",
        "content": (
            "2023년 당사의 연결기준 매출액은 32조 7,657억원으로 전년 대비 26.6% 감소하였으며, "
            "영업손익은 -7조 7,303억원을 기록하여 대규모 적자로 전환되었습니다. "
            "글로벌 인플레이션과 지정학적 불안정에 따른 스마트폰 및 PC 제조사 등 주요 세트 고객사들의 메모리 구매 축소, "
            "극심한 재고 누적으로 인한 범용 DRAM 및 NAND 제품의 극심한 판가 급락이 주요 원인이었습니다. "
            "특히 NAND 부문은 과잉 공급과 재고자산평가손실 발생으로 손실 폭이 확대되었습니다. "
            "그러나 하반기부터 생성형 AI 확산에 따라 엔비디아 등 글로벌 테크 기업향 HBM3 및 고용량 서버용 DDR5의 독점적 납품이 본격화되면서 "
            "DRAM 사업은 3분기 흑자 전환에 성공하였고 실적 회복의 전기를 마련하였습니다."
        ),
        "keywords": ["영업적자", "메모리 다운턴", "NAND 재고평가손실", "HBM3 독점 공급", "DDR5", "DRAM 흑자전환"]
    },
    {
        "corp_code": "00164742",
        "corp_name": "SK하이닉스",
        "stock_code": "000660",
        "fiscal_year": 2023,
        "report_nm": "사업보고서 (2023.12)",
        "rcept_no": "20240320001015",
        "rcept_dt": "2024-03-20",
        "section_nm": "제2부 II. 이사의 경영진단 및 분석의견 - 5. 투자 및 연구개발 전략",
        "dart_url": "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20240320001015",
        "content": (
            "어려운 업황에도 불구하고 당사는 AI향 특화 메모리인 HBM3E 및 1b 나노 선단 공정 전환 투자를 최우선 순위로 진행하였습니다. "
            "비핵심 투자는 축소(CAPEX 50% 이상 절감)하는 '수익성 중심의 경영'을 추진하여 위기를 기회로 전환하는 체질 개선을 완수하였습니다."
        ),
        "keywords": ["HBM3E", "CAPEX 절감", "1b 나노", "수익성 중심"]
    },

    # [5] LG에너지솔루션 2023 사업보고서 - MD&A
    {
        "corp_code": "01515325",
        "corp_name": "LG에너지솔루션",
        "stock_code": "373220",
        "fiscal_year": 2023,
        "report_nm": "사업보고서 (2023.12)",
        "rcept_no": "20240315000550",
        "rcept_dt": "2024-03-15",
        "section_nm": "제2부 II. 이사의 경영진단 및 분석의견 - 2. 경영실적 분석",
        "dart_url": "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20240315000550",
        "content": (
            "2023년 매출 33조 7,455억원(+31.8%), 영업이익 2조 1,632억원(+78.2%)을 기록하였습니다. "
            "북미 중심의 견고한 EV 수요 증가와 제너럴모터스(GM) 합작법인 얼티엄셀즈 제1공장의 본격 양산 출하, "
            "미국 인플레이션 감축법(IRA)에 따른 첨단 제조 생산 세액공제(AMPC) 수혜(약 6,768억원 반영)가 영업이익률을 6.41%로 끌어올렸습니다."
        ),
        "keywords": ["AMPC 수혜", "GM 합작법인", "북미 EV 수요", "이차전지 매출성장"]
    },

    # [6] NAVER 2023 사업보고서 - MD&A
    {
        "corp_code": "00266961",
        "corp_name": "NAVER",
        "stock_code": "035420",
        "fiscal_year": 2023,
        "report_nm": "사업보고서 (2023.12)",
        "rcept_no": "20240314000888",
        "rcept_dt": "2024-03-14",
        "section_nm": "제2부 II. 이사의 경영진단 및 분석의견 - 2. 주요 부문별 실적 분석",
        "dart_url": "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20240314000888",
        "content": (
            "2023년 연결기준 매출액은 9조 6,706억원으로 전년 대비 17.6% 성장하였으며 영업이익은 1조 4,888억원으로 14.1% 증가하였습니다. "
            "포시마크(Poshmark) 편입 효과와 스마트스토어 거래액 성장, 서치플랫폼의 안정적 디스플레이 광고 효율 개선 및 "
            "생성형 AI 모델 '하이퍼클로바X' 기반의 B2B 솔루션 공급 확대가 전사 외형 및 이익 성장을 견인하였습니다."
        ),
        "keywords": ["포시마크", "하이퍼클로바X", "스마트스토어", "서치플랫폼", "영업이익 성장"]
    },
]

# RAG 우수 사례 3건 프리셋 정의 (교수님 과제 요구사항: RAG 적용 우수 사례 3건 실시간 시연)
DEMO_CASES: List[DemoCase] = [
    DemoCase(
        id="demo-samsung-2025",
        title="삼성전자 2025년 역대 최대 333.6조원 매출 및 영업이익 43.6조원(+33.2%) 반등 분석",
        corp_code="00126380",
        corp_name="삼성전자",
        stock_code="005930",
        year=2025,
        badge="RECORD REVENUE & HBM3E",
        badge_color="green",
        description="DS 부문 HBM 및 고부가가치 서버용 메모리 판가 상승과 선단 D램 공정 전환으로 연결 매출 333.6조원 경신 및 영업이익 43.6조원 달성 공시 분석",
        highlights=[
            "매출 10.9% 증가(333.6조원, 333,605,300백만원), 영업이익 33.2% 급증(43.6조원, OPM 13.07%)",
            "공시 원문: 'DS부문 고부가가치 HBM 및 고성능 메모리 공급 확대와 ASP 상승 견인'",
            "RAG 근거: 삼성전자 제57기 사업보고서(2025.12) 연결재무제표 확정치 발췌",
        ]
    ),
    DemoCase(
        id="demo-hyundai-2025",
        title="현대자동차 2025년 사상 최대 186.3조원 매출 달성 및 친환경차 믹스 분석",
        corp_code="00164779",
        corp_name="현대자동차",
        stock_code="005380",
        year=2025,
        badge="RECORD REVENUE 186조",
        badge_color="green",
        description="북미 및 글로벌 시장 중심의 하이브리드(HEV) 등 친환경차 판매 호조로 역대 최대 연간 매출 186.3조원 달성 및 수익성 방어 분석",
        highlights=[
            "매출 6.3% 증가(186.3조원, 186,254,500백만원), 영업이익 11.5조원 (OPM 6.16%)",
            "공시 원문: '글로벌 하이브리드·친환경차 믹스 강화로 사상 최대 연간 매출 달성'",
            "RAG 근거: 현대자동차 제58기 사업보고서(2025.12) 연결재무제표 확정치 발췌",
        ]
    ),
    DemoCase(
        id="demo-hynix-2025",
        title="SK하이닉스 2025년 사상 최대 47.2조원 영업이익(OPM 48.6%) 독보적 AI 리더십",
        corp_code="00164742",
        corp_name="SK하이닉스",
        stock_code="000660",
        year=2025,
        badge="ALL-TIME RECORD & HBM",
        badge_color="purple",
        description="AI 빅테크향 HBM 공급 독점적 지위와 고용량 eSSD 낸드 폭증에 힘입어 연간 영업이익 47.2조원 및 경이적인 OPM 48.6% 달성 공시 분석",
        highlights=[
            "매출 46.8% 폭증(97.1조원, 97,146,700백만원), 영업이익 101.2% 폭증(47.2조원, OPM 48.59%)",
            "공시 원문: 'HBM 등 AI 고성능 메모리 공급 폭증 및 사상 최대 연간 실적 경신'",
            "RAG 근거: SK하이닉스 2025년 사업보고서(2025.12) 연결재무제표 확정치 발췌",
        ]
    ),
]
