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
  const [activeTab, setActiveTab] = useState('briefing'); // Default to live financial briefing terminal
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
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'briefing' && (
          <>
            {/* Top Featured Research Cases (Bloomberg Curated Style) */}
            <DemoPresets
              demoCases={demoCases}
              onSelectCase={handleSelectDemoCase}
              selectedCaseId={selectedCaseId}
              isLoading={isLoading}
            />

            {/* Bloomberg Query & Security Selector Bar */}
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

            {/* Financial Performance KPI Metrics */}
            <MetricsCard
              metrics={metrics}
              companyName={currentCompanyName}
              year={selectedYear}
            />

            {/* Bloomberg Intelligence Equity Research Note */}
            <AiBriefing
              briefing={briefing}
              isLoading={isLoading}
              error={error}
              onRetry={handleManualSubmit}
            />

            {/* Regulatory Audit Trail: DART Citations */}
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

      {/* Bloomberg Terminal Style Footer */}
      <footer className="bg-[#0c0d13] border-t border-[#1c1f2e] py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-300">DART TERMINAL INTELLIGENCE</span>
            <span className="text-slate-600">|</span>
            <span>FINANCIAL SUPERVISORY SERVICE DATA POWERED</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>ENTERPRISE RAG ARCHITECTURE</span>
            <span className="text-emerald-400 font-semibold">ALL SYSTEMS NOMINAL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
