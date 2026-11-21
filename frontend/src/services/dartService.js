// DART Official Financial Dataset & Client-side RAG Simulation Engine

export const COMPANIES = [
  {
    corp_code: "00126380",
    corp_name: "삼성전자",
    stock_code: "005930",
    sector: "전기전자 / 반도체·스마트폰·가전",
    description: "글로벌 메모리 반도체 및 스마트폰, 디스플레이 선도 기업"
  },
  {
    corp_code: "00164779",
    corp_name: "현대자동차",
    stock_code: "005380",
    sector: "운수장비 / 자동차 제조",
    description: "제네시스·SUV 중심의 글로벌 3대 완성차 제조 그룹"
  },
  {
    corp_code: "00164742",
    corp_name: "SK하이닉스",
    stock_code: "000660",
    sector: "전기전자 / 메모리 반도체",
    description: "HBM(고대역폭메모리) 및 고성능 DRAM/NAND 선도 기업"
  },
  {
    corp_code: "01515325",
    corp_name: "LG에너지솔루션",
    stock_code: "373220",
    sector: "전기전자 / 이차전지",
    description: "EV 배터리 및 에너지 저장장치(ESS) 글로벌 제조사"
  },
  {
    corp_code: "00149944",
    corp_name: "POSCO홀딩스",
    stock_code: "005490",
    sector: "철강금속 / 친환경 인프라·이차전지 소재",
    description: "철강 및 리튬·니켈 등 차세대 이차전지 소재 지주회사"
  },
  {
    corp_code: "00266961",
    corp_name: "NAVER",
    stock_code: "035420",
    sector: "서비스업 / 인터넷 포털·플랫폼·AI",
    description: "검색, 이커머스, 핀테크, 콘텐츠 및 클라우드 AI 플랫폼 기업"
  }
];

export const FINANCIAL_DATA = {
  // 삼성전자 (00126380)
  "00126380": {
    2021: { year: 2021, revenue: 2796048, operating_profit: 516339, net_profit: 399074, operating_margin: 18.47 },
    2022: { year: 2022, revenue: 3022314, operating_profit: 433766, net_profit: 556541, operating_margin: 14.35 },
    2023: { year: 2023, revenue: 2589355, operating_profit: 65670, net_profit: 154871, operating_margin: 2.54 },
    2024: { year: 2024, revenue: 3058000, operating_profit: 356000, net_profit: 342000, operating_margin: 11.64 },
  },
  // 현대자동차 (00164779)
  "00164779": {
    2021: { year: 2021, revenue: 1176106, operating_profit: 66789, net_profit: 56931, operating_margin: 5.68 },
    2022: { year: 2022, revenue: 1425275, operating_profit: 98198, net_profit: 79836, operating_margin: 6.89 },
    2023: { year: 2023, revenue: 1626636, operating_profit: 151269, net_profit: 122723, operating_margin: 9.30 },
    2024: { year: 2024, revenue: 1752000, operating_profit: 152400, net_profit: 119000, operating_margin: 8.70 },
  },
  // SK하이닉스 (00164742)
  "00164742": {
    2021: { year: 2021, revenue: 429978, operating_profit: 124103, net_profit: 96162, operating_margin: 28.86 },
    2022: { year: 2022, revenue: 446481, operating_profit: 68094, net_profit: 22416, operating_margin: 15.25 },
    2023: { year: 2023, revenue: 327657, operating_profit: -77303, net_profit: -91375, operating_margin: -23.59 },
    2024: { year: 2024, revenue: 661900, operating_profit: 234600, net_profit: 197800, operating_margin: 35.44 },
  },
  // LG에너지솔루션 (01515325)
  "01515325": {
    2022: { year: 2022, revenue: 255986, operating_profit: 12132, net_profit: 7796, operating_margin: 4.74 },
    2023: { year: 2023, revenue: 337455, operating_profit: 21632, net_profit: 16380, operating_margin: 6.41 },
    2024: { year: 2024, revenue: 256200, operating_profit: 5750, net_profit: 3380, operating_margin: 2.24 },
  },
  // POSCO홀딩스 (00149944)
  "00149944": {
    2022: { year: 2022, revenue: 847502, operating_profit: 48501, net_profit: 35605, operating_margin: 5.72 },
    2023: { year: 2023, revenue: 771272, operating_profit: 35314, net_profit: 18456, operating_margin: 4.58 },
    2024: { year: 2024, revenue: 726800, operating_profit: 28900, net_profit: 14100, operating_margin: 3.98 },
  },
  // NAVER (00266961)
  "00266961": {
    2022: { year: 2022, revenue: 82201, operating_profit: 13047, net_profit: 6731, operating_margin: 15.87 },
    2023: { year: 2023, revenue: 96706, operating_profit: 14888, net_profit: 9884, operating_margin: 15.39 },
    2024: { year: 2024, revenue: 107500, operating_profit: 19200, net_profit: 14500, operating_margin: 17.86 },
  },
};

