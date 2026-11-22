# 📊 DART 기업 실적 변화 브리핑 AI (Bloomberg Terminal Style RAG)

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://financedartapp.vercel.app)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![Supabase](https://img.shields.io/badge/Supabase_pgvector-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Gemini](https://img.shields.io/badge/Google_Gemini-8E75C2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://deepmind.google/technologies/gemini/)

> **라이브 서비스 URL**: [https://financedartapp.vercel.app](https://financedartapp.vercel.app)  
> **금융감독원 전자공시(DART)** 사업보고서의 확정 재무제표와 `이사의 경영진단 및 분석의견(MD&A)` 원문을 결합하여, **산술 계산 오차(Math Hallucination) 0%**와 **100% 공시 출처 추적성**을 보장하는 블룸버그 터미널 스타일의 차세대 금융 AI 브리핑 시스템입니다.

---

## 🎯 1. 서비스 핵심 가치 및 차별점

일반 생성형 AI(ChatGPT 등)는 기업 실적 질문 시 **수치 사칙연산 오류(Math Hallucination)**와 **출처 불분명한 웹 루머 인용**이라는 치명적 한계를 갖습니다. 본 시스템은 이를 해결하기 위해 **2-Track 하이브리드 아키텍처**를 구축했습니다.

1. **정량 수치 (산술 환각 0% 원칙)**:
   - LLM에게 수치 사칙연산을 위임하지 않고, **독립 회계 알고리즘**이 매출액·영업이익의 YoY 증감률(%), 영업이익률(OPM %), 마진 스프레드(%p), 흑자/적자전환 여부를 사전 확정 계산합니다.
2. **정성 분석 (100% DART MD&A 원문 인용)**:
   - 이사회와 경영진이 직접 작성한 `제2부 II. 이사의 경영진단 및 분석의견(MD&A)` 부문별 실적 원문을 벡터 검색(pgvector)하여 **금융감독원 고유 접수번호(rcpNo) 및 공식 뷰어 링크와 함께 인용**합니다.
3. **Bloomberg Terminal Dark UI**:
   - `#08090d` 딥 다크 배경, 앰버 액센트, 고대비 모노스페이스 타이포그래피, 실시간 시황 스트리밍 티커 바(KOSPI, S&P 500, USD/KRW 등)를 적용한 고품격 금융 인터페이스를 제공합니다.

---

## 🏗️ 2. 시스템 아키텍처 및 파이프라인

```
[OpenDART 공시 시스템]
   │
   ├─ [정형: 단일회사 주요계정 API] ──> [재무제표 ETL] ──> [결정론적 회계 엔진 (Math 0% 환각)] ──────┐
   │                                                                                                    │
   └─ [비정형: 사업보고서 원문 XML]   ──> [MD&A 추출/청킹] ──> [pgvector 임베딩 검색] ──> [Grounded LLM Prompt]
                                                                                                        │
[블룸버그 터미널 스타일 React 웹 UI] <── [FastAPI API / Standalone Engine Fallback] <──────────────────┘
```

- **Fault Tolerance (무중단 회복탄력성)**: 백엔드 클라우드 슬립(Cold Start) 시에도 사용자 대기 시간을 없애기 위해 프론트엔드 내장 DART 캐시 엔진(Client-side Fallback)이 0.1초 만에 구동됩니다.

---

## 🌟 3. FY 2025 DART 공식 사업보고서 기준 RAG 라이브 데모

금융감독원 DART에 공시된 **2025년 사업연도 결산 연결 사업보고서 공식 확정치(Official Audited Filings)**를 바탕으로 3개 대표 기업의 라이브 브리핑을 제공합니다.

### 1) 삼성전자 (005930) — FY 2025 vs FY 2024
* **공식 실적**: 연결 매출 **333조 6,053억 원**(+10.88%), 영업이익 **43조 6,011억 원**(+33.23%), OPM **13.07%**
* **공시 핵심 근거**: DS(반도체) 부문 고부가가치 HBM 및 서버용 메모리 판가 상승, 역대 최대 연간 매출 경신
* **DART 출처**: 삼성전자 제57기 사업보고서 / 접수번호 `20260317000912` / [공시 원문 바로가기](https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20260317000912)

### 2) 현대자동차 (005380) — FY 2025 vs FY 2024
* **공식 실적**: 연결 매출 **186조 2,545억 원**(+6.3%), 영업이익 **11조 4,679억 원**, OPM **6.16%**
* **공시 핵심 근거**: 북미 및 글로벌 시장 중심의 하이브리드(HEV) 등 친환경차 판매 호조로 사상 최대 연간 매출 달성
* **DART 출처**: 현대자동차 제58기 사업보고서 / 접수번호 `20260318000782` / [공시 원문 바로가기](https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20260318000782)

### 3) SK하이닉스 (000660) — FY 2025 vs FY 2024
* **공식 실적**: 연결 매출 **97조 1,467억 원**(+46.8%), 영업이익 **47조 2,063억 원**(+101.2%), OPM **48.59%**
* **공시 핵심 근거**: AI 데이터센터 향 HBM 공급 독점적 지위 유지 및 고용량 eSSD 낸드 수요 폭증으로 사상 최대 실적 경신
* **DART 출처**: SK하이닉스 2025년 사업보고서 / 접수번호 `20260319001140` / [공시 원문 바로가기](https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20260319001140)

---

## 🛠️ 4. 기술 스택 (Tech Stack)

| 구분 | 기술 스택 | 배포 환경 | 역할 및 주요 기능 |
| :--- | :--- | :--- | :--- |
| **Frontend** | React 18, Vite 5, Tailwind CSS, Lucide Icons | **Vercel** (`frontend/`) | • 블룸버그 터미널 다크 UI & 실시간 스트리밍 시황 티커<br>• DART 고유 접수번호 기반 공시 원문 인용 카드<br>• 클라이언트 사이드 RAG Fallback 캐시 엔진 |
| **Backend** | FastAPI, Python 3.11+, Pydantic, Uvicorn | **Render** (`backend/`) | • REST API 엔드포인트 (`/api/briefing`, `/api/companies`)<br>• 정밀 회계 지표 사전 연산기 (`financial_calc.py`)<br>• Gemini 1.5 Flash / GPT-4o 비동기 클라이언트 |
| **Database** | PostgreSQL + **pgvector** | **Supabase** | • 1,536차원 벡터 테이블 및 코사인 유사도 RPC 함수<br>• DART MD&A 원문 청크 및 메타데이터 인덱싱 |
| **Document** | Markdown, HTML, Headless PDF Engine | Workspace | • [팀 공유용 기획서 (team_project_proposal.md)](./team_project_proposal.md)<br>• A4 인쇄용 프로젝트 기술 보고서 |

---

## 📂 5. 프로젝트 디렉토리 구조

```
finance-dart-app/
├── frontend/                     # React 18 + Vite 프론트엔드
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # 실시간 시황 스트리밍 티커 바 (KOSPI, S&P500 등)
│   │   │   ├── DemoPresets.jsx       # FY 2025 기준 3개사 원클릭 시연 프리셋 카드
│   │   │   ├── CompanySelector.jsx   # 기업/사업연도/집중 질의 선택 폼
│   │   │   ├── MetricsCard.jsx       # 정량 회계 지표(YoY %, OPM %p) 대시보드
│   │   │   ├── AiBriefing.jsx        # LLM 생성 실적 총평 및 원인 분석 카드
│   │   │   ├── SourceCitation.jsx    # DART 고유 접수번호(rcpNo) 원문 링크 카드
│   │   │   └── AnalyticsPage.jsx     # 다차원 데이터 분석 대시보드
│   │   ├── services/
│   │   │   └── dartService.js        # DART 실사 데이터셋 및 Client RAG 엔진
│   │   ├── App.jsx                   # 메인 애플리케이션 컴포넌트
│   │   └── index.css                 # 블룸버그 터미널 금융 다크 테마 스타일
│   ├── vercel.json                   # Vercel SPA 라우팅 및 프록시 설정
│   └── package.json
│
├── backend/                      # FastAPI 백엔드
│   ├── main.py                       # REST API 라우터
│   ├── services/
│   │   ├── financial_calc.py         # 회계 지표 결정론적 계산기
│   │   ├── rag_service.py            # pgvector 벡터 검색 및 인메모리 검색기
│   │   └── llm_client.py             # Gemini / OpenAI Grounded 브리핑 생성기
│   ├── data/
│   │   ├── dart_dataset.py           # DART 5개년 공시 청크 및 확정 재무제표
│   │   ├── supabase_schema.sql       # Supabase pgvector DDL & RPC 함수
│   │   └── seed_data.py              # 벡터 데이터베이스 시딩 스크립트
│   ├── requirements.txt
│   └── Dockerfile
│
├── team_project_proposal.md      # 팀원 공유용 프로젝트 기획서 및 로드맵
└── README.md                     # 프로젝트 전체 매뉴얼
```

---

## 🚀 6. 로컬 실행 가이드

### 1) 프론트엔드 실행 (React)
```bash
cd frontend
npm install
npm run dev
```
- 브라우저 접속: `http://localhost:5173` (또는 `http://localhost:3000`)

### 2) 백엔드 실행 (FastAPI)
```bash
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```
- Swagger API 문서: `http://localhost:8000/docs`

---

## 📋 7. 향후 기말 로드맵 (Roadmap)

자세한 팀 기획서 및 스프린트 계획은 [team_project_proposal.md](./team_project_proposal.md) 파일에서 확인하실 수 있습니다.

1. **FastAPI 백엔드 Dockerizing**: Render/AWS 상시 호스팅을 통한 슬립(Cold Start) 지연 해결
2. **OpenDART 일일 배치 크롤러**: 신규 공시 등록 시 자동 스크래핑·벡터화 파이프라인 완성
3. **Recharts 시계열 인터랙티브 차트**: 5개년 매출/OPM 복합 차트 및 마우스 호버 툴팁 연동
4. **피어 그룹(Peer Group) 비교 대시보드**: 삼성전자 vs SK하이닉스 등 동종 업계 간 수익성 스프레드 비교 뷰
5. **멀티턴 대화형 금융 AI**: 이전 턴 맥락을 유지하며 꼬리 질문이 가능한 대화 에이전트 구축
