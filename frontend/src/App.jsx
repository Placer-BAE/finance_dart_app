import React, { useState, useEffect } from 'react';
import Header from './components/proto/Header';
import MainView from './components/proto/MainView';
import BriefingView from './components/proto/BriefingView';
import TimelineView from './components/proto/TimelineView';
import AnalysisView from './components/proto/AnalysisView';

export default function App() {
  const [activeTab, setActiveTab] = useState('main'); // 'main', 'briefing', 'timeline', 'analysis'
  const [selectedCompany, setSelectedCompany] = useState({
    name: '삼성전자',
    code: '005930',
    rank: 1,
    views: 48200
  });

  // Handle hash changes if user uses browser back/forward or direct URLs
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'timeline' || hash === 'Timeline') setActiveTab('timeline');
      else if (hash === 'analysis' || hash === 'Analysis') setActiveTab('analysis');
      else if (hash === 'briefing' || hash === 'Briefing') setActiveTab('briefing');
      else if (hash === 'main' || hash === 'Main' || !hash) setActiveTab('main');
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectCompany = (comp) => {
    setSelectedCompany(comp);
    setActiveTab('briefing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoBriefing = () => {
    setActiveTab('briefing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoTimeline = () => {
    setActiveTab('timeline');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', fontFamily: "'IBM Plex Sans KR', 'Pretendard', sans-serif", color: '#10161E', background: '#F6F7F9' }}>
      {/* Top Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Screen Views */}
      {activeTab === 'main' && (
        <MainView onSelectCompany={handleSelectCompany} />
      )}

      {activeTab === 'briefing' && (
        <BriefingView
          key={selectedCompany ? (selectedCompany.code || selectedCompany.name) : 'default'}
          company={selectedCompany}
          onBack={() => setActiveTab('main')}
          onGoTimeline={handleGoTimeline}
        />
      )}

      {activeTab === 'timeline' && (
        <TimelineView onGoBriefing={handleGoBriefing} />
      )}

      {activeTab === 'analysis' && (
        <AnalysisView onGoBriefing={handleSelectCompany} />
      )}
    </div>
  );
}