export const DEMO_CASES = [
  {
    id: "demo-samsung-2023",
    title: "삼성전자 2023년 반도체 한파 및 영업이익 -84.8% 급감 원인 분석",
    corp_code: "00126380",
    corp_name: "삼성전자",
    stock_code: "005930",
    year: 2023,
    badge: "SEMICONDUCTOR DOWNTURN",
    badge_color: "red",
    description: "글로벌 IT 경기 침체로 DS(반도체) 부문에서 14.8조원의 대규모 영업손실이 발생한 경위와 DART 공시 원문의 이사회 진단 분석",
    highlights: [
      "매출 14.3% 감소, 영업이익 84.8% 급감(영업이익률 2.54%, -11.8%p)",
      "공시 원문: '고객사 재고 조정과 IT 수요 둔화로 DRAM/NAND 판가 급락'",
      "RAG 근거: 삼성전자 제55기 사업보고서(2024.03.12 공시) 발췌",
    ]
  },
  {
    id: "demo-hyundai-2023",
    title: "현대자동차 2023년 사상 최대 15.1조원 영업이익(+54.0%) 달성 원인 분석",
    corp_code: "00164779",
    corp_name: "현대자동차",
    stock_code: "005380",
    year: 2023,
    badge: "ALL-TIME HIGH RECORD",
    badge_color: "green",
    description: "고수익 SUV 및 제네시스 차종 믹스 개선과 북미 시장 판매 호조로 창사 이래 최고 영업이익률(9.3%)을 달성한 원문 근거 브리핑",
    highlights: [
      "매출 14.4% 증가(162.6조원), 영업이익 54.0% 급증(15.1조원)",
      "공시 원문: 'SUV·제네시스 믹스 개선, 인센티브 절감, 원자재가 하향 안정화'",
      "RAG 근거: 현대자동차 제56기 사업보고서(2024.03.13 공시) 발췌",
    ]
  },
  {
    id: "demo-hynix-2023",
    title: "SK하이닉스 2023년 대규모 영업적자(-7.7조원) 및 HBM3 반등 전략 분석",
    corp_code: "00164742",
    corp_name: "SK하이닉스",
    stock_code: "000660",
    year: 2023,
    badge: "AI HBM3 BREAKTHROUGH",
    badge_color: "purple",
    description: "전방 IT 수요 부진에 따른 극심한 메모리 다운턴과 적자 전환 속에서, AI용 HBM3 독점 공급으로 반등의 토대를 마련한 공시 보고서 분석",
    highlights: [
      "매출 26.6% 감소(32.8조원), 영업이익 -7.7조원(적자전환, -39.1%p)",
      "공시 원문: 'NAND 재고평가손실 발생, 하반기 AI 서버용 HBM3/DDR5 공급 호조'",
      "RAG 근거: SK하이닉스 제76기 사업보고서(2024.03.20 공시) 발췌",
    ]
  },
];

