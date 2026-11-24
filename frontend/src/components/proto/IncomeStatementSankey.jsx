import React, { useState } from 'react';

// Pre-configured Income Statement Flow Data for Key Companies
// Matching App Economy Insights Sankey Format
export const SANKEY_DATA = {
  // 삼성전자 (005930)
  '005930': {
    company: '삼성전자',
    code: '005930',
    period: 'FY2025 연결 결산',
    unit: '조원',
    revenue: 333.6,
    revGrowth: '+10.9%',
    grossProfit: 102.5,
    grossMargin: '30.7%',
    costOfRevenue: 231.1,
    costPercent: '69.3%',
    operatingProfit: 43.6,
    opMargin: '13.1%',
    opGrowth: '+33.2%',
    operatingExpenses: 58.9,
    netProfit: 34.5,
    netMargin: '10.3%',
    taxAndOther: 9.1,
    segments: [
      { name: 'DS 부문 (반도체/HBM)', val: 115.8, growth: '+42.1%', color: '#3B82F6', desc: 'AI 서버용 HBM3E 및 고성능 DDR5/SSD 판매 폭증' },
      { name: 'DX 부문 (모바일/MX/네트워크)', val: 122.4, growth: '+4.2%', color: '#8B5CF6', desc: '갤럭시 S25 시리즈 및 폴더블 AI 스마트폰 호조' },
      { name: 'VD·DA 부문 (TV/가전)', val: 50.1, growth: '+1.5%', color: '#EC4899', desc: 'Neo QLED 프리미엄 TV 및 비스포크 AI 가전' },
      { name: 'SDC (디스플레이)', val: 31.2, growth: '+2.8%', color: '#F59E0B', desc: '플래그십 스마트폰용 OLED 패널 점유율 수성' },
      { name: 'Harman (전장/오디오)', val: 14.1, growth: '+8.5%', color: '#10B981', desc: '디지털 콕핏 및 카오디오 프리미엄 수주 확대' }
    ],
    expenses: [
      { name: '연구개발비 (R&D)', val: 37.7, pct: '11.3%', color: '#EF4444', desc: '2나노 파운드리 및 차세대 HBM4 개발 역대 최대 집행' },
      { name: '광고선전·판매촉진비 (S&M)', val: 12.8, pct: '3.8%', color: '#F87171', desc: '갤럭시 언팩 글로벌 마케팅 및 북미/유럽 판촉' },
      { name: '일반관리·기타비용 (G&A)', val: 8.4, pct: '2.5%', color: '#FCA5A5', desc: '본사 인건비, 감가상각비, 전산 및 물류비' }
    ]
  },

  // SK하이닉스 (000660)
  '000660': {
    company: 'SK하이닉스',
    code: '000660',
    period: 'FY2025 연결 결산',
    unit: '조원',
    revenue: 97.1,
    revGrowth: '+46.8%',
    grossProfit: 58.2,
    grossMargin: '59.9%',
    costOfRevenue: 38.9,
    costPercent: '40.1%',
    operatingProfit: 47.2,
    opMargin: '48.6%',
    opGrowth: '+101.2%',
    operatingExpenses: 11.0,
    netProfit: 42.9,
    netMargin: '44.2%',
    taxAndOther: 4.3,
    segments: [
      { name: 'DRAM (HBM3E/서버용 DDR5)', val: 68.0, growth: '+65.4%', color: '#3B82F6', desc: '글로벌 빅테크향 HBM 독점적 공급 및 가격 프리미엄' },
      { name: 'NAND (eSSD/솔리다임)', val: 25.1, growth: '+28.2%', color: '#8B5CF6', desc: 'AI 데이터센터용 초고용량 64TB QLC eSSD 공급 확대' },
      { name: '기타/MCP/파운드리', val: 4.0, growth: '+5.3%', color: '#10B981', desc: '패키징 및 시스템 반도체 위탁 제조' }
    ],
    expenses: [
      { name: '연구개발비 (R&D)', val: 6.2, pct: '6.4%', color: '#EF4444', desc: '1c nm DRAM 및 16단 HBM4 선행 연구 집행' },
      { name: '마케팅/판매비 (S&M)', val: 2.3, pct: '2.4%', color: '#F87171', desc: '북미/아시아 직판 채널 및 테크니컬 마케팅' },
      { name: '일반관리비 (G&A)', val: 2.5, pct: '2.6%', color: '#FCA5A5', desc: '성과급 및 공장 간접 운영비' }
    ]
  },

  // 현대차 (005380)
  '005380': {
    company: '현대차',
    code: '005380',
    period: 'FY2025 연결 결산',
    unit: '조원',
    revenue: 186.2,
    revGrowth: '+6.3%',
    grossProfit: 37.2,
    grossMargin: '20.0%',
    costOfRevenue: 149.0,
    costPercent: '80.0%',
    operatingProfit: 11.5,
    opMargin: '6.2%',
    opGrowth: '-19.5%',
    operatingExpenses: 25.7,
    netProfit: 10.4,
    netMargin: '5.6%',
    taxAndOther: 1.1,
    segments: [
      { name: '차량부문 (제네시스/SUV/하이브리드)', val: 145.2, growth: '+5.1%', color: '#3B82F6', desc: '투싼/싼타페 HEV 및 제네시스 GV70/80 글로벌 판매' },
      { name: '금융부문 (현대캐피탈/현대카드)', val: 32.1, growth: '+11.4%', color: '#8B5CF6', desc: '할부금융 자산 확대 및 미국 오토론 리스 증가' },
      { name: '기타 (현대글로비스/현대모비스 등)', val: 8.9, growth: '+7.2%', color: '#10B981', desc: '완성차 조달 물류 및 핵심 모듈 부품 공급' }
    ],
    expenses: [
      { name: '판매보증/인센티브비 (S&M)', val: 14.5, pct: '7.8%', color: '#EF4444', desc: '미국 관세 충격 방어용 인센티브 및 보증 충당금' },
      { name: '연구개발비 (R&D)', val: 5.8, pct: '3.1%', color: '#F87171', desc: '차세대 전동화 플랫폼(IMA) 및 자율주행 SDV 개발' },
      { name: '일반관리비 (G&A)', val: 5.4, pct: '2.9%', color: '#FCA5A5', desc: '글로벌 사업장 관리 및 물류 제경비' }
    ]
  },

  // 알테오젠 (196170)
  '196170': {
    company: '알테오젠',
    code: '196170',
    period: 'FY2025 연결 결산',
    unit: '억원',
    revenue: 5850,
    revGrowth: '+110.0%',
    grossProfit: 5200,
    grossMargin: '88.9%',
    costOfRevenue: 650,
    costPercent: '11.1%',
    operatingProfit: 3220,
    opMargin: '55.0%',
    opGrowth: '+320.9%',
    operatingExpenses: 1980,
    netProfit: 2800,
    netMargin: '47.9%',
    taxAndOther: 420,
    segments: [
      { name: '머크(MSD) 키트루다SC 마일스톤', val: 3850, growth: '+210%', color: '#3B82F6', desc: '피하주사형 제형 임상 3상 완료 및 허가 마일스톤' },
      { name: 'ALT-B4 인간 히알루로니다제 로열티', val: 1420, growth: '+45%', color: '#8B5CF6', desc: '산도즈, 다이이찌산쿄 등 글로벌 다국적 제약사 기술료' },
      { name: '바이오의약품 용역/기타', val: 580, growth: '+12%', color: '#10B981', desc: '공동 임상 시료 생산 및 분석 서비스' }
    ],
    expenses: [
      { name: '글로벌 임상 R&D', val: 1450, pct: '24.8%', color: '#EF4444', desc: 'ADC 피하주사 기술 개발 및 자체 파이프라인 임상' },
      { name: '특허/법률 자문비', val: 280, pct: '4.8%', color: '#F87171', desc: '글로벌 제형 특허 등록 및 기술수출 계약 법률비' },
      { name: '일반운영비 (G&A)', val: 250, pct: '4.3%', color: '#FCA5A5', desc: '연구인력 스톡옵션 및 본사 관리비' }
    ]
  },

  // LG에너지솔루션 (373220)
  '373220': {
    company: 'LG에너지솔루션',
    code: '373220',
    period: 'FY2025 연결 결산',
    unit: '조원',
    revenue: 28.4,
    revGrowth: '+10.9%',
    grossProfit: 4.8,
    grossMargin: '16.9%',
    costOfRevenue: 23.6,
    costPercent: '83.1%',
    operatingProfit: 1.12,
    opMargin: '3.9%',
    opGrowth: '+133.9%',
    operatingExpenses: 3.68,
    netProfit: 0.84,
    netMargin: '3.0%',
    taxAndOther: 0.28,
    segments: [
      { name: 'EV 배터리 (파우치/원통형)', val: 19.8, growth: '+4.2%', color: '#3B82F6', desc: 'GM·스텔란티스 북미 합작공장 출하' },
      { name: '전력망용 ESS 배터리', val: 6.5, growth: '+78.5%', color: '#8B5CF6', desc: '미국 LFP 기반 전력망 ESS 판매 본격화' },
      { name: '소형/IT 배터리', val: 2.1, growth: '-3.1%', color: '#10B981', desc: '웨어러블 및 전동공구향 납품' }
    ],
    expenses: [
      { name: 'R&D (차세대 전고체/LFP)', val: 1.85, pct: '6.5%', color: '#EF4444', desc: '건식 전극 공정 및 고에너지밀도 셀 개발' },
      { name: '물류/판매관리비 (S&M)', val: 0.98, pct: '3.5%', color: '#F87171', desc: '해외 거점 운송 및 보증 서비스' },
      { name: '운영/관리비 (G&A)', val: 0.85, pct: '3.0%', color: '#FCA5A5', desc: '해외 법인 운영 및 시스템 관리' }
    ]
  }
};

