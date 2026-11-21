import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DemoPresets from './components/DemoPresets';
import CompanySelector from './components/CompanySelector';
import MetricsCard from './components/MetricsCard';
import AiBriefing from './components/AiBriefing';
import SourceCitation from './components/SourceCitation';
import AnalyticsPage from './components/AnalyticsPage';
import ArchitectureView from './components/ArchitectureView';

export default function App() {
  const [activeTab, setActiveTab] = useState('briefing');
  const [companies, setCompanies] = useState([]);
  const [demoCases, setDemoCases] = useState([]);
  const [selectedCorpCode, setSelectedCorpCode] = useState('00126380'); // 삼성전자
  const [selectedYear, setSelectedYear] = useState(2023);
  const [customQuestion, setCustomQuestion] = useState('');
  
  const [metrics, setMetrics] = useState(null);
  const [briefing, setBriefing] = useState(null);
  const [sources, setSources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCaseId, setSelectedCaseId] = useState('demo-samsung-2023');

  // Load companies & demo presets
  useEffect(() => {
    // 1. Fetch companies
    fetch('/api/companies')
      .then(res => res.json())
      .then(data => setCompanies(data))
      .catch(err => console.error("Error fetching companies:", err));

    // 2. Fetch demo cases
    fetch('/api/demo-cases')
      .then(res => res.json())
      .then(data => {
        setDemoCases(data);
        // Initial auto-load first demo case (삼성전자 2023)
        executeBriefing('00126380', 2023, '', 'demo-samsung-2023');
      })
      .catch(err => console.error("Error fetching demo cases:", err));
  }, []);

  const executeBriefing = async (corpCode, year, question = '', caseId = null) => {
    setIsLoading(true);
    setError(null);
    setSelectedCaseId(caseId);

    try {
      const response = await fetch('/api/briefing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          corp_code: corpCode,
          year: year,
          custom_question: question || null,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || '실적 브리핑 생성에 실패했습니다.');
      }

      const data = await response.json();
      setBriefing(data);
      setMetrics(data.metrics);
      setSources(data.sources);
    } catch (err) {
      console.error(err);
      setError(err.message || '네트워크 오류가 발생했습니다. 백엔드 서버를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSubmit = () => {
    executeBriefing(selectedCorpCode, selectedYear, customQuestion, null);
  };

  const handleSelectDemoCase = (demoCase) => {
    setSelectedCorpCode(demoCase.corp_code);
    setSelectedYear(demoCase.year);
    setCustomQuestion('');
    executeBriefing(demoCase.corp_code, demoCase.year, '', demoCase.id);
  };

  const currentCompanyName = companies.find(c => c.corp_code === selectedCorpCode)?.corp_name || '삼성전자';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'briefing' && (
          <>
            {/* Top Demo Case Presets (Required for RAG Live Demo) */}
            <DemoPresets
              demoCases={demoCases}
              onSelectCase={handleSelectDemoCase}
              selectedCaseId={selectedCaseId}
              isLoading={isLoading}
            />

            {/* Input Form */}
            <CompanySelector
              companies={companies}
              selectedCorpCode={selectedCorpCode}
              setSelectedCorpCode={setSelectedCorpCode}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              customQuestion={customQuestion}
              setCustomQuestion={setCustomQuestion}
              onSubmit={handleManualSubmit}
              isLoading={isLoading}
            />

            {/* Calculated Metrics Card (YoY Changes) */}
            <MetricsCard
              metrics={metrics}
              companyName={currentCompanyName}
              year={selectedYear}
            />

            {/* AI Generated Briefing */}
            <AiBriefing
              briefing={briefing}
              isLoading={isLoading}
              error={error}
              onRetry={handleManualSubmit}
            />

            {/* Source Citations with DART Links */}
            <SourceCitation sources={sources} />
          </>
        )}

        {activeTab === 'analytics' && (
          <AnalyticsPage />
        )}

        {activeTab === 'architecture' && (
          <ArchitectureView />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>8주차 프로젝트: DART 기업 실적 변화 브리핑 AI (React + FastAPI + Supabase pgvector)</span>
          <span className="font-mono">Vercel & Render Deployment Ready</span>
        </div>
      </footer>
    </div>
  );
}
