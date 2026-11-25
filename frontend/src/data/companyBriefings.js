// Pre-analyzed DART + Gemini Briefing Store for Key Companies
export const PRESET_BRIEFINGS = {
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
    filing_info: {
      report_nm: '사업보고서 (2025.12)',
      rcept_no: '20260318001423'
    },
    analysis: {
      headline: '카카오 2024년 매출 소폭 성장했으나 수익성은 정체',
      summary: '2024년 카카오는 매출액 7조 8,717억 원을 기록하며 전년 대비 4.16% 성장했으나, 영업이익은 4,602억 원으로 소폭(-0.14%) 감소했습니다. 영업이익률 또한 5.85%로 0.25%p 하락하며 수익성 개선에는 한계를 보였습니다. 메신저 및 커머스 등 핵심 사업을 중심으로 외형 성장을 이루었으나, 연결대상 종속회사의 변동 및 사업 효율화 과정에서 비용 구조 개선이 과제로 남았습니다.',
      reasons: [
        '카카오톡 중심의 에코시스템과 톡비즈, 커머스(선물하기) 등 핵심 영역 견조한 수요 기반 외형 성장',
        '연속된 자회사 편입 및 청산 등 지배구조 재편과 인프라/AI 투자에 따른 비용 발생 및 수익성 정체'
      ],
      segment_analysis: [
        '플랫폼 부문(톡비즈/포털/모빌리티): 톡비즈 중심 7.4% 성장 견인',
        '콘텐츠 부문(뮤직/스토리/미디어): SM엔터테인먼트 편입 효과 지속 및 글로벌 웹툰 시장 확장'
      ],
      outlook: '비핵심 사업 정리 및 AI 서비스(카나나 등) 본격 상용화를 통해 수익성 반등을 도모할 전망입니다.'
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
    filing_info: {
      report_nm: '사업보고서 (2025.12)',
      rcept_no: '20260319000851'
    },
    analysis: {
      headline: '하이브 2024년 매출 소폭 증가에도 수익성 악화, 영업이익 37.75% 급감',
      summary: '2024년 하이브의 연결기준 매출액은 전년 대비 3.56% 증가한 약 2조 2,556억 원을 기록하며 역대 최대 외형을 유지했으나, 영업이익은 1,840억 원으로 37.75% 대폭 감소했습니다. 이에 따라 영업이익률 역시 8.16%로 5.41%p 하락하며 수익성이 크게 악화되었습니다. 신규 레이블 및 북미/라틴 법인 설립 등 글로벌 사업 확장과 초기 투자 비용이 영업이익에 부담을 준 것으로 분석됩니다.',
      reasons: [
        '신규 글로벌 레이블(미국/라틴) 런칭 및 신인 아티스트 데뷔에 따른 프로덕션/마케팅 선투자 비용 증가',
        '앨범 및 음원, 월드투어 콘서트 등 핵심 지식재산권(IP) 매출은 견조하게 유지'
      ],
      segment_analysis: [
        '음반/음원 부문: 세븐틴, 뉴진스, TXT 등 주요 아티스트 글로벌 스트리밍 호조',
        '공연/위버스 플랫폼: 글로벌 투어 관객 동원 확대 및 위버스 유료 멤버십 가입자 증가'
      ],
      outlook: 'BTS 완전체 복귀 기대감과 멀티 레이블 다변화 성과가 본격화되면서 2025~2026년 실적 턴어라운드가 기대됩니다.'
    },
    llm_model: 'Google Gemini Flash (DART Live Engine)'
  }
};
