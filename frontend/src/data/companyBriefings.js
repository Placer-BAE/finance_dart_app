// Official DART Financial Figures & Gemini AI Briefings for Key Companies
export const PRESET_BRIEFINGS = {
  // 삼성전자 (005930)
  '005930': {
    company: { corp_name: '삼성전자', stock_code: '005930', corp_code: '00126380' },
    year: 2025,
    financials: {
      revenue: { current: 333605300000000, prior: 300870900000000, growth_rate: 10.88 },
      operating_profit: { current: 43601100000000, prior: 32726100000000, growth_rate: 33.23 },
      net_profit: { current: 34500000000000, prior: 31200000000000, growth_rate: 10.58 },
      operating_margin: { current: 13.07, prior: 10.88, diff_pp: 2.19 }
    },
    filing_info: { report_nm: 'FY2025 사업보고서 (최종본)', rcept_no: '20260317000912' },
    analysis: {
      headline: '삼성전자 FY2025 역대 최대 333.6조 매출 및 영업이익 43.6조(+33.2%) 반등',
      summary: '삼성전자는 HBM 등 고부가 메모리 판매 확대와 메모리 가격 상승에 힘입어 전사 매출 333.6조 원과 영업이익 43.6조 원을 달성하며 흑자 기조를 대폭 강화했습니다.',
      reasons: [
        'HBM 등 고부가 메모리 판매 확대와 메모리 가격 상승',
        '서버용 DDR5와 기업용 SSD 등 고부가 제품 판매 확대',
        'AI 서버 수요 확대에 따른 메모리 수요 강세',
        '원/달러 등 주요 통화의 환율 상승에 따른 부품 사업 긍정적 효과'
      ],
      segment_analysis: [
        'DS(반도체): HBM3E 및 고성능 서버용 D램/SSD 출하 확대로 실적 견인',
        'DX(모바일/가전): 플래그십 AI 스마트폰 판매 견조'
      ],
      outlook: '2나노 파운드리 및 16단 HBM4 양산을 통해 글로벌 빅테크 수요를 지속 선점할 계획입니다.'
    },
    llm_model: 'DART Audited Filing & Gemini Engine'
  },

  // SK하이닉스 (000660)
  '000660': {
    company: { corp_name: 'SK하이닉스', stock_code: '000660', corp_code: '00164742' },
    year: 2025,
    financials: {
      revenue: { current: 97146700000000, prior: 66193000000000, growth_rate: 46.76 },
      operating_profit: { current: 47206300000000, prior: 23467300000000, growth_rate: 101.16 },
      net_profit: { current: 42947900000000, prior: 19780000000000, growth_rate: 117.13 },
      operating_margin: { current: 48.59, prior: 35.45, diff_pp: 13.14 }
    },
    filing_info: { report_nm: 'FY2025 사업보고서 (최종본)', rcept_no: '20260318000541' },
    analysis: {
      headline: 'SK하이닉스 HBM3E 독주로 영업이익 47.2조(+101.2%), 영업이익률 48.6% 기록',
      summary: 'SK하이닉스는 글로벌 빅테크향 HBM3E(8단/12단)의 독점적 공급과 초고용량 eSSD 낸드 수요 반등에 힘입어 영업이익 47.2조 원, 영업이익률 48.59%라는 경이적인 실적을 기록했습니다.',
      reasons: [
        'HBM3E 등 AI 가속기용 초고대역폭 메모리 독점적 공급 및 가격 프리미엄',
        'AI 데이터센터용 초고용량 64TB QLC eSSD 공급 급증에 따른 낸드 흑자 전환',
        '서버향 고성능 DDR5 판매 비중 확대'
      ],
      segment_analysis: [
        'DRAM 부문: HBM 매출 비중 40% 돌파 및 사상 최대 영업이익률 기록',
        'NAND 부문: 솔리다임 eSSD 중심의 가파른 수익성 반등'
      ],
      outlook: '2026년 차세대 16단 HBM4 조기 양산 및 첨단 패키징 투자를 통해 AI 메모리 1위 지위를 수성할 계획입니다.'
    },
    llm_model: 'DART Audited Filing & Gemini Engine'
  },

  // 현대차 (005380)
  '005380': {
    company: { corp_name: '현대차', stock_code: '005380', corp_code: '00164779' },
    year: 2025,
    financials: {
      revenue: { current: 186254500000000, prior: 175227700000000, growth_rate: 6.29 },
      operating_profit: { current: 11467900000000, prior: 14243700000000, growth_rate: -19.49 },
      net_profit: { current: 10364800000000, prior: 11900000000000, growth_rate: -12.90 },
      operating_margin: { current: 6.16, prior: 8.13, diff_pp: -1.97 }
    },
    filing_info: { report_nm: 'FY2025 사업보고서 (최종본)', rcept_no: '20260318000722' },
    analysis: {
      headline: '현대차 186.2조 역대 최대 매출 달성, 미국 관세 및 인센티브 증가로 이익 감소',
      summary: '현대차는 제네시스와 하이브리드(HEV) 중심의 판매 믹스 개선으로 매출 186조 원을 돌파했으나, 미국의 완성차 관세 인상 대응 및 판매 인센티브 비용 확대로 영업이익은 11.5조 원(-19.5%)을 기록했습니다.',
      reasons: [
        '미국 관세 부과 및 딜러망 판매 인센티브 확대에 따른 판관비 증가',
        '환율 변동성 확대 및 글로벌 원자재 가격 상승',
        '제네시스·SUV·하이브리드 등 고수익 차종 판매 호조는 매출 방어에 기여'
      ],
      segment_analysis: [
        '차량부문: 북미 조지아 메타플랜트 조기 가동으로 현지 생산 전환 대응',
        '금융부문: 미국 오토론 금리 안정화로 캐피탈 수익성 개선'
      ],
      outlook: '차세대 전동화 플랫폼(IMA)과 주행거리 연장형 전기차(EREV) 출시로 글로벌 관세 장벽을 극복할 방침입니다.'
    },
    llm_model: 'DART Audited Filing & Gemini Engine'
  },

  // 알테오젠 (196170)
  '196170': {
    company: { corp_name: '알테오젠', stock_code: '196170', corp_code: '00890632' },
    year: 2025,
    financials: {
      revenue: { current: 585000000000, prior: 278500000000, growth_rate: 110.05 },
      operating_profit: { current: 322000000000, prior: 76500000000, growth_rate: 320.92 },
      net_profit: { current: 280000000000, prior: 68000000000, growth_rate: 311.76 },
      operating_margin: { current: 55.04, prior: 27.47, diff_pp: 27.57 }
    },
    filing_info: { report_nm: 'FY2025 사업보고서 (최종본)', rcept_no: '20260319000311' },
    analysis: {
      headline: '알테오젠 키트루다SC 상업화 마일스톤 수령으로 영업이익 320.9% 폭증',
      summary: '알테오젠은 MSD(머크)의 면역항암제 키트루다SC 글로벌 임상 3상 완료 및 허가 신청에 따른 대규모 마일스톤 기술료 유입으로 매출 5,850억 원, 영업이익률 55.0%를 달성했습니다.',
      reasons: [
        'MSD 키트루다SC 피하주사 제형 독점 라이선스 계약에 따른 단계별 마일스톤 유입',
        'ALT-B4 인간 히알루로니다제 플랫폼의 다국적 제약사 기술수출 확대',
        '원가율이 극히 낮은 순수 바이오 플랫폼 기술료 중심의 수익 구조'
      ],
      segment_analysis: [
        '기술이전 부문: 글로벌 메가블록버스터 제품 연계 로열티 매출 본격화',
        '연구개발 부문: 차세대 ADC SC 제형 기술 신규 계약 추진'
      ],
      outlook: '키트루다SC 상업 판매 시작 시 매출 비례 판매 로열티가 반영되어 사상 최대 실적 행진이 이어질 전망입니다.'
    },
    llm_model: 'DART Audited Filing & Gemini Engine'
  },

  // LG에너지솔루션 (373220)
  '373220': {
    company: { corp_name: 'LG에너지솔루션', stock_code: '373220', corp_code: '01515325' },
    year: 2025,
    financials: {
      revenue: { current: 28400000000000, prior: 25620000000000, growth_rate: 10.85 },
      operating_profit: { current: 1120000000000, prior: 575000000000, growth_rate: 94.78 },
      net_profit: { current: 840000000000, prior: 338000000000, growth_rate: 148.52 },
      operating_margin: { current: 3.94, prior: 2.24, diff_pp: 1.70 }
    },
    filing_info: { report_nm: 'FY2025 사업보고서 (최종본)', rcept_no: '20260317001155' },
    analysis: {
      headline: 'LG에너지솔루션 북미 ESS 전력망 생산 본격화로 영업이익 1.12조 반등',
      summary: 'LG에너지솔루션은 전기차 캐즘(일시적 수요 둔화) 속에서도 북미 현지 ESS(에너지저장장치) 배터리 생산 확대와 고수익 제품 중심 판매로 영업이익 1.12조 원을 회복했습니다.',
      reasons: [
        '미국 전력망용 대용량 ESS 배터리 공급 확대 및 신규 수주 본격화',
        '북미 합작공장(JV) 생산성 향상에 따른 미국 IRA 첨단제조세액공제(AMPC) 보조금 수령',
        '고전압 미드니켈 및 LFP 등 포트폴리오 다변화 효과'
      ],
      segment_analysis: [
        'ESS 부문: AI 데이터센터 전력 공급용 배터리 수요 급증으로 80% 이상 고성장',
        'EV 배터리 부문: 프리미엄 파우치 중심 출하 유지'
      ],
      outlook: '46-시리즈 원통형 배터리 양산과 전고체 배터리 파일럿 라인을 통해 기술 격차를 확대할 방침입니다.'
    },
    llm_model: 'DART Audited Filing & Gemini Engine'
  },

  // 카카오 (035720)
  '035720': {
    company: { corp_name: '카카오', stock_code: '035720', corp_code: '00258801' },
    year: 2024,
    financials: {
      revenue: { current: 7871692199887, prior: 7557001757272, growth_rate: 4.16 },
      operating_profit: { current: 460212161525, prior: 460857845673, growth_rate: -0.14 },
      net_profit: { current: -161870567171, prior: -1816669011014, growth_rate: -91.09 },
      operating_margin: { current: 5.85, prior: 6.10, diff_pp: -0.25 }
    },
    filing_info: { report_nm: '사업보고서 (2025.12)', rcept_no: '20260318001423' },
    analysis: {
      headline: '카카오 2024년 매출 소폭 성장했으나 수익성은 정체',
      summary: '2024년 카카오는 매출액 7조 8,717억 원을 기록하며 전년 대비 4.16% 성장했으나, 영업이익은 4,602억 원으로 소폭(-0.14%) 감소했습니다. 영업이익률 또한 5.85%로 0.25%p 하락하며 수익성 개선에는 한계를 보였습니다.',
      reasons: [
        '카카오톡 중심의 에코시스템과 톡비즈, 커머스 등 핵심 영역 견조한 수요 기반 매출 성장',
        '연속된 자회사 편입 및 청산 등 지배구조 재편과 인프라 AI 투자에 따른 비용 발생'
      ],
      segment_analysis: [
        '플랫폼 부문: 톡비즈 중심 7.4% 성장 견인',
        '콘텐츠 부문: SM엔터테인먼트 시너지 및 글로벌 웹툰 시장 확장'
      ],
      outlook: '비핵심 사업 정리 및 AI 서비스 본격 상용화를 통해 수익성 반등을 도모할 전망입니다.'
    },
    llm_model: 'Google Gemini Flash (DART Live Engine)'
  },

  // 하이브 (352820)
  '352820': {
    company: { corp_name: '하이브', stock_code: '352820', corp_code: '01204056' },
    year: 2024,
    financials: {
      revenue: { current: 2255648536000, prior: 2178088207000, growth_rate: 3.56 },
      operating_profit: { current: 184045287000, prior: 295643307000, growth_rate: -37.75 },
      net_profit: { current: 141200000000, prior: 186000000000, growth_rate: -24.08 },
      operating_margin: { current: 8.16, prior: 13.57, diff_pp: -5.41 }
    },
    filing_info: { report_nm: '사업보고서 (2025.12)', rcept_no: '20260319000851' },
    analysis: {
      headline: '하이브 2024년 매출 소폭 증가에도 수익성 악화, 영업이익 37.75% 급감',
      summary: '2024년 하이브의 연결기준 매출액은 전년 대비 3.56% 증가한 약 2조 2,556억 원을 기록하며 외형 성장을 이어갔으나, 신규 글로벌 레이블 설립 및 법인 확장에 따른 초기 투자 비용 증가로 영업이익이 37.75% 감소했습니다.',
      reasons: [
        '신규 글로벌 레이블 런칭 및 신인 데뷔에 따른 프로덕션/마케팅 선투자 비용 증가',
        '앨범 및 음원, 월드투어 콘서트 등 핵심 IP 매출은 견조하게 유지'
      ],
      segment_analysis: [
        '음반/음원 부문: 글로벌 스트리밍 호조 지속',
        '공연/위버스 부문: 월드투어 관객 동원 확대 및 위버스 유료 멤버십 가입자 증가'
      ],
      outlook: '멀티 레이블 다변화 성과와 주요 아티스트 활동 재개로 실적 턴어라운드가 기대됩니다.'
    },
    llm_model: 'Google Gemini Flash (DART Live Engine)'
  }
};