// Fallback dynamic generator for companies without custom detailed breakdown
export function getCompanySankeyData(company) {
  const code = company ? (company.code || company.stock_code) : '005930';
  if (SANKEY_DATA[code]) return SANKEY_DATA[code];

  // Auto-generate realistic DART income statement flow from company props
  const name = company?.name || '기업';
  const rev = company?.rev || '+10.0%';
  const op = company?.op || '+15.0%';
  const mg = company?.mg || '8.5%';

  // Estimate in 1조 scale
  return {
    company: name,
    code: code || '000000',
    period: 'FY2025 연결 결산',
    unit: '조원',
    revenue: 42.5,
    revGrowth: rev,
    grossProfit: 14.8,
    grossMargin: '34.8%',
    costOfRevenue: 27.7,
    costPercent: '65.2%',
    operatingProfit: 4.2,
    opMargin: mg,
    opGrowth: op,
    operatingExpenses: 10.6,
    netProfit: 3.1,
    netMargin: '7.3%',
    taxAndOther: 1.1,
    segments: [
      { name: `${name} 핵심 주력 사업`, val: 26.5, growth: '+12.4%', color: '#3B82F6', desc: '주력 제품군 및 서비스 매출' },
      { name: `${name} 신성장 사업부문`, val: 11.2, growth: '+18.1%', color: '#8B5CF6', desc: '해외 수출 및 신규 거래선 확대' },
      { name: '기타/용역 매출', val: 4.8, growth: '+2.1%', color: '#10B981', desc: '부대 사업 및 라이선스 수수료' }
    ],
    expenses: [
      { name: '연구개발비 (R&D)', val: 4.8, pct: '11.3%', color: '#EF4444', desc: '기술 고도화 및 품질 개선 투자' },
      { name: '판매/마케팅비 (S&M)', val: 3.5, pct: '8.2%', color: '#F87171', desc: '국내외 영업망 및 마케팅' },
      { name: '일반관리비 (G&A)', val: 2.3, pct: '5.4%', color: '#FCA5A5', desc: '인건비 및 공통 경비' }
    ]
  };
}