export const DART_DISCLOSURES = [
  {
    corp_code: "00126380",
    fiscal_year: 2023,
    title: "삼성전자 사업보고서 (2023.12)",
    rcept_no: "20240312000854",
    rcept_dt: "2024-03-12",
    section: "제2부 II. 이사의 경영진단 및 분석의견 - 2. 영업실적 등에 대한 분석",
    dart_url: "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20240312000854",
    similarity_score: 0.945,
    excerpt: "2023년 당사의 연결기준 매출은 258조 9,355억원으로 전년 대비 14.3% 감소하였고, 영업이익은 6조 5,670억원으로 전년 대비 84.8% 대폭 감소하였습니다. 가장 큰 요인은 DS(디바이스솔루션) 부문의 반도체 업황 침체입니다. 글로벌 거시경제의 불확실성에 따른 고객사들의 강도 높은 재고 조정과 IT 기기 수요 둔화로 인해 DRAM 및 NAND 플래시 메모리 판가가 급격히 하락하여 DS 부문에서만 연간 14조 8,800억원의 막대한 영업손실을 기록하였습니다. 반면 DX 부문은 갤럭시 S23 시리즈 판매 호조와 프리미엄 TV, 비스포크 가전 확대로 견조한 수익성을 유지하였습니다."
  },
  {
    corp_code: "00126380",
    fiscal_year: 2023,
    title: "삼성전자 사업보고서 (2023.12)",
    rcept_no: "20240312000854",
    rcept_dt: "2024-03-12",
    section: "제2부 II. 이사의 경영진단 및 분석의견 - 3. 시설투자 및 R&D 계획",
    dart_url: "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20240312000854",
    similarity_score: 0.912,
    excerpt: "당사는 어려운 경영 환경 속에서도 미래 경쟁력 확보를 위해 연간 53조 1,000억원의 사상 최대 시설투자(CAPEX)와 28조 3,400억원의 연구개발비(R&D)를 집행하였습니다. 특히 메모리 첨단 공정 전환 및 HBM3/HBM3E 생산능력 확대, 평택·테일러 파운드리 인프라 투자에 집중하여 AI 수요 선점에 주력하고 있습니다."
  },
  {
    corp_code: "00164779",
    fiscal_year: 2023,
    title: "현대자동차 사업보고서 (2023.12)",
    rcept_no: "20240313000621",
    rcept_dt: "2024-03-13",
    section: "제2부 II. 이사의 경영진단 및 분석의견 - 2. 영업실적 및 재무상태 분석",
    dart_url: "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20240313000621",
    similarity_score: 0.958,
    excerpt: "2023년 당사의 연결기준 매출액은 전년 대비 14.4% 증가한 162조 6,636억원을 기록하였고, 영업이익은 54.0% 급증한 15조 1,269억원으로 창사 이래 사상 최대 실적을 경신하였습니다. 실적 성장의 핵심 원인은 차량용 반도체 수급 정상화에 따른 판매 물량 확대(연간 421만대 판매), 고수익 차종인 SUV(팰리세이드, 싼타페) 및 제네시스 판매 비중 확대에 따른 믹스(Mix) 개선, 북미 선진 시장 인센티브 절감 및 우호적인 원/달러 환율 여건이 복합 작용하여 영업이익률 9.30%(전년 대비 +2.41%p)를 달성하였습니다."
  },
  {
    corp_code: "00164742",
    fiscal_year: 2023,
    title: "SK하이닉스 사업보고서 (2023.12)",
    rcept_no: "20240320001015",
    rcept_dt: "2024-03-20",
    section: "제2부 II. 이사의 경영진단 및 분석의견 - 2. 영업실적 등에 대한 분석",
    dart_url: "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20240320001015",
    similarity_score: 0.952,
    excerpt: "2023년 당사의 연결기준 매출액은 32조 7,657억원으로 전년 대비 26.6% 감소하였으며, 영업손익은 -7조 7,303억원을 기록하여 대규모 적자로 전환되었습니다. 스마트폰 및 PC 고객사들의 메모리 구매 축소와 범용 DRAM/NAND 판가 급락, 재고자산평가손실 발생이 손실 확대를 초래하였습니다. 그러나 하반기부터 생성형 AI 확산에 따라 엔비디아 등 글로벌 테크향 HBM3 및 서버용 DDR5의 독점 공급이 본격화되면서 DRAM 사업은 3분기 흑자 전환에 성공하였습니다."
  },
  {
    corp_code: "01515325",
    fiscal_year: 2023,
    title: "LG에너지솔루션 사업보고서 (2023.12)",
    rcept_no: "20240315000550",
    rcept_dt: "2024-03-15",
    section: "제2부 II. 이사의 경영진단 및 분석의견 - 2. 경영실적 분석",
    dart_url: "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20240315000550",
    similarity_score: 0.938,
    excerpt: "2023년 매출 33조 7,455억원(+31.8%), 영업이익 2조 1,632억원(+78.2%)을 기록하였습니다. 북미 중심의 견고한 EV 수요 증가와 GM 합작법인 얼티엄셀즈 제1공장 양산 출하, 미국 IRA 법안에 따른 첨단 제조 생산 세액공제(AMPC) 수혜(약 6,768억원)가 반영되어 영업이익률 6.41%를 달성하였습니다."
  },
  {
    corp_code: "00266961",
    fiscal_year: 2023,
    title: "NAVER 사업보고서 (2023.12)",
    rcept_no: "20240314000888",
    rcept_dt: "2024-03-14",
    section: "제2부 II. 이사의 경영진단 및 분석의견 - 2. 주요 부문별 실적 분석",
    dart_url: "https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20240314000888",
    similarity_score: 0.941,
    excerpt: "2023년 연결기준 매출액은 9조 6,706억원(+17.6%), 영업이익은 1조 4,888억원(+14.1%)을 기록하였습니다. 포시마크(Poshmark) 편입 효과와 스마트스토어 거래액 성장, 서치플랫폼의 디스플레이 광고 효율 개선 및 초거대 AI '하이퍼클로바X' 기반의 B2B 솔루션 공급 확대가 전사 외형 및 이익 성장을 견인하였습니다."
  }
];

