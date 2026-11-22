import React, { useState } from 'react';

export default function TimelineView({ onGoBriefing }) {
  const [focus, setFocus] = useState('mem');

  const UP = '#D9293F', DOWN = '#2459D6';
  const YEARS = [
    { year: 2021, rev: 279.6, revChg: 18.1, margin: 18.5, mChg: 3.3 },
    { year: 2022, rev: 302.2, revChg: 8.1, margin: 14.4, mChg: -4.1 },
    { year: 2023, rev: 258.9, revChg: -14.3, margin: 2.5, mChg: -11.9 },
    { year: 2024, rev: 300.9, revChg: 16.2, margin: 10.9, mChg: 8.4 },
    { year: 2025, rev: 333.6, revChg: 10.9, margin: 13.1, mChg: 2.2 }
  ];

  const TH = {
    mem: {
      name: '메모리 가격',
      lv: [3, 2, 3, 3, 3],
      text: '메모리 가격은 5년 모두 실적 변화의 이유로 등장했습니다. 2023년에는 가격 하락이 이익 급감의 원인으로, 2024·2025년에는 가격 상승이 회복의 원인으로 쓰였습니다.'
    },
    ai: {
      name: '서버·AI 수요',
      lv: [2, 0, 1, 3, 3],
      text: '2021년 서버 수요 증가로 처음 등장했고, 2023년에는 ‘HBM 수요 확대가 예상된다’는 전망으로만 언급되어 원인으로 채택하지 않았습니다. 2024·2025년에는 실제 매출 증가의 원인으로 등장했습니다.'
    },
    inv: {
      name: '재고',
      lv: [0, 3, 3, 2, 0],
      text: '2022년 고객사 재고 조정에 따른 수요 둔화, 2023년 재고평가손실, 2024년 재고 정상화로 3년 연속 이어진 뒤 2025년에는 언급되지 않았습니다.'
    },
    fx: {
      name: '환율',
      lv: [0, 2, 0, 2, 3],
      text: '환율은 2022년과 2024년에 보통 수준으로 언급되다가, 2025년에는 ‘약 1조 6천억원 수준의 긍정적 효과’처럼 규모와 함께 구체적으로 설명되었습니다.'
    },
    phone: {
      name: '스마트폰 신제품',
      lv: [2, 2, 2, 3, 3],
      text: '매년 갤럭시 신제품 판매가 언급되었고, 2024년부터는 AI 기능 탑재 모델처럼 제품 특성이 구체적으로 설명되었습니다.'
    }
  };

  const ITEMS = {
    2025: [
      ['mem', 3, '메모리 가격 상승과 HBM 판매 확대', 'HBM 등 고부가 메모리 판매 확대와 메모리 가격 상승에 따라 당기 매출액이 증가하였습니다.'],
      ['ai', 3, 'AI 서버 수요 강세', 'AI 서버 수요 확대에 따른 메모리 수요 강세가 매출 증가로 이어졌습니다.'],
      ['fx', 3, '환율 상승의 긍정적 효과', '주요 통화의 환율 상승으로 부품 사업을 중심으로 약 1조 6천억원 수준의 긍정적 효과가 발생하였습니다.'],
      ['phone', 3, '갤럭시 S25 판매 호조', 'MX 부문은 갤럭시 S25와 폴더블 신모델 판매 호조로 매출이 증가하였습니다.']
    ],
    2024: [
      ['ai', 3, 'HBM·서버용 고부가 메모리 판매 확대', 'HBM과 서버용 고용량 제품 판매 확대로 메모리 매출이 크게 증가하였습니다.'],
      ['mem', 3, '메모리 가격 회복', '메모리 가격 회복에 따라 반도체 부문의 수익성이 개선되었습니다.'],
      ['inv', 2, '재고 수준 정상화', '재고 수준이 정상화되며 실적 회복에 기여하였습니다.'],
      ['phone', 3, 'AI 기능 탑재 갤럭시 S24 판매 호조', 'AI 기능을 탑재한 갤럭시 S24 시리즈 판매 호조로 MX 부문 매출이 증가하였습니다.']
    ],
    2023: [
      ['mem', 3, '메모리 가격 급락', '메모리 가격 하락으로 반도체 부문 영업이익이 크게 감소하였습니다.'],
      ['inv', 3, '재고평가손실 반영', '재고평가손실 반영으로 반도체 부문의 손실이 확대되었습니다.'],
      ['ai', 1, 'AI 서버용 HBM 수요 확대 기대', '향후 AI 서버용 HBM 수요 확대가 예상됩니다.'],
      ['phone', 2, '갤럭시 S23 판매', '갤럭시 S23 판매로 MX 부문 실적이 견조하였습니다.']
    ],
    2022: [
      ['inv', 3, '고객사 재고 조정에 따른 수요 둔화', '하반기 고객사 재고 조정에 따른 수요 둔화로 메모리 출하가 감소하였습니다.'],
      ['mem', 2, '하반기 메모리 가격 하락', '하반기 메모리 가격 하락으로 수익성이 둔화되었습니다.'],
      ['fx', 2, '원화 약세 효과', '원화 약세가 실적에 긍정적으로 작용하였습니다.'],
      ['phone', 2, '갤럭시 S22 출시', '갤럭시 S22 출시로 MX 부문 매출이 증가하였습니다.']
    ],
    2021: [
      ['mem', 3, '메모리 가격 상승과 서버 수요 증가', '메모리 가격 상승과 서버 수요 증가로 반도체 부문 매출이 증가하였습니다.'],
      ['ai', 2, '데이터센터 투자 확대', '데이터센터 투자 확대에 따른 서버 수요 증가가 실적에 기여하였습니다.'],
      ['phone', 2, '폴더블 신제품 판매 확대', '폴더블 신제품 판매 확대로 MX 부문 매출이 늘었습니다.']
    ]
  };

  const theme = TH[focus];
  const X = (i) => 170 + i * 200;
  const BASE = 228;

  const cols = YEARS.map((y, i) => {
    const rh = Math.round((150 * y.rev) / 333.6);
    const my = Math.round(BASE - y.margin * 8.5);
    const on = theme.lv[i] > 0;
    return {
      year: 'FY' + y.year,
      cx: X(i),
      bx: X(i) - 90,
      rx: X(i) - 36,
      ry: BASE - rh,
      rh: rh,
      ty: BASE - rh - 8 > my + 24 || BASE - rh - 8 < my - 24 ? BASE - rh - 8 : BASE - rh + 20,
      rev: y.rev.toFixed(1),
      my: my,
      mly: my - 14,
      margin: y.margin.toFixed(1) + '%',
      tint: on ? 'rgba(52,224,200,0.10)' : 'transparent',
      yc: on ? '#34E0C8' : '#93A6B8'
    };
  });

  const line = cols.map((c, i) => (i ? 'L' : 'M') + c.cx + ' ' + c.my).join(' ');
  const sign = (v, u) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v).toFixed(1) + u;

  const insights = [
    { k: 'mem', kind: '반복된 이유', kc: '#075F57', title: '메모리 가격 · 5년 모두', text: '하락은 2023년 이익 급감의 원인으로, 상승은 2024·2025년 회복의 원인으로 등장했습니다.' },
    { k: 'inv', kind: '말이 바뀐 이유', kc: '#2A4CB0', title: '재고', text: '2022년 ‘고객사 재고 조정’, 2023년 ‘재고평가손실’, 2024년 ‘재고 정상화’로 설명이 바뀌었습니다.' },
    { k: 'ai', kind: '기대와 결과', kc: '#8A4B05', title: '서버·AI 수요(HBM)', text: '2023년에는 전망으로만 언급되었고, 2024·2025년에는 실제 매출 증가의 원인으로 등장했습니다.' }
  ];

  const cell = (v) =>
    v === 3 ? { bg: '#0B7A70', bd: '0', label: '구체적' }
    : v === 2 ? { bg: 'transparent', bd: '2px solid #0B7A70', label: '보통' }
    : v === 1 ? { bg: '#C27413', bd: '0', label: '전망' }
    : { bg: 'transparent', bd: '1px dashed #C9D0D8', label: '' };

  const lvl = (v) =>
    v === 3 ? { level: '구체적', lvBg: '#E3F5F2', lvFg: '#075F57' }
    : v === 2 ? { level: '보통', lvBg: '#EEF1F4', lvFg: '#26303C' }
    : { level: '전망 · 원인 아님', lvBg: '#FBEBD4', lvFg: '#8A4B05' };

  const details = YEARS.slice().reverse().map((y) => {
    const items = ITEMS[y.year].map((it) => ({
      theme: TH[it[0]].name,
      title: it[2],
      quote: it[3],
      bg: it[0] === focus ? '#F0FAF8' : '#F6F7F9',
      ...lvl(it[1])
    }));
    const has = ITEMS[y.year].some((it) => it[0] === focus);
    return {
      year: y.year,
      rev: y.rev.toFixed(1) + '조',
      revChg: sign(y.revChg, '%'),
      revC: y.revChg >= 0 ? UP : DOWN,
      margin: y.margin.toFixed(1) + '%',
      mChg: sign(y.mChg, '%p'),
      mC: y.mChg >= 0 ? UP : DOWN,
      items: items,
      border: has ? '1.5px solid #9ED9D0' : '1px solid #E3E7EC'
    };
  });

  return (
    <main style={{ maxWidth: '1240px', margin: '0 auto', padding: '28px 24px 56px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button
            onClick={onGoBriefing}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#4A5563', background: 'none', border: 0, fontSize: '14px', minHeight: '32px', width: 'fit-content', cursor: 'pointer', padding: 0 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            FY2025 브리핑으로 가기
          </button>
          <h1 style={{ margin: 0, fontSize: '34px', letterSpacing: '-0.03em', fontWeight: 700 }}>삼성전자 설명 연대기</h1>
          <p style={{ margin: 0, fontSize: '15px', color: '#4A5563' }}>
            FY2021–FY2025 사업보고서에서 회사가 매년 든 실적 변화 이유를 나란히 놓았습니다. 주제를 고르면 그 이유가 등장한 해가 강조됩니다.
          </p>
        </div>
        <span style={{ fontSize: '12px', fontWeight: 600, padding: '6px 12px', borderRadius: '999px', background: '#FBF1E3', color: '#8A4B05' }}>
          실적 수치: DART 5개년 연결 확정치
        </span>
      </div>

      {/* 5-Year Dual-Axis Chart */}
      <section aria-label="5개년 실적 추이" style={{ background: 'radial-gradient(120% 160% at 85% 0%, #17304A 0%, #0C1622 60%)', color: '#EAF1F7', borderRadius: '22px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
          <h2 style={{ margin: 0, fontSize: '19px', fontWeight: 700 }}>
            매출액과 영업이익률, 그리고 <span style={{ color: '#34E0C8' }}>{theme.name}</span>이 등장한 해
          </h2>
          <span style={{ display: 'flex', gap: '14px', fontSize: '12px', color: '#93A6B8' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(255,255,255,0.28)' }} />
              매출액(조원)
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '16px', height: '3px', borderRadius: '2px', background: '#34E0C8' }} />
              영업이익률
            </span>
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <svg width="100%" height="280" viewBox="0 0 1140 280" role="img" aria-label="삼성전자 5개년 실적 차트" style={{ minWidth: '640px' }}>
            <defs>
              <filter id="lg" x="-20%" y="-50%" width="140%" height="200%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
              <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.38" />
                <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.12" />
              </linearGradient>
            </defs>

            {cols.map((c, i) => (
              <g key={i}>
                <rect x={c.bx} y="24" width="180" height="214" rx="14" fill={c.tint} />
                <rect x={c.rx} y={c.ry} width="72" height={c.rh} rx="8" fill="url(#bar)" />
                <text x={c.cx} y={c.ty} textAnchor="middle" fontSize="13" fill="#D6E1EA">
                  {c.rev}
                </text>
                <text x={c.cx} y="262" textAnchor="middle" fontSize="14" fontWeight="600" fill={c.yc}>
                  {c.year}
                </text>
              </g>
            ))}

            <path d={line} fill="none" stroke="#34E0C8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" filter="url(#lg)" opacity="0.7" />
            <path d={line} fill="none" stroke="#34E0C8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

            {cols.map((c, i) => (
              <g key={i}>
                <circle cx={c.cx} cy={c.my} r="6" fill="#0C1622" stroke="#34E0C8" strokeWidth="3" />
                <text x={c.cx} y={c.mly} textAnchor="middle" fontSize="13" fontWeight="700" fill="#7FF0DF">
                  {c.margin}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </section>

      {/* 3 Insight Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
        {insights.map((i) => {
          const on = i.k === focus;
          return (
            <button
              key={i.k}
              type="button"
              className="btn ins"
              onClick={() => setFocus(i.k)}
              style={{
                textAlign: 'left', fontFamily: 'inherit', color: '#10161E', background: '#FFFFFF',
                border: on ? '1.5px solid #34C3AF' : '1px solid #E3E7EC',
                boxShadow: on ? '0 0 0 3px rgba(52,224,200,0.15)' : 'none',
                borderRadius: '20px', padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'pointer'
              }}
            >
              <span style={{ fontSize: '12px', fontWeight: 700, color: i.kc }}>{i.kind}</span>
              <span style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em' }}>{i.title}</span>
              <span style={{ fontSize: '14px', lineHeight: 1.6, color: '#26303C' }}>{i.text}</span>
            </button>
          );
        })}
      </div>

      {/* Track by Themes Matrix */}
      <section aria-label="주제로 추적하기" style={{ background: '#FFFFFF', border: '1px solid #E3E7EC', borderRadius: '20px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <h2 style={{ margin: 0, fontSize: '19px', fontWeight: 700 }}>주제로 추적하기</h2>
          <div role="group" aria-label="주제" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {Object.keys(TH).map((k) => {
              const on = k === focus;
              return (
                <button
                  key={k}
                  type="button"
                  className="btn"
                  onClick={() => setFocus(k)}
                  style={{
                    minHeight: '40px', padding: '0 14px', borderRadius: '999px',
                    fontFamily: 'inherit', fontSize: '14px', fontWeight: 600,
                    border: on ? '1px solid #10161E' : '1px solid #D5DBE1',
                    background: on ? '#10161E' : '#FFFFFF',
                    color: on ? '#FFFFFF' : '#26303C'
                  }}
                >
                  {TH[k].name}
                </button>
              );
            })}
          </div>
        </div>

        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, background: '#F0FAF8', borderRadius: '12px', padding: '12px 14px' }}>
          {theme.text}
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: '640px', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr>
                <th scope="col" style={{ textAlign: 'left', fontWeight: 500, color: '#4A5563', padding: '10px 8px', borderBottom: '1px solid #E3E7EC' }}>주제</th>
                {['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'].map((y) => (
                  <th key={y} scope="col" style={{ fontWeight: 600, padding: '10px 8px', borderBottom: '1px solid #E3E7EC', textAlign: 'center' }}>{y}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(TH).map((k) => {
                const item = TH[k];
                const on = k === focus;
                return (
                  <tr key={k} style={{ background: on ? '#F0FAF8' : 'transparent' }}>
                    <th scope="row" style={{ textAlign: 'left', fontWeight: 600, padding: '12px 8px', borderBottom: '1px solid #EEF1F4' }}>
                      {item.name}
                    </th>
                    {item.lv.map((v, ci) => {
                      const c = cell(v);
                      return (
                        <td key={ci} style={{ textAlign: 'center', padding: '12px 8px', borderBottom: '1px solid #EEF1F4' }}>
                          <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <span style={{ display: 'inline-block', width: '16px', height: '16px', borderRadius: '50%', background: c.bg, border: c.bd, boxSizing: 'border-box' }} />
                            <span style={{ fontSize: '11px', color: '#4A5563' }}>{c.label}</span>
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '12px', color: '#4A5563' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#0B7A70' }} />
            구체적 원인
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', border: '2px solid #0B7A70', boxSizing: 'border-box' }} />
            보통
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#C27413' }} />
            전망으로만 언급(원인 아님)
          </span>
          <span>빈칸 = 언급 없음</span>
        </div>
      </section>

      {/* Yearly Details Section */}
      <section aria-label="연도별 상세" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h2 style={{ margin: 0, fontSize: '19px', fontWeight: 700 }}>
          연도별 상세 <span style={{ fontWeight: 500, color: '#6B7380', fontSize: '14px' }}>최신순</span>
        </h2>
        {details.map((d) => (
          <article key={d.year} style={{ background: '#FFFFFF', border: d.border, borderRadius: '20px', padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '22px', letterSpacing: '-0.02em', fontWeight: 700 }}>FY{d.year}</h3>
                <span style={{ fontSize: '14px', color: '#4A5563' }}>
                  매출 <b style={{ color: '#10161E', fontVariantNumeric: 'tabular-nums' }}>{d.rev}</b> <b style={{ color: d.revC, fontVariantNumeric: 'tabular-nums' }}>{d.revChg}</b>
                </span>
                <span style={{ fontSize: '14px', color: '#4A5563' }}>
                  영업이익률 <b style={{ color: '#10161E', fontVariantNumeric: 'tabular-nums' }}>{d.margin}</b> <b style={{ color: d.mC, fontVariantNumeric: 'tabular-nums' }}>{d.mChg}</b>
                </span>
              </div>
              <button
                type="button"
                onClick={onGoBriefing}
                style={{ display: 'inline-flex', alignItems: 'center', minHeight: '40px', padding: '0 14px', borderRadius: '10px', background: '#10161E', color: '#FFFFFF', border: 0, fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}
              >
                이 해 브리핑 보기
              </button>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {d.items.map((x, idx) => (
                <li key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px', padding: '12px 14px', borderRadius: '14px', background: x.bg }}>
                  <span style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, padding: '3px 9px', borderRadius: '999px', background: '#0C1622', color: '#34E0C8' }}>
                      {x.theme}
                    </span>
                    <span style={{ fontSize: '12px', fontWeight: 600, padding: '3px 9px', borderRadius: '999px', background: x.lvBg, color: x.lvFg }}>
                      {x.level}
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: 600 }}>{x.title}</span>
                  </span>
                  <span style={{ fontSize: '14px', lineHeight: 1.6, color: '#26303C' }}>“{x.quote}”</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <p style={{ margin: 0, fontSize: '12px', color: '#4A5563', lineHeight: 1.6 }}>
        데이터: 연도별 실적은 각 연도 연결 실적 발표 기준 · DART 사업보고서 ‘IV. 이사의 경영진단 및 분석의견’ 원문 인용 기준
      </p>
    </main>
  );
}
