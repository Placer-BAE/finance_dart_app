import React, { useState, useEffect } from 'react';
import listedCompanies from '../../data/listedCompanies.json';

export default function MainView({ onSelectCompany }) {
  const [q, setQ] = useState('');
  const [market, setMarket] = useState('kospi'); // 'kospi' or 'kosdaq'
  const [sort, setSort] = useState('recent'); // 'recent', 'popular', 'rank'
  const [liveMatches, setLiveMatches] = useState([]);
  const [isSearchingLive, setIsSearchingLive] = useState(false);

  // Instant 4,021 Listed Companies Search + Backend Live Sync
  useEffect(() => {
    const query = (q || '').trim().toLowerCase();
    if (query.length >= 2) {
      // 1. Instant local search in 4,021 Korean listed companies (runs in 0.001s, 100% works on Vercel)
      const localMatches = listedCompanies
        .filter(c => c.name.toLowerCase().includes(query) || c.code.includes(query))
        .slice(0, 15)
        .map(c => ({ corp_name: c.name, stock_code: c.code, corp_code: c.corp }));
      setLiveMatches(localMatches);

      // 2. Also query backend if available
      const timer = setTimeout(async () => {
        try {
          setIsSearchingLive(true);
          const res = await fetch(`/api/live/search?q=${encodeURIComponent(query)}`);
          if (res.ok) {
            const data = await res.json();
            if (data && data.companies && data.companies.length > 0) {
              setLiveMatches(data.companies);
            }
          }
        } catch (e) {
          // graceful fallback to local matches
        } finally {
          setIsSearchingLive(false);
        }
      }, 200);
      return () => clearTimeout(timer);
    } else {
      setLiveMatches([]);
    }
  }, [q]);

  const UP = '#FF6B7D', DOWN = '#6EA2FF', NA = '#93A6B8';
  const c = (rank, name, code, rev, revD, op, opD, mg, mgD, cause, causeKind, views, upd, badge) => ({
    rank, name, code, rev,
    revC: revD > 0 ? UP : revD < 0 ? DOWN : NA,
    op, opC: opD > 0 ? UP : opD < 0 ? DOWN : NA,
    mg, mgC: mgD > 0 ? UP : mgD < 0 ? DOWN : NA,
    cause, causeKind, views, upd, badge
  });

  const KOSPI = [
    c(1, '삼성전자', '005930', '+10.9%', 1, '+33.2%', 1, '+2.2%p', 1, 'HBM 등 고부가 메모리 판매 확대와 메모리 가격 상승', '매출', 48200, 1119, '내용 갱신'),
    c(2, 'SK하이닉스', '000660', '+46.8%', 1, '+101.2%', 1, '+13.1%p', 1, 'HBM 등 AI 메모리 고부가 제품 비중 확대', '매출', 39100, 1118, ''),
    c(3, 'SK스퀘어', '402340', '약 −12%', -1, '약 +126%', 1, '해석 주의', 0, 'SK하이닉스 지분법이익 증가', '영업이익', 9800, 1114, ''),
    c(4, 'LG에너지솔루션', '373220', '−7.6%', -1, '+133.9%', 1, '+3.4%p', 1, '고수익 제품 위주 판매와 북미 ESS 생산 본격화', '영업이익', 15400, 1117, '새 브리핑'),
    c(5, '삼성전기', '009150', '+9.9%', 1, '+24.3%', 1, '+0.9%p', 1, 'AI·서버용 MLCC와 FC-BGA 공급 확대', '매출', 12800, 1119, '새 브리핑'),
    c(6, '삼성바이오로직스', '207940', '+30.3%', 1, '+56.6%', 1, '+7.6%p', 1, '4공장 램프업과 1~3공장 풀가동', '매출', 8700, 1112, ''),
    c(7, '현대차', '005380', '+6.3%', 1, '−19.5%', -1, '−2.0%p', -1, '미국 관세 부과에 따른 비용 증가', '영업이익', 21300, 1116, ''),
    c(8, '셀트리온', '068270', '+17.0%', 1, '+137.5%', 1, '+14.3%p', 1, '고수익 신규 바이오시밀러 판매 확대', '매출', 11900, 1113, ''),
    c(9, '삼성물산', '028260', '−3.2%', -1, '+10.4%', 1, '+1.0%p', 1, '건설부문 대형 하이테크 프로젝트 준공', '매출', 6400, 1110, ''),
    c(10, '기아', '000270', '+6.2%', 1, '−28.3%', -1, '−3.8%p', -1, '미국 관세 영향과 판매 인센티브 증가', '영업이익', 17600, 1115, '내용 갱신')
  ];

  const KOSDAQ = [
    c(1, '알테오젠', '196170', '+110.0%', 1, '+320.9%', 1, '+24.8%p', 1, '키트루다SC 상업화에 따른 마일스톤 수령', '매출', 14300, 1119, '새 브리핑'),
    c(2, '에코프로', '086520', '+9.7%', 1, '흑자전환', 1, '전기 적자', 0, '인도네시아 제련소 투자 성과', '영업이익', 9900, 1117, ''),
    c(3, '에코프로비엠', '247540', '−8.4%', -1, '흑자전환', 1, '전기 적자', 0, '유럽 전기차용 양극재 판매 회복', '영업이익', 8800, 1116, ''),
    c(4, '레인보우로보틱스', '277810', '약 +73%', 1, '적자 지속', -1, '확인 중', 0, '협동로봇 판매 확대', '매출', 12100, 1118, '내용 갱신'),
    c(5, '주성엔지니어링', '036930', '−24.1%', -1, '−67.8%', -1, '−13.7%p', -1, '디스플레이 장비와 중화권 고객 매출 감소', '매출', 5600, 1114, ''),
    c(6, '심텍', '222800', '+21%', 1, '흑자전환', 1, '전기 적자', 0, 'GDDR7·SoCAMM용 고부가 기판 매출 확대', '매출', 4300, 1113, ''),
    c(7, '이오테크닉스', '039030', '+19.0%', 1, '+159%', 1, '+11.5%p', 1, '반도체 레이저 장비 신규 채택 확대', '매출', 3900, 1112, ''),
    c(8, '삼천당제약', '000250', '확인 중', 0, '확인 중', 0, '확인 중', 0, '', '', 7200, 1111, ''),
    c(9, 'HLB', '028300', '감소', -1, '적자확대', -1, '확인 중', 0, '연구개발비 증가', '영업이익', 10400, 1115, ''),
    c(10, '리노공업', '058470', '+33.9%', 1, '+42.5%', 1, '+2.9%p', 1, 'R&D용 테스트 소켓 출하 호조', '매출', 3600, 1110, '새 브리핑')
  ];

  const base = market === 'kospi' ? KOSPI : KOSDAQ;
  const trimmedQ = (q || '').trim();
  const filtered = trimmedQ
    ? base.filter((x) => x.name.indexOf(trimmedQ) >= 0 || x.code.indexOf(trimmedQ) >= 0)
    : base;

  const sorted = filtered.slice().sort((a, b) => {
    if (sort === 'recent') return b.upd - a.upd || a.rank - b.rank;
    if (sort === 'popular') return b.views - a.views;
    return a.rank - b.rank;
  });

  const fmtViews = (v) => (v >= 10000 ? (v / 10000).toFixed(1) + '만' : v.toLocaleString());

  const pill = (on) => ({
    border: on ? '1px solid #10161E' : '1px solid #D5DBE1',
    background: on ? '#10161E' : '#FFFFFF',
    color: on ? '#FFFFFF' : '#26303C'
  });

  return (
    <div>
      {/* Hero Section */}
      <section style={{ background: 'radial-gradient(120% 140% at 80% 0%, #17304A 0%, #0C1622 55%)', color: '#EAF1F7', position: 'relative', overflow: 'visible', zIndex: 50 }}>
        <svg width="100%" height="100%" viewBox="0 0 1440 360" preserveAspectRatio="none" aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.55, pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="hl" x1="0" x2="1">
              <stop offset="0" stopColor="#34E0C8" stopOpacity="0" />
              <stop offset="1" stopColor="#34E0C8" />
            </linearGradient>
            <filter id="gl">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>
          <path d="M0 290 C200 280 300 262 460 254 S760 220 900 200 S1200 120 1440 80" fill="none" stroke="url(#hl)" strokeWidth="3" filter="url(#gl)" />
          <path d="M0 290 C200 280 300 262 460 254 S760 220 900 200 S1200 120 1440 80" fill="none" stroke="url(#hl)" strokeWidth="2" />
        </svg>

        <div style={{ position: 'relative', maxWidth: '1240px', margin: '0 auto', padding: '56px 24px 48px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#34E0C8' }}>국내 상장사 실적 변화 브리핑</p>
          <h1 style={{ margin: 0, fontSize: '46px', lineHeight: 1.2, letterSpacing: '-0.03em', fontWeight: 700, maxWidth: '760px' }}>실적이 왜 달라졌을까?</h1>
          <p style={{ margin: 0, fontSize: '18px', lineHeight: 1.6, color: '#B9C8D6', maxWidth: '640px' }}>사업보고서 속 회사의 설명을 원문 그대로 찾아드립니다.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '560px', marginTop: '4px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label htmlFor="q" style={{ fontSize: '13px', color: '#B9C8D6', fontWeight: 500 }}>기업명 또는 종목코드</label>
              {isSearchingLive && (
                <span style={{ fontSize: '12px', color: '#34E0C8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: '#34E0C8', animation: 'pulse 1s infinite' }} />
                  검색 중...
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#FFFFFF', borderRadius: '14px', padding: '0 16px', minHeight: '56px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7380" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-4-4" />
              </svg>
              <input
                id="q"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="예: 카카오, 하이브, 삼성전자, 035720"
                style={{ flex: 1, border: 0, fontSize: '17px', fontFamily: 'inherit', color: '#10161E', background: 'transparent', minHeight: '52px', outline: 'none' }}
              />
              {q && (
                <button
                  type="button"
                  onClick={() => { setQ(''); setLiveMatches([]); }}
                  style={{ border: 0, background: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '4px', fontSize: '14px' }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Live Search Dropdown */}
            {liveMatches.length > 0 && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '8px',
                background: '#FFFFFF', borderRadius: '16px', boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
                border: '1px solid #E3E7EC', zIndex: 999, overflow: 'hidden'
              }}>
                <div style={{ padding: '12px 18px', background: '#0C1622', color: '#EAF1F7', fontSize: '13px', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#34E0C8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    상장사 검색 결과 ({liveMatches.length}건)
                  </span>
                </div>
                <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                  {liveMatches.map((comp) => (
                    <button
                      key={comp.corp_code}
                      type="button"
                      onClick={() => {
                        setQ('');
                        setLiveMatches([]);
                        onSelectCompany({
                          name: comp.corp_name,
                          code: comp.stock_code,
                          corp_code: comp.corp_code,
                          isLive: true
                        });
                      }}
                      style={{
                        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '12px 18px', border: 0, background: '#FFFFFF', borderBottom: '1px solid #F1F5F9',
                        cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#F0FAF8'}
                      onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '15px', fontWeight: 700, color: '#10161E' }}>{comp.corp_name}</span>
                        <span style={{ fontSize: '12px', color: '#64748B', background: '#F1F5F9', padding: '2px 8px', borderRadius: '6px' }}>
                          {comp.stock_code}
                        </span>
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0B7A70', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        실적 브리핑 보기 →
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <main style={{ maxWidth: '1240px', margin: '0 auto', padding: '32px 24px 56px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          {/* Market Group */}
          <div role="group" aria-label="시장" style={{ display: 'inline-flex', background: '#E6EAEE', borderRadius: '12px', padding: '4px' }}>
            <button
              type="button"
              className="btn"
              onClick={() => setMarket('kospi')}
              style={{
                minHeight: '40px', padding: '0 18px', border: 0, borderRadius: '9px',
                fontFamily: 'inherit', fontSize: '15px', fontWeight: 600,
                background: market === 'kospi' ? '#FFFFFF' : 'transparent', color: '#10161E',
                boxShadow: market === 'kospi' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              코스피 10
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => setMarket('kosdaq')}
              style={{
                minHeight: '40px', padding: '0 18px', border: 0, borderRadius: '9px',
                fontFamily: 'inherit', fontSize: '15px', fontWeight: 600,
                background: market === 'kosdaq' ? '#FFFFFF' : 'transparent', color: '#10161E',
                boxShadow: market === 'kosdaq' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              코스닥 10
            </button>
          </div>

          {/* Sort Group */}
          <div role="group" aria-label="정렬" style={{ display: 'inline-flex', gap: '6px' }}>
            {['recent', 'popular', 'rank'].map((st) => {
              const label = st === 'recent' ? '최근 업데이트순' : st === 'popular' ? '많이 본 순' : '시가총액순';
              const p = pill(sort === st);
              return (
                <button
                  key={st}
                  type="button"
                  className="btn"
                  onClick={() => setSort(st)}
                  style={{
                    minHeight: '40px', padding: '0 14px', borderRadius: '999px',
                    fontFamily: 'inherit', fontSize: '14px', fontWeight: 600,
                    border: p.border, background: p.background, color: p.color
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <p style={{ margin: 0, fontSize: '13px', color: '#4A5563', lineHeight: 1.6 }}>
          시가총액 상위 10곳(우선주·금융사 제외, 11월 19일 종가 기준) · 실적은 FY2025 사업보고서 연결 기준 · 대표 원인은 뉴스를 바탕으로 만든 예시 문장 · 조회수와 업데이트 시각은 화면 구성 예시
        </p>

        {sorted.length === 0 ? (
          liveMatches.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#10161E', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>전체 상장사 검색 결과</span>
                  <span style={{ fontSize: '13px', color: '#0B7A70', background: '#E3F5F2', padding: '3px 10px', borderRadius: '999px', fontWeight: 600 }}>
                    {liveMatches.length}개 발견
                  </span>
                </span>
                <span style={{ fontSize: '12px', color: '#64748B' }}>
                  사업보고서 공시 원문 분석
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '16px' }}>
                {liveMatches.map((comp) => (
                  <article
                    key={comp.corp_code}
                    className="card"
                    style={{
                      background: '#FFFFFF', border: '1px solid #E3E7EC', borderRadius: '20px', padding: '22px',
                      display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#10161E' }}>{comp.corp_name}</h2>
                        <span style={{ fontSize: '13px', color: '#64748B' }}>{comp.stock_code} · 상장사</span>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 8px', borderRadius: '6px', background: '#E3F5F2', color: '#075F57' }}>
                        사업보고서
                      </span>
                    </div>

                    <p style={{ margin: 0, fontSize: '13px', color: '#4A5563', lineHeight: 1.55 }}>
                      공시된 손익계산서 주요 계정(매출액, 영업이익) 및 실적 요인 브리핑이 제공됩니다.
                    </p>

                    <button
                      type="button"
                      className="btn"
                      onClick={() => onSelectCompany({
                        name: comp.corp_name,
                        code: comp.stock_code,
                        corp_code: comp.corp_code,
                        isLive: true
                      })}
                      style={{
                        minHeight: '44px', width: '100%', borderRadius: '12px', border: 0,
                        background: '#10161E', color: '#FFFFFF', fontFamily: 'inherit',
                        fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px'
                      }}
                    >
                      실적 브리핑 보기 →
                    </button>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ background: '#FFFFFF', border: '1px solid #E3E7EC', borderRadius: '18px', padding: '36px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
              <p style={{ margin: 0, fontSize: '17px', fontWeight: 600 }}>‘{q}’에 해당하는 기업을 찾을 수 없습니다</p>
              <p style={{ margin: 0, fontSize: '14px', color: '#4A5563' }}>정확한 상장사 사명 또는 6자리 종목코드를 입력해 주세요.</p>
              <button
                type="button"
                className="btn"
                onClick={() => setQ('')}
                style={{ marginTop: '8px', minHeight: '44px', padding: '0 18px', borderRadius: '12px', border: 0, background: '#10161E', color: '#FFFFFF', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600 }}
              >
                검색 지우기
              </button>
            </div>
          )
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '16px' }}>
            {sorted.map((c) => {
              const badgeBg = c.badge === '새 브리핑' ? '#E3F5F2' : '#EEF1F4';
              const badgeFg = c.badge === '새 브리핑' ? '#075F57' : '#26303C';
              return (
                <article
                  key={c.code}
                  className="card"
                  style={{ background: '#FFFFFF', border: '1px solid #E3E7EC', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ flex: 'none', minWidth: '30px', height: '30px', padding: '0 6px', borderRadius: '9px', background: '#0C1622', color: '#34E0C8', fontSize: '13px', fontWeight: 700, display: 'grid', placeItems: 'center' }}>
                        {c.rank}
                      </span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        <h3 style={{ margin: 0, fontSize: '18px', letterSpacing: '-0.02em', fontWeight: 700 }}>{c.name}</h3>
                        <p style={{ margin: 0, fontSize: '12px', color: '#6B7380' }}>
                          {c.code} · 조회 {fmtViews(c.views)}
                        </p>
                      </div>
                    </div>
                    {c.badge && (
                      <span style={{ fontSize: '12px', fontWeight: 600, padding: '4px 10px', borderRadius: '999px', background: badgeBg, color: badgeFg, whiteSpace: 'nowrap' }}>
                        {c.badge}
                      </span>
                    )}
                  </div>

                  <div style={{ background: '#0C1622', borderRadius: '14px', padding: '12px 14px', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '8px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <span style={{ fontSize: '12px', color: '#93A6B8' }}>매출액</span>
                      <span style={{ fontSize: '16px', fontWeight: 700, color: c.revC, fontVariantNumeric: 'tabular-nums' }}>{c.rev}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <span style={{ fontSize: '12px', color: '#93A6B8' }}>영업이익</span>
                      <span style={{ fontSize: '16px', fontWeight: 700, color: c.opC, fontVariantNumeric: 'tabular-nums' }}>{c.op}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <span style={{ fontSize: '12px', color: '#93A6B8' }}>영업이익률</span>
                      <span style={{ fontSize: '16px', fontWeight: 700, color: c.mgC, fontVariantNumeric: 'tabular-nums' }}>{c.mg}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#4A5563' }}>
                      {c.cause ? `대표 원인 · ${c.causeKind} (예시 문장)` : '대표 원인'}
                    </span>
                    <span style={{ fontSize: '14px', lineHeight: 1.5, color: '#10161E' }}>
                      {c.cause || '검토한 공시 범위에서 직접 원인을 확인하지 못했습니다'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginTop: 'auto' }}>
                    <span style={{ fontSize: '12px', color: '#6B7380' }}>
                      갱신 {Math.floor(c.upd / 100)}.{String(c.upd % 100).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      className="fy"
                      onClick={() => onSelectCompany(c)}
                      aria-label={`${c.name} FY2025 브리핑 열기`}
                      style={{ border: 0, cursor: 'pointer' }}
                    >
                      FY2025 브리핑
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <footer style={{ borderTop: '1px solid #E3E7EC', background: '#FFFFFF' }}>
        <p style={{ maxWidth: '1240px', margin: '0 auto', padding: '20px 24px', fontSize: '13px', color: '#4A5563', lineHeight: 1.6 }}>
          투자 판단을 위한 권유가 아닙니다. 수치는 공개된 실적 발표 기준으로 정리했으며, 실제 서비스에서는 OpenDART 원천 데이터로 대체합니다. ‘약’ 표시는 근사치입니다.
        </p>
      </footer>
    </div>
  );
}