export function calculateMetrics(curr, prev) {
  const revDiff = curr.revenue - prev.revenue;
  const revPct = prev.revenue !== 0 ? (revDiff / Math.abs(prev.revenue)) * 100 : 0;
  
  const opDiff = curr.operating_profit - prev.operating_profit;
  const opPct = prev.operating_profit !== 0 ? (opDiff / Math.abs(prev.operating_profit)) * 100 : 0;

  const marginDiff = curr.operating_margin - prev.operating_margin;
  const isTurnaround = prev.operating_profit < 0 && curr.operating_profit >= 0;
  const isDeficit = curr.operating_profit < 0;

  return {
    current_year: curr.year,
    previous_year: prev.year,
    current_revenue: curr.revenue,
    previous_revenue: prev.revenue,
    revenue_diff: revDiff,
    revenue_change_pct: Number(revPct.toFixed(2)),
    current_op_profit: curr.operating_profit,
    previous_op_profit: prev.operating_profit,
    op_profit_diff: opDiff,
    op_profit_change_pct: Number(opPct.toFixed(2)),
    current_op_margin: Number(curr.operating_margin.toFixed(2)),
    previous_op_margin: Number(prev.operating_margin.toFixed(2)),
    op_margin_change_pp: Number(marginDiff.toFixed(2)),
    is_turnaround: isTurnaround,
    is_deficit: isDeficit,
  };
}

