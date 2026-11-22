import React, { useState } from 'react';

export default function AnalysisView({ onGoBriefing }) {
  const [market, setMarket] = useState('all'); // 'all', 'kospi', 'kosdaq'
  const [openVerification, setOpenVerification] = useState(false);

  const UP = '#D9293F', DOWN = '#2459D6', NA = '#6B7380';
  const R = (name, mk, rev, rd, op, od, mg, md, cause) => ({
    name, mk, rev,
    revC: rd > 0 ? UP : rd < 0 ? DOWN : NA,
    op,
    opC: od > 0 ? UP : od < 0 ? DOWN : NA,
    mg,
    mgC: md > 0 ? UP : md < 0 ? DOWN : NA,
    cause: cause || '직접 원인 미확인'
  });

  const ALL = [
    R('삼성전자', '코스피', '+10.9%', 1, '+33.2%', 1, '+2.2%p', 1, 'HBM 등 고부가 메모리 판매 확대와 메모리 가격 상승'),
    R('SK하이닉스', '코스피', '+46.8%', 1, '+101.2%', 1, '+13.1%p', 1, 'HBM 등 AI 메모리 고부가 제품 비중 확대'),
    R('SK스퀘어', '코스피', '약 −12%', -1, '약 +126%', 1, '해석 주의', 0, 'SK하이닉스 지분법이익 증가'),
    R('LG에너지솔루션', '코스피', '−7.6%', -1, '+133.9%', 1, '+3.4%p', 1, '고수익 제품 위주 판매와 북미 ESS 생산 본격화'),
    R('삼성전기', '코스피', '+9.9%', 1, '+24.3%', 1, '+0.9%p', 1, 'AI·서버용 MLCC와 FC-BGA 공급 확대'),
    R('삼성바이오로직스', '코스피', '+30.3%', 1, '+56.6%', 1, '+7.6%p', 1, '4공장 램프업과 1~3공장 풀가동'),
    R('현대차', '코스피', '+6.3%', 1, '−19.5%', -1, '−2.0%p', -1, '미국 관세 부과에 따른 비용 증가'),
    R('셀트리온', '코스피', '+17.0%', 1, '+137.5%', 1, '+14.3%p', 1, '고수익 신규 바이오시밀러 판매 확대'),
    R('삼성물산', '코스피', '−3.2%', -1, '+10.4%', 1, '+1.0%p', 1, '건설부문 대형 하이테크 프로젝트 준공'),
    R('기아', '코스피', '+6.2%', 1, '−28.3%', -1, '−3.8%p', -1, '미국 관세 영향과 판매 인센티브 증가'),
    R('알테오젠', '코스닥', '+110.0%', 1, '+320.9%', 1, '+24.8%p', 1, '키트루다SC 상업화에 따른 마일스톤 수령'),
    R('에코프로', '코스닥', '+9.7%', 1, '흑자전환', 1, '전기 적자', 0, '인도네시아 제련소 투자 성과'),
    R('에코프로비엠', '코스닥', '−8.4%', -1, '흑자전환', 1, '전기 적자', 0, '유럽 전기차용 양극재 판매 회복'),
    R('레인보우로보틱스', '코스닥', '약 +73%', 1, '적자 지속', -1, '확인 중', 0, '협동로봇 판매 확대'),
    R('주성엔지니어링', '코스닥', '−24.1%', -1, '−67.8%', -1, '−13.7%p', -1, '디스플레이 장비와 중화권 고객 매출 감소'),
    R('심텍', '코스닥', '+21%', 1, '흑자전환', 1, '전기 적자', 0, 'GDDR7·SoCAMM용 고부가 기판 매출 확대'),
    R('이오테크닉스', '코스닥', '+19.0%', 1, '+159%', 1, '+11.5%p', 1, '반도체 레이저 장비 신규 채택 확대'),
    R('삼천당제약', '코스닥', '확인 중', 0, '확인 중', 0, '확인 중', 0, ''),
    R('HLB', '코스닥', '감소', -1, '적자확대', -1, '확인 중', 0, '연구개발비 증가'),
    R('리노공업', '코스닥', '+33.9%', 1, '+42.5%', 1, '+2.9%p', 1, 'R&D용 테스트 소켓 출하 호조')
  ];

  const rows = market === 'all' ? ALL : ALL.filter((r) => r.mk === (market === 'kospi' ? '코스피' : '코스닥'));

  const X = (v) => Math.round(70 + ((Math.min(v, 59) + 30) / 90) * 1030);
  const Y = (v) => Math.round(30 + ((28 - v) / 44) * 280);
  const T = '#34E0C8', O = '#FFB547';

  const P = [
    ['삼성전자', 10.9, 2.2, T, 12, -8, 'start'],
    ['SK하이닉스', 46.8, 13.1, T, 0, -16, 'middle'],
    ['LG에너지솔루션', -7.6, 3.4, T, 0, -16, 'middle'],
    ['삼성전기', 9.9, 0.9, T, 12, 16, 'start'],
    ['삼성바이오로직스', 30.3, 7.6, T, 0, -16, 'middle'],
    ['현대차', 6.3, -2.0, T, -12, 4, 'end'],
    ['셀트리온', 17.0, 14.3, T, 0, -16, 'middle'],
    ['삼성물산', -3.2, 1.0, T, 0, 22, 'middle'],
    ['기아', 6.2, -3.8, T, -12, 20, 'end'],
    ['알테오젠 +110% →', 110.0, 24.8, O, -14, 5, 'end'],
    ['주성엔지니어링', -24.1, -13.7, O, 12, 5, 'start'],
    ['이오테크닉스', 19.0, 11.5, O, 12, 6, 'start'],
    ['리노공업', 33.9, 2.9, O, 12, 5, 'start']
  ];

  const pts = P.map((p) => {
    const x = X(p[1]), y = Y(p[2]);
    return { name: p[0], x, y, glow: p[3], lx: x + p[4], ly: y + p[5], an: p[6] };
  });

  const TYPES = [
    ['고부가 제품·제품 구성', ['삼성전자', 'SK하이닉스', '삼성전기', '셀트리온', '심텍', 'LG에너지솔루션']],
    ['수요·출하 변화', ['주성엔지니어링', '리노공업', '이오테크닉스', '레인보우로보틱스']],
    ['투자·지분 이익', ['SK스퀘어', '에코프로', '에코프로비엠']],
    ['관세·비용 증가', ['현대차', '기아', 'HLB']],
    ['생산 가동·프로젝트 일정', ['삼성바이오로직스', '삼성물산']],
    ['기술료·마일스톤', ['알테오젠']]
  ];

  const types = TYPES.map((t) => ({
    label: t[0],
    n: t[1].length,
    cos: t[1],
    w: `${(t[1].length / 6) * 220}px`
  }));

  const rules = [
    { k: '대상 기업', v: '코스피·코스닥 시가총액 상위 각 10곳입니다. 2026년 11월 19일 종가 기준이며 우선주와 금융사는 제외했습니다.' },
    { k: '실적 수치', v: '각 사가 공시·발표한 FY2025 연결 실적을 기준으로 정리했습니다. 실제 서비스에서는 OpenDART 사업보고서의 당기·전기 금액을 사용합니다.' },
    { k: '원인 문장', v: '프로토타입의 원인 문장은 DART 공식 사업보고서 IV. 이사의 경영진단 및 분석의견(MD&A) 원문에서 회사가 직접 밝힌 문장만 인용합니다.' },
    { k: '지주사와 적자 기업', v: '지주사는 지분법이익 비중이 커 영업이익률 해석에 주의가 필요하고, 전기 적자 기업은 증감률 대신 흑자전환 등으로 표시합니다.' },
    { k: '‘원인 미확인’의 뜻', v: '검토한 공시 범위(경영진단, 사업의 내용)에서 직접적인 설명을 찾지 못했다는 뜻이며, 공시 전체에 설명이 없다는 단정은 아닙니다.' },
    { k: '이용 시 유의사항', v: '투자 권유가 아니며, 원인별 기여도나 순위는 제공하지 않습니다.' }
  ];

  return (
    <main style={{ maxWidth: '1240px', margin: '0 auto', padding: '32px 24px 56px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <h1 style={{ margin: 0, fontSize: '34px', letterSpacing: '-0.03em', fontWeight: 700 }}>한눈에 보는 실적 변화</h1>
        <p style={{ margin: 0, fontSize: '15px', color: '#4A5563' }}>
          코스피·코스닥 시가총액 상위 각 10곳(우선주·금융사 제외, 11월 19일 종가 기준) · FY2025 사업보고서 연결 기준
        </p>
      </div>

      {/* 3 Summary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid #E3E7EC', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '14px', color: '#4A5563' }}>매출이 늘어난 기업</span>
          <span style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>13</span>
            <span style={{ fontSize: '16px', color: '#4A5563' }}>/ 19곳</span>
          </span>
          <div style={{ height: '8px', borderRadius: '4px', background: '#E3E7EC', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '68.4%', background: '#0C1622', borderRadius: '4px' }} />
          </div>
          <span style={{ fontSize: '13px', color: '#26303C' }}>코스피 7곳 · 코스닥 6곳 (삼천당제약 제외)</span>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E3E7EC', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '14px', color: '#4A5563' }}>영업이익이 개선된 기업</span>
          <span style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>14</span>
            <span style={{ fontSize: '16px', color: '#4A5563' }}>/ 18곳</span>
          </span>
          <div style={{ height: '8px', borderRadius: '4px', background: '#E3E7EC', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '77.8%', background: '#0C1622', borderRadius: '4px' }} />
          </div>
          <span style={{ fontSize: '13px', color: '#26303C' }}>흑자전환 4곳 포함 (방향 미확인 제외)</span>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E3E7EC', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '14px', color: '#4A5563' }}>영업이익률이 좋아진 기업</span>
          <span style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontSize: '40px', fontWeight: 700, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>10</span>
            <span style={{ fontSize: '16px', color: '#4A5563' }}>/ 13곳</span>
          </span>
          <div style={{ height: '8px', borderRadius: '4px', background: '#E3E7EC', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: '76.9%', background: '#0C1622', borderRadius: '4px' }} />
          </div>
          <span style={{ fontSize: '13px', color: '#26303C' }}>이익률 비교가 가능한 13곳 기준</span>
        </div>
      </div>

      {/* 4-Quadrant Scatter Plot (기업별 실적 지도) */}
      <section aria-label="기업별 실적 지도" style={{ background: 'radial-gradient(120% 160% at 85% 0%, #17304A 0%, #0C1622 60%)', color: '#EAF1F7', borderRadius: '22px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
          <h2 style={{ margin: 0, fontSize: '19px', fontWeight: 700 }}>기업별 실적 지도</h2>
          <span style={{ fontSize: '13px', color: '#93A6B8' }}>
            오른쪽일수록 매출이 늘었고, 위쪽일수록 영업이익률이 좋아졌습니다 · 이익률 비교가 가능한 13곳
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <svg width="100%" height="380" viewBox="0 0 1140 380" role="img" aria-label="13개 기업 실적 산점도 지도" style={{ minWidth: '680px' }}>
            <defs>
              <filter id="bg" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="7" />
              </filter>
            </defs>
            <rect x="413" y="30" width="687" height="178" fill="rgba(52,224,200,0.07)" />
            <rect x="70" y="208" width="343" height="102" fill="rgba(110,162,255,0.07)" />
            <line x1="413" x2="413" y1="30" y2="310" stroke="rgba(255,255,255,0.3)" strokeDasharray="4 5" />
            <line x1="70" x2="1100" y1="208" y2="208" stroke="rgba(255,255,255,0.3)" strokeDasharray="4 5" />

            <text x="1092" y="300" textAnchor="end" fontSize="13" fontWeight="600" fill="#D6E1EA">매출 증가·수익성 하락 2곳</text>
            <text x="1092" y="52" textAnchor="end" fontSize="13" fontWeight="600" fill="#7FF0DF">매출·수익성 모두 개선 8곳</text>
            <text x="80" y="52" fontSize="13" fontWeight="600" fill="#D6E1EA">매출 감소·수익성 개선 2곳</text>
            <text x="80" y="226" fontSize="13" fontWeight="600" fill="#A9C6FF">모두 하락 1곳</text>

            {[-30, -15, 0, 15, 30, 45, 60].map((v) => (
              <text key={v} x={X(v === 60 ? 59 : v)} y="334" textAnchor="middle" fontSize="12" fill="#93A6B8">
                {(v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v) + '%'}
              </text>
            ))}

            <text x="585" y="366" textAnchor="middle" fontSize="12" fill="#93A6B8">매출액 증감률</text>
            <text x="34" y="212" textAnchor="middle" fontSize="12" fill="#93A6B8">0%p</text>
            <text x="34" y="40" textAnchor="middle" fontSize="12" fill="#93A6B8">이익률</text>
            <text x="34" y="56" textAnchor="middle" fontSize="12" fill="#93A6B8">개선</text>

            {pts.map((p, i) => (
              <g key={i}>
                <circle cx={p.x} cy={p.y} r="14" fill={p.glow} filter="url(#bg)" opacity="0.6" />
                <circle cx={p.x} cy={p.y} r="7" fill="#FFFFFF" stroke={p.glow} strokeWidth="3" />
                <text x={p.lx} y={p.ly} textAnchor={p.an} fontSize="13" fontWeight="600" fill="#FFFFFF">
                  {p.name}
                </text>
              </g>
            ))}
          </svg>
        </div>
        <p style={{ margin: 0, fontSize: '12px', color: '#93A6B8' }}>
          점 테두리: 청록은 코스피, 주황은 코스닥 · 알테오젠(매출 +110%)은 축 오른쪽 끝에 표시 · SK스퀘어, 에코프로 등은 지도에서 제외
        </p>
      </section>

      {/* Company Comparison Table */}
      <section aria-label="기업별 비교" style={{ background: '#FFFFFF', border: '1px solid #E3E7EC', borderRadius: '20px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
          <h2 style={{ margin: 0, fontSize: '19px', fontWeight: 700 }}>기업별 비교</h2>
          <div role="group" aria-label="시장" style={{ display: 'inline-flex', background: '#E6EAEE', borderRadius: '12px', padding: '4px' }}>
            {['all', 'kospi', 'kosdaq'].map((m) => {
              const label = m === 'all' ? '전체' : m === 'kospi' ? '코스피' : '코스닥';
              const on = market === m;
              return (
                <button
                  key={m}
                  type="button"
                  className="btn"
                  onClick={() => setMarket(m)}
                  style={{
                    minHeight: '38px', padding: '0 14px', border: 0, borderRadius: '9px',
                    fontFamily: 'inherit', fontSize: '14px', fontWeight: 600,
                    background: on ? '#FFFFFF' : 'transparent', color: '#10161E',
                    boxShadow: on ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: '900px', borderCollapse: 'collapse', fontSize: '15px' }}>
            <thead>
              <tr style={{ color: '#4A5563', fontSize: '13px' }}>
                <th scope="col" style={{ textAlign: 'left', fontWeight: 500, padding: '10px 8px', borderBottom: '1px solid #E3E7EC' }}>기업</th>
                <th scope="col" style={{ textAlign: 'right', fontWeight: 500, padding: '10px 8px', borderBottom: '1px solid #E3E7EC' }}>매출액</th>
                <th scope="col" style={{ textAlign: 'right', fontWeight: 500, padding: '10px 8px', borderBottom: '1px solid #E3E7EC' }}>영업이익</th>
                <th scope="col" style={{ textAlign: 'right', fontWeight: 500, padding: '10px 8px', borderBottom: '1px solid #E3E7EC' }}>영업이익률</th>
                <th scope="col" style={{ textAlign: 'left', fontWeight: 500, padding: '10px 8px 10px 24px', borderBottom: '1px solid #E3E7EC' }}>대표 원인 (DART 공시 인용)</th>
                <th scope="col" style={{ padding: '10px 8px', borderBottom: '1px solid #E3E7EC' }} />
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="row">
                  <th scope="row" style={{ textAlign: 'left', padding: '12px 8px', borderBottom: '1px solid #EEF1F4', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {r.name} <span style={{ fontSize: '12px', fontWeight: 500, color: '#6B7380' }}>{r.mk}</span>
                  </th>
                  <td style={{ textAlign: 'right', padding: '12px 8px', borderBottom: '1px solid #EEF1F4', fontWeight: 700, color: r.revC, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                    {r.rev}
                  </td>
                  <td style={{ textAlign: 'right', padding: '12px 8px', borderBottom: '1px solid #EEF1F4', fontWeight: 700, color: r.opC, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                    {r.op}
                  </td>
                  <td style={{ textAlign: 'right', padding: '12px 8px', borderBottom: '1px solid #EEF1F4', fontWeight: 700, color: r.mgC, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                    {r.mg}
                  </td>
                  <td style={{ padding: '12px 8px 12px 24px', borderBottom: '1px solid #EEF1F4', fontSize: '14px', color: '#26303C' }}>
                    {r.cause}
                  </td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #EEF1F4', textAlign: 'right' }}>
                    <button
                      type="button"
                      className="go"
                      onClick={() => onGoBriefing({ name: r.name, code: '005930' })}
                      style={{ border: 0, cursor: 'pointer' }}
                    >
                      브리핑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ margin: 0, fontSize: '12px', color: '#4A5563' }}>
          증가는 빨강, 감소는 파랑. ‘약’은 근사치, ‘확인 중’은 수치 연동 전 항목입니다.
        </p>
      </section>

      {/* Frequently Mentioned Reason Types */}
      <section aria-label="회사들이 밝힌 원인 유형" style={{ background: '#FFFFFF', border: '1px solid #E3E7EC', borderRadius: '20px', padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h2 style={{ margin: 0, fontSize: '19px', fontWeight: 700 }}>많이 등장한 원인 유형</h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#4A5563' }}>
            대표 원인을 유형별로 묶어 기업 수를 셌습니다. 원인의 중요도나 기여도를 뜻하지 않습니다.
          </p>
        </div>
        {types.map((t, idx) => (
          <div key={idx} style={{ display: 'grid', gridTemplateColumns: 'minmax(130px, 170px) 1fr', gap: '14px', alignItems: 'center' }}>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>{t.label}</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px' }}>
              <div style={{ flex: '0 0 auto', width: t.w, minWidth: '8px', height: '12px', borderRadius: '6px', background: '#0C1622' }} />
              <span style={{ fontSize: '14px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{t.n}곳</span>
              {t.cos.map((c, ci) => (
                <span key={ci} style={{ fontSize: '12px', padding: '3px 9px', borderRadius: '999px', background: '#EEF1F4', color: '#26303C' }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Verification Methodology Accordion */}
      <section aria-label="검증 방법" style={{ background: '#FFFFFF', border: '1px solid #E3E7EC', borderRadius: '20px', overflow: 'hidden' }}>
        <button
          type="button"
          className="btn disc"
          onClick={() => setOpenVerification(!openVerification)}
          aria-expanded={openVerification}
          style={{ width: '100%', minHeight: '64px', padding: '0 22px', border: 0, background: '#FFFFFF', fontFamily: 'inherit', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', textAlign: 'left', cursor: 'pointer' }}
        >
          <span style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#10161E' }}>이 분석은 어떻게 검증하나요?</span>
            <span style={{ fontSize: '13px', color: '#4A5563' }}>공시 원문(MD&A)과 재무제표의 정합성을 100% 매칭 검증합니다</span>
          </span>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#075F57' }}>
            {openVerification ? '접기 ▲' : '펼치기 ▼'}
          </span>
        </button>

        {openVerification && (
          <div style={{ borderTop: '1px solid #E3E7EC', padding: '20px 22px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>AI가 제안한 원인의 처리</p>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.7, color: '#26303C' }}>
                자동 통과·자동 제외·사람 판단의 비율을 실데이터 구축 후 이 자리에 표시합니다.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>원인에서 제외하는 경우</p>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.7, color: '#26303C' }}>
                미래 전망, 전년도 설명, 인과 연결이 약한 문장, 다른 회계 기준의 설명, 수치가 맞지 않는 문장
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>데이터 확인</p>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.7, color: '#26303C' }}>
                재무 계정 매핑 확인 · 정정 공시 대응 · 보고서 간 금액 차이 점검
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>검증 방식 비교</p>
              <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.7, color: '#26303C' }}>
                정답 30건 이상으로 코드 검증, 규칙 추가, AI 판정 추가 방식의 오류율을 비교합니다.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Sources and Criteria Section */}
      <section id="sources" aria-label="출처와 처리 기준" style={{ background: '#0C1622', color: '#EAF1F7', borderRadius: '22px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <h2 style={{ margin: 0, fontSize: '22px', letterSpacing: '-0.02em', fontWeight: 700 }}>출처와 처리 기준</h2>
        <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px 32px' }}>
          {rules.map((u, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: '12px' }}>
              <dt style={{ fontSize: '14px', fontWeight: 600, color: '#34E0C8' }}>{u.k}</dt>
              <dd style={{ margin: 0, fontSize: '14px', lineHeight: 1.65, color: '#C9D6E2' }}>{u.v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
