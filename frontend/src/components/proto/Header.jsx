import React from 'react';

export default function Header({ activeTab, setActiveTab }) {
  return (
    <header style={{ background: '#FFFFFF', borderBottom: '1px solid #E3E7EC' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '14px 24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <button
          onClick={() => setActiveTab('main')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: '#10161E', background: 'none', border: '0', cursor: 'pointer', padding: 0 }}
        >
          <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
            <rect width="28" height="28" rx="8" fill="#0C1622" />
            <path d="M7 18l4-5 4 3 6-8" fill="none" stroke="#34E0C8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.02em' }}>실적브리핑</span>
        </button>

        <nav aria-label="주요 메뉴" style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', fontSize: '15px' }}>
          <button
            className="navlink"
            onClick={() => setActiveTab('main')}
            style={activeTab === 'main' || activeTab === 'briefing' ? { color: '#10161E', background: '#EEF1F4', border: '0', cursor: 'pointer', fontFamily: 'inherit' } : { border: '0', cursor: 'pointer', fontFamily: 'inherit', background: 'transparent' }}
          >
            브리핑
          </button>
          <button
            className="navlink"
            onClick={() => setActiveTab('timeline')}
            style={activeTab === 'timeline' ? { color: '#10161E', background: '#EEF1F4', border: '0', cursor: 'pointer', fontFamily: 'inherit' } : { border: '0', cursor: 'pointer', fontFamily: 'inherit', background: 'transparent' }}
          >
            설명 연대기
          </button>
          <button
            className="navlink"
            onClick={() => setActiveTab('analysis')}
            style={activeTab === 'analysis' ? { color: '#10161E', background: '#EEF1F4', border: '0', cursor: 'pointer', fontFamily: 'inherit' } : { border: '0', cursor: 'pointer', fontFamily: 'inherit', background: 'transparent' }}
          >
            분석
          </button>
          <button
            className="navlink"
            onClick={() => {
              setActiveTab('analysis');
              setTimeout(() => {
                const el = document.getElementById('sources');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            style={{ border: '0', cursor: 'pointer', fontFamily: 'inherit', background: 'transparent' }}
          >
            출처·처리 기준
          </button>
        </nav>
      </div>
    </header>
  );
}