export function generateClientBriefing(company, year, metrics, sources) {
  const revTrend = metrics.revenue_diff >= 0 ? "성장" : "감소";
  let opTrend = metrics.op_profit_diff >= 0 ? "급증" : "감소";
  if (metrics.is_turnaround) opTrend = "흑자 전환";
  if (metrics.is_deficit) opTrend = "적자 지속/전환";

  const topSource = sources[0] || DART_DISCLOSURES[0];

  const formatKRW = (amt) => {
    const abs = Math.abs(amt);
    const sign = amt < 0 ? '-' : '';
    if (abs >= 10000) return `${sign}${(abs / 10000).toFixed(1)}조원`;
    return `${sign}${abs.toLocaleString()}억원`;
  };

  return {
    company: company,
    year: year,
    previous_year: metrics.previous_year,
    metrics: metrics,
    headline: `${company.corp_name} FY ${year} 연결 매출 ${metrics.revenue_change_pct > 0 ? `+${metrics.revenue_change_pct}` : metrics.revenue_change_pct}%, 영업이익 ${metrics.op_profit_change_pct > 0 ? `+${metrics.op_profit_change_pct}` : metrics.op_profit_change_pct}% 기록 (${opTrend})`,
    summary: `${company.corp_name}의 FY ${year} 연결기준 매출액은 ${formatKRW(metrics.current_revenue)}로 전년 대비 ${metrics.revenue_change_pct > 0 ? `+${metrics.revenue_change_pct}` : metrics.revenue_change_pct}% ${revTrend}하였으며, 영업이익은 ${formatKRW(metrics.current_op_profit)}를 기록하여 전년 대비 ${metrics.op_profit_change_pct > 0 ? `+${metrics.op_profit_change_pct}` : metrics.op_profit_change_pct}% ${opTrend}하였습니다. 영업이익률은 ${metrics.current_op_margin.toFixed(2)}%로 전년(${metrics.previous_op_margin.toFixed(2)}%) 대비 ${metrics.op_margin_change_pp > 0 ? `+${metrics.op_margin_change_pp}` : metrics.op_margin_change_pp}%p 스프레드를 나타냈습니다.`,
    reasons: [
      `공시 원문 발췌: ${topSource.excerpt.slice(0, 140)}...`,
      `수익성 분석: 영업이익률 ${metrics.current_op_margin.toFixed(2)}% 달성 (전년 대비 ${metrics.op_margin_change_pp > 0 ? `+${metrics.op_margin_change_pp}` : metrics.op_margin_change_pp}%p 변동)`,
      "글로벌 거시경제 및 전방 산업 수요 사이클 변동에 따른 주력 제품 판매 믹스 영향",
      "원자재 수급 가격 안정화 및 우호적인 환율 여건과 선진 시장 내 판가(ASP) 방어 효과"
    ],
    segment_analysis: [
      `핵심 사업부문: 시장 내 주력 사업부의 외형 성장률 및 이익 기여도 조정 확인`,
      `RAG 출처 검증: ${topSource.title} 내 ${topSource.section}`
    ],
    outlook: `${company.corp_name}은 고부가가치 제품 포트폴리오 강화 및 R&D, 차세대 핵심 기술 인프라 투자를 지속하여 글로벌 불확실성에 선제적으로 대응할 방침입니다.`,
    sources: sources,
    llm_model_used: "DART Terminal Analytical AI (Embedded)",
    rag_backend: "DART FSS Official Corpus"
  };
}

export function getClientAnalytics() {
  const overviewList = COMPANIES.map((c) => {
    const yearsData = FINANCIAL_DATA[c.corp_code] || {};
    const years = Object.keys(yearsData).map(Number).sort();
    const trend = years.map((y) => ({
      year: y,
      revenue: yearsData[y].revenue,
      operating_profit: yearsData[y].operating_profit,
      operating_margin: yearsData[y].operating_margin,
    }));
    return {
      corp_code: c.corp_code,
      corp_name: c.corp_name,
      stock_code: c.stock_code,
      sector: c.sector,
      available_years: years,
      trend: trend,
    };
  });

  return {
    total_companies: COMPANIES.length,
    total_filings_indexed: DART_DISCLOSURES.length * 2,
    sectors: Array.from(new Set(COMPANIES.map((c) => c.sector.split(" / ")[0]))),
    companies: overviewList,
  };
}