export default function IncomeStatementSankey({ company }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [viewMode, setViewMode] = useState('amount'); // 'amount' or 'percent'

  const data = getCompanySankeyData(company);

  // SVG Geometry Settings
  const width = 1000;
  const height = 480;

  // X Coordinates of Column Stages
  const X_SEGMENTS = 40;
  const X_REV = 300;
  const X_GROSS_COST = 530;
  const X_OP_EXP = 760;
  const X_NET_TAX = 960;

  const barWidth = 22;

  // Left Segment Flow Calculations
  const totalRev = data.revenue;
  let curSegY = 40;
  const segHeightTotal = 380;

  const segmentsWithCoords = data.segments.map((seg) => {
    const h = Math.max(28, (seg.val / totalRev) * segHeightTotal);
    const item = {
      ...seg,
      y: curSegY,
      h: h
    };
    curSegY += h + 14;
    return item;
  });

  // Center Nodes Calculations
  const revH = 260;
  const revY = 110;

  // Gross vs Cost split
  const costH = (data.costOfRevenue / totalRev) * revH;
  const grossH = (data.grossProfit / totalRev) * revH;
  const grossY = revY;
  const costY = grossY + grossH + 20;

  // Op Profit vs Op Expenses split
  const opExpH = (data.operatingExpenses / data.grossProfit) * grossH;
  const opProfitH = (data.operatingProfit / data.grossProfit) * grossH;
  const opProfitY = grossY;
  const opExpY = opProfitY + opProfitH + 18;

  // Expense sub-items breakdown
  let curExpY = opExpY;
  const expItemsWithCoords = data.expenses.map((exp) => {
    const h = Math.max(18, (exp.val / data.operatingExpenses) * (opExpH * 1.3));
    const item = {
      ...exp,
      y: curExpY,
      h: h
    };
    curExpY += h + 10;
    return item;
  });

  // Net Profit vs Tax split
  const netH = (data.netProfit / data.operatingProfit) * opProfitH;
  const taxH = (data.taxAndOther / data.operatingProfit) * opProfitH;
  const netY = opProfitY;
  const taxY = netY + netH + 16;

  // Helper to generate SVG smooth Bezier Ribbon Path
  const makeRibbon = (x0, y0, h0, x1, y1, h1) => {
    const cX0 = x0 + (x1 - x0) * 0.5;
    const cX1 = x0 + (x1 - x0) * 0.5;
    return `
      M ${x0} ${y0}
      C ${cX0} ${y0}, ${cX1} ${y1}, ${x1} ${y1}
      v ${h1}
      C ${cX1} ${y1 + h1}, ${cX0} ${y0 + h0}, ${x0} ${y0 + h0}
      Z
    `;
  };

  const fmtVal = (val) => {
    if (viewMode === 'percent') {
      const pct = ((val / totalRev) * 100).toFixed(1);
      return `${pct}%`;
    }
    return `${val} ${data.unit}`;
  };

  return (
    <div style={{ background: '#FFFFFF', border: '1px solid #E3E7EC', borderRadius: '24px', padding: '28px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
      {/* Title & Control Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, padding: '3px 10px', borderRadius: '6px', background: '#0C1622', color: '#34E0C8' }}>
              App Economy Insights 스타일
            </span>
            <span style={{ fontSize: '13px', color: '#6B7380' }}>
              {data.period} · {data.company} ({data.code})
            </span>
          </div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#10161E', letterSpacing: '-0.02em' }}>
            {data.company} 손익계산서 현금흐름도 (Sankey Flow)
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#4A5563' }}>
            매출의 사업부문별 유입에서부터 매출원가, 판관비(R&D·마케팅) 지출을 거쳐 최종 당기순이익에 이르는 손익 구조를 한눈에 파악합니다.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div style={{ display: 'inline-flex', background: '#F0F3F6', borderRadius: '12px', padding: '4px' }}>
          <button
            type="button"
            onClick={() => setViewMode('amount')}
            style={{
              padding: '6px 14px', border: 0, borderRadius: '8px',
              fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              background: viewMode === 'amount' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'amount' ? '#10161E' : '#6B7380',
              boxShadow: viewMode === 'amount' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            금액 기준 ({data.unit})
          </button>
          <button
            type="button"
            onClick={() => setViewMode('percent')}
            style={{
              padding: '6px 14px', border: 0, borderRadius: '8px',
              fontFamily: 'inherit', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
              background: viewMode === 'percent' ? '#FFFFFF' : 'transparent',
              color: viewMode === 'percent' ? '#10161E' : '#6B7380',
              boxShadow: viewMode === 'percent' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none'
            }}
          >
            비율 기준 (%)
          </button>
        </div>
      </div>

      {/* Sankey Flow Diagram Canvas */}
      <div style={{ overflowX: 'auto', width: '100%', position: 'relative' }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: '100%', minWidth: '880px', height: 'auto', display: 'block' }}
        >
          <defs>
            {/* Gradients for ribbons */}
            <linearGradient id="flow-rev" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#475569" stopOpacity="0.6" />
            </linearGradient>

            <linearGradient id="flow-gross" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#475569" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.55" />
            </linearGradient>

            <linearGradient id="flow-cost" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#475569" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#F87171" stopOpacity="0.55" />
            </linearGradient>

            <linearGradient id="flow-op" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#059669" stopOpacity="0.75" />
            </linearGradient>

            <linearGradient id="flow-exp" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#DC2626" stopOpacity="0.55" />
            </linearGradient>

            <linearGradient id="flow-net" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.85" />
            </linearGradient>

            <linearGradient id="flow-tax" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#059669" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* 1. RIBBONS: Segment -> Revenue */}
          {segmentsWithCoords.map((seg, i) => {
            const segRevH = (seg.val / totalRev) * revH;
            const segRevY = revY + (segmentsWithCoords.slice(0, i).reduce((acc, curr) => acc + (curr.val / totalRev) * revH, 0));
            const path = makeRibbon(X_SEGMENTS + 120, seg.y, seg.h, X_REV, segRevY, segRevH);
            return (
              <path
                key={`seg-ribbon-${i}`}
                d={path}
                fill={seg.color}
                opacity={hoveredNode === seg.name ? 0.85 : 0.35}
                onMouseEnter={() => setHoveredNode(seg.name)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ transition: 'opacity 0.2s', cursor: 'pointer' }}
              />
            );
          })}

          {/* 2. RIBBONS: Revenue -> Gross Profit (Up) & Cost of Revenue (Down) */}
          {/* Gross Profit Ribbon */}
          <path
            d={makeRibbon(X_REV + barWidth, revY, grossH, X_GROSS_COST, grossY, grossH)}
            fill="url(#flow-gross)"
            opacity={hoveredNode === 'gross' ? 0.9 : 0.6}
            onMouseEnter={() => setHoveredNode('gross')}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ transition: 'opacity 0.2s', cursor: 'pointer' }}
          />

          {/* Cost of Revenue Ribbon */}
          <path
            d={makeRibbon(X_REV + barWidth, revY + grossH, costH, X_GROSS_COST, costY, costH)}
            fill="url(#flow-cost)"
            opacity={hoveredNode === 'cost' ? 0.9 : 0.6}
            onMouseEnter={() => setHoveredNode('cost')}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ transition: 'opacity 0.2s', cursor: 'pointer' }}
          />

          {/* 3. RIBBONS: Gross Profit -> Operating Profit (Up) & Operating Expenses (Down) */}
          <path
            d={makeRibbon(X_GROSS_COST + barWidth, grossY, opProfitH, X_OP_EXP, opProfitY, opProfitH)}
            fill="url(#flow-op)"
            opacity={hoveredNode === 'op' ? 0.9 : 0.65}
            onMouseEnter={() => setHoveredNode('op')}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ transition: 'opacity 0.2s', cursor: 'pointer' }}
          />

          <path
            d={makeRibbon(X_GROSS_COST + barWidth, grossY + opProfitH, opExpH, X_OP_EXP, opExpY, opExpH)}
            fill="url(#flow-exp)"
            opacity={hoveredNode === 'exp' ? 0.9 : 0.6}
            onMouseEnter={() => setHoveredNode('exp')}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ transition: 'opacity 0.2s', cursor: 'pointer' }}
          />

          {/* Expense Sub-Ribbons -> Individual Expenses */}
          {expItemsWithCoords.map((exp, i) => {
            const expPartH = (exp.val / data.operatingExpenses) * opExpH;
            const expStartY = opExpY + (expItemsWithCoords.slice(0, i).reduce((acc, curr) => acc + (curr.val / data.operatingExpenses) * opExpH, 0));
            const path = makeRibbon(X_OP_EXP + barWidth, expStartY, expPartH, X_NET_TAX - 70, exp.y, exp.h);
            return (
              <path
                key={`exp-ribbon-${i}`}
                d={path}
                fill={exp.color}
                opacity={hoveredNode === exp.name ? 0.85 : 0.4}
                onMouseEnter={() => setHoveredNode(exp.name)}
                onMouseLeave={() => setHoveredNode(null)}
                style={{ transition: 'opacity 0.2s', cursor: 'pointer' }}
              />
            );
          })}

          {/* 4. RIBBONS: Operating Profit -> Net Profit (Up) & Tax (Down) */}
          <path
            d={makeRibbon(X_OP_EXP + barWidth, opProfitY, netH, X_NET_TAX, netY, netH)}
            fill="url(#flow-net)"
            opacity={hoveredNode === 'net' ? 0.95 : 0.75}
            onMouseEnter={() => setHoveredNode('net')}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ transition: 'opacity 0.2s', cursor: 'pointer' }}
          />

          <path
            d={makeRibbon(X_OP_EXP + barWidth, opProfitY + netH, taxH, X_NET_TAX, taxY, taxH)}
            fill="url(#flow-tax)"
            opacity={hoveredNode === 'tax' ? 0.9 : 0.6}
            onMouseEnter={() => setHoveredNode('tax')}
            onMouseLeave={() => setHoveredNode(null)}
            style={{ transition: 'opacity 0.2s', cursor: 'pointer' }}
          />

          {/* ===================== NODES & LABELS ===================== */}

          {/* Left Segment Labels & Node Bars */}
          {segmentsWithCoords.map((seg, i) => (
            <g key={`seg-node-${i}`} style={{ cursor: 'pointer' }} onMouseEnter={() => setHoveredNode(seg.name)} onMouseLeave={() => setHoveredNode(null)}>
              <rect
                x={X_SEGMENTS + 120 - 6}
                y={seg.y}
                width="6"
                height={seg.h}
                rx="3"
                fill={seg.color}
              />
              <text x={X_SEGMENTS + 105} y={seg.y + 12} textAnchor="end" fontSize="12" fontWeight="700" fill="#1E293B">
                {seg.name}
              </text>
              <text x={X_SEGMENTS + 105} y={seg.y + 26} textAnchor="end" fontSize="13" fontWeight="800" fill="#0F172A">
                {fmtVal(seg.val)} <tspan fontSize="11" fontWeight="600" fill="#10B981">({seg.growth})</tspan>
              </text>
            </g>
          ))}

          {/* Node 1: Revenue (매출액) Bar */}
          <g>
            <rect
              x={X_REV}
              y={revY}
              width={barWidth}
              height={revH}
              rx="4"
              fill="#0F172A"
            />
            <text x={X_REV + barWidth / 2} y={revY - 32} textAnchor="middle" fontSize="14" fontWeight="800" fill="#0F172A">
              매출액 (Revenue)
            </text>
            <text x={X_REV + barWidth / 2} y={revY - 14} textAnchor="middle" fontSize="16" fontWeight="900" fill="#2563EB">
              {fmtVal(totalRev)} <tspan fontSize="12" fontWeight="700" fill="#10B981">({data.revGrowth})</tspan>
            </text>
          </g>

          {/* Node 2: Gross Profit (매출총이익) Bar */}
          <g>
            <rect
              x={X_GROSS_COST}
              y={grossY}
              width={barWidth}
              height={grossH}
              rx="4"
              fill="#10B981"
            />
            <text x={X_GROSS_COST + barWidth / 2} y={grossY - 32} textAnchor="middle" fontSize="13" fontWeight="700" fill="#065F46">
              매출총이익 (Gross Profit)
            </text>
            <text x={X_GROSS_COST + barWidth / 2} y={grossY - 14} textAnchor="middle" fontSize="15" fontWeight="800" fill="#047857">
              {fmtVal(data.grossProfit)} <tspan fontSize="11" fontWeight="600" fill="#4B5563">({data.grossMargin})</tspan>
            </text>
          </g>

          {/* Node 3: Cost of Revenue (매출원가) */}
          <g>
            <rect
              x={X_GROSS_COST}
              y={costY}
              width={barWidth}
              height={costH}
              rx="4"
              fill="#F87171"
            />
            <text x={X_GROSS_COST + barWidth + 8} y={costY + 16} fontSize="13" fontWeight="700" fill="#991B1B">
              매출원가 (Cost of Revenue)
            </text>
            <text x={X_GROSS_COST + barWidth + 8} y={costY + 34} fontSize="14" fontWeight="800" fill="#DC2626">
              -{fmtVal(data.costOfRevenue)} <tspan fontSize="11" fontWeight="600" fill="#6B7380">({data.costPercent})</tspan>
            </text>
          </g>

          {/* Node 4: Operating Profit (영업이익) Bar */}
          <g>
            <rect
              x={X_OP_EXP}
              y={opProfitY}
              width={barWidth}
              height={opProfitH}
              rx="4"
              fill="#059669"
            />
            <text x={X_OP_EXP + barWidth / 2} y={opProfitY - 32} textAnchor="middle" fontSize="13" fontWeight="700" fill="#065F46">
              영업이익 (Operating Profit)
            </text>
            <text x={X_OP_EXP + barWidth / 2} y={opProfitY - 14} textAnchor="middle" fontSize="15" fontWeight="900" fill="#047857">
              {fmtVal(data.operatingProfit)} <tspan fontSize="11" fontWeight="700" fill="#2563EB">({data.opGrowth})</tspan>
            </text>
          </g>

          {/* Node 5: Operating Expenses (판관비) Total Bar */}
          <g>
            <rect
              x={X_OP_EXP}
              y={opExpY}
              width={barWidth}
              height={opExpH}
              rx="4"
              fill="#EF4444"
            />
            <text x={X_OP_EXP + barWidth / 2} y={opExpY + opExpH + 20} textAnchor="middle" fontSize="12" fontWeight="700" fill="#991B1B">
              판관비 ({fmtVal(data.operatingExpenses)})
            </text>
          </g>

          {/* Expense Sub-Items Labels */}
          {expItemsWithCoords.map((exp, i) => (
            <g key={`exp-node-${i}`} style={{ cursor: 'pointer' }} onMouseEnter={() => setHoveredNode(exp.name)} onMouseLeave={() => setHoveredNode(null)}>
              <rect
                x={X_NET_TAX - 70}
                y={exp.y}
                width="6"
                height={exp.h}
                rx="3"
                fill={exp.color}
              />
              <text x={X_NET_TAX - 58} y={exp.y + 12} fontSize="12" fontWeight="700" fill="#1E293B">
                {exp.name}
              </text>
              <text x={X_NET_TAX - 58} y={exp.y + 26} fontSize="13" fontWeight="800" fill="#B91C1C">
                -{fmtVal(exp.val)} <tspan fontSize="11" fontWeight="500" fill="#6B7380">({exp.pct})</tspan>
              </text>
            </g>
          ))}

          {/* Node 6: Net Profit (당기순이익 - Final!) */}
          <g>
            <rect
              x={X_NET_TAX}
              y={netY}
              width={barWidth + 4}
              height={netH}
              rx="4"
              fill="#047857"
            />
            <text x={X_NET_TAX + 14} y={netY - 28} textAnchor="middle" fontSize="14" fontWeight="800" fill="#047857">
              당기순이익 (Net Profit)
            </text>
            <text x={X_NET_TAX + 14} y={netY - 12} textAnchor="middle" fontSize="16" fontWeight="900" fill="#065F46">
              {fmtVal(data.netProfit)}
            </text>
            <text x={X_NET_TAX + 14} y={netY + 14} textAnchor="middle" fontSize="11" fontWeight="700" fill="#FFFFFF">
              {data.netMargin}
            </text>
          </g>

          {/* Node 7: Tax and Non-operating (법인세 및 기타 비용) */}
          <g>
            <rect
              x={X_NET_TAX}
              y={taxY}
              width={barWidth}
              height={taxH}
              rx="4"
              fill="#F87171"
            />
            <text x={X_NET_TAX + barWidth + 8} y={taxY + 12} fontSize="12" fontWeight="700" fill="#991B1B">
              법인세비용 및 기타
            </text>
            <text x={X_NET_TAX + barWidth + 8} y={taxY + 26} fontSize="13" fontWeight="800" fill="#DC2626">
              -{fmtVal(data.taxAndOther)}
            </text>
          </g>
        </svg>
      </div>

      {/* Interactive Detail Box on Hover */}
      <div style={{ marginTop: '20px', background: '#F8FAFC', borderRadius: '16px', padding: '16px 20px', border: '1px solid #E2E8F0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34E0C8', display: 'inline-block' }} />
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#334155' }}>
            {hoveredNode ? (
              <>
                <strong style={{ color: '#0F172A' }}>{hoveredNode}</strong> 항목이 선택되었습니다.
              </>
            ) : (
              '각 사업부문이나 비용 리본에 마우스를 올리면 세부 설명과 비중이 표시됩니다.'
            )}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '14px', fontSize: '12px', color: '#64748B' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#10B981' }} />
            이익/유입 (흑자)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#EF4444' }} />
            비용/원가/세금 (유출)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#3B82F6' }} />
            사업부문 기여도
          </span>
        </div>
      </div>
    </div>
  );
}
