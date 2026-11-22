# [팀 공유용 프로젝트 기획서] DART 공시 기반 기업 실적 브리핑 AI 서비스
**부제: 정량 회계 지표와 정성적 MD&A 원문 인용 기반의 차세대 금융 애널리스트 AI 플랫폼**

---

## 1. 프로젝트 비전 및 배경 (Vision & Core Value)

### ① 개발 배경 및 문제의식
- **일반 생성형 AI의 한계 (Hallucination)**: ChatGPT나 일반 LLM에게 "삼성전자 작년 실적 어땠어?"라고 물어보면 매출 증감률이나 영업이익률을 잘못 계산하거나, 존재하지 않는 기사 내용을 인용하는 심각한 환각(Hallucination)이 발생합니다.
- **금융 데이터의 요구 조건**: 투자 및 기업 분석에서는 **단 0.1%의 수치 오차도 용납되지 않으며**, 모든 정성적 진단은 금융감독원 전자공시(DART)라는 **공식 출처가 명확히 입증**되어야 합니다.

### ② 우리의 핵심 솔루션 (2-Track Hybrid Architecture)
- **정량 수치 (Math Hallucination 0%)**: LLM에게 계산을 맡기지 않고, **독립된 금융 회계 알고리즘**이 매출·영업이익 YoY 증감율과 영업이익률(OPM) 스프레드(%p)를 사전 확정 계산합니다.
- **정성 분석 (100% DART MD&A 원문 인용)**: 이사회와 경영진이 직접 공시한 `이사의 경영진단 및 분석의견(MD&A)` 원문을 벡터 검색(pgvector)하여 **고유 접수번호(rcpNo)와 함께 인용**합니다.
- **블룸버그 터미널 스타일 UI**: 월스트리트 전문 트레이더들이 사용하는 Bloomberg Terminal 감성의 다크 테마 금융 인터페이스로 완성도 높은 사용자 경험을 제공합니다.

---

## 2. 현재까지 구현 완료된 내용 (Phase 1 마일스톤 달성 현황)

| 영역 | 구현 완료 항목 | 상세 내용 |
| :--- | :--- | :--- |
| **프론트엔드 (Web)** | • **Vercel 프로덕션 배포**<br>• **Bloomberg Terminal Dark UI**<br>• **실시간 스트리밍 시황 티커**<br>• **3개사 RAG 데모 카드** | • [financedartapp.vercel.app](https://financedartapp.vercel.app)에 실시간 배포 완료<br>• `#08090d` 딥 다크 배경, 앰버 액센트, 고대비 모노스페이스 타이포그래피 적용<br>• 코스피(4,869.96), S&P 500(6,910.39), 미 국채 10년물(4.94%) 실시간 틱 플래시 렌더링<br>• 2025년 DART 확정 공시 기준 삼성전자(333.6조), 현대차(186.3조), SK하이닉스(97.1조) 브리핑 연동 |
| **백엔드 (API)** | • **FastAPI REST API 설계**<br>• **결정론적 계산 엔진**<br>• **Client-side RAG Fallback** | • `/api/companies`, `/api/metrics`, `/api/briefing`, `/api/demo-cases` 엔드포인트<br>• 매출 증감률, OPM, 흑자/적자전환 판별 알고리즘 구현 (`financial_calc.py`)<br>• 백엔드 슬립/네트워크 장애 시에도 0.1초 만에 브라우저 내장 DART 캐시 엔진으로 구동되는 탄력적 아키텍처 |
| **데이터 & RAG** | • **5개년(2021~2025) 실사 데이터셋**<br>• **Supabase pgvector 스키마**<br>• **공식 접수번호(rcpNo) 링크 매핑** | • 삼성전자, 현대차, SK하이닉스 등 주요 기업 실제 감사보고서 K-IFRS 재무 수치 완비<br>• `text-embedding-3-small` 기반 1,536차원 벡터 테이블 및 코사인 유사도 RPC 함수 설계<br>• 브리핑 출처 클릭 시 실제 DART 공식 공시 페이지(`rcpNo=...`)로 즉시 이동 |

---

## 3. 데이터 수집 및 파이프라인 (Data Pipeline Architecture)

```
[OpenDART 공시 시스템]
   │
   ├─ [정형: 단일회사 주요계정 API] ──> [재무제표 ETL] ──> [결정론적 회계 알고리즘 (Math 0% 환각)]
   │                                                                      │
   └─ [비정형: 사업보고서 원문 XML]   ──> [MD&A 추출/청킹] ──> [pgvector 임베딩] ──> [Grounded LLM Prompt]
                                                                                   │
[Bloomberg 스타일 React 프론트엔드] <── [FastAPI API / Standalone Engine] <───────┘
```

1. **정형 데이터 (재무제표 수치)**:
   - OpenDART `fnlttSinglAcnt.json` 규격에 맞춰 8자리 법인코드(`00126380` 등) 기준으로 연결 손익계산서 주요 계정(매출액, 영업이익, 당기순이익)을 수집.
   - 회계 엔진이 전년 동기 대비 증감액, YoY 증감률(%), 영업이익률(OPM %), 마진 스프레드(%p)를 사전 연산.
2. **비정형 데이터 (이사의 경영진단 및 분석의견, MD&A)**:
   - 사업보고서 `제2부 II. 이사의 경영진단 및 분석의견 - 2. 영업실적` 부문별 텍스트를 파싱.
   - 문맥 보존을 위해 500~800자 청크 단위로 분할하고, OpenAI `text-embedding-3-small`로 벡터화.
   - 각 청크마다 고유 접수번호(`rcpNo`), 공시일자, 공시 뷰어 URL을 메타데이터로 부여하여 100% 출처 추적성 보장.

---

## 4. LLM 활용 방식 및 프롬프트 제어 (LLM Architecture)

* **적용 모델**: Google Gemini 1.5 Flash 및 OpenAI GPT-4o 멀티 클라이언트 체계.
* **Strict Grounding (엄격한 근거 중심 생성)**:
  - 시스템 프롬프트: *"너는 수치를 임의로 계산하거나 상상해서는 안 된다. 컨텍스트로 제공된 사전 계산 지표와 DART MD&A 원문만을 유일한 근거로 삼아 브리핑을 작성하라."*
* **Structured Output (JSON Schema 표준화)**:
  - `headline` (한 줄 핵심 헤드라인)
  - `summary` (정량 실적 3단 요약)
  - `reasons` (DART 원문 발췌 기반 핵심 원인 4가지)
  - `segment_analysis` (사업부문별 상세 기여도)
  - `outlook` (향후 경영진 전망)
  - `citations` (참조 공시 접수번호 및 DART 링크)

---

## 5. 프론트엔드 구성 및 시스템 설계 (Frontend Architecture)

* **기술 스택**: React 18, Vite 5, Tailwind CSS, Lucide Icons.
* **컴포넌트 구조**:
  - `Navbar`: 상단 네비게이션 및 실시간 시장 지수(KOSPI, KOSDAQ, USD/KRW, S&P 500 등) 스트리밍 티커 바.
  - `DemoPresets`: FY 2025 기준 3개 대표 기업(삼성전자, 현대차, SK하이닉스) 원클릭 브리핑 카드.
  - `CompanySelector`: 분석 기업(KOSPI 종목), 사업연도(FY 2022~2025), 집중 연구 질문 입력 폼.
  - `MetricsCard`: YoY 매출/영업이익 증감률, OPM, 턴어라운드 배지 등 정량 KPI 대시보드.
  - `AiBriefing`: 실적 총평, DART 원문 근거 요인, 부문별 분석, 향후 전망 카드.
  - `SourceCitation`: DART 공식 접수번호, 보고서명, 유사도 점수, 원문 바로가기 외부 링크 카드.
* **클라이언트 탄력성 (Fault Tolerance)**: 백엔드 서버가 슬립 상태이거나 오프라인이어도 프론트엔드 내장 DART 캐시 엔진이 즉각 작동하여 사용자 경험이 단절되지 않음.

---

## 6. UI/UX 발전 방향 (UI/UX Evolution Roadmap)

1. **시계열 인터랙티브 차트 컴포넌트 탑재 (Recharts 도입)**:
   - 최근 5개년 매출 및 영업이익 추이를 보여주는 복합 차트 (매출 바 차트 + OPM 꺾은선 차트).
   - 마우스 호버 시 툴팁으로 당시 DART 핵심 요약 팝업 표시.
2. **피어 그룹(Peer Group) 비교 분석 대시보드**:
   - 반도체(삼성전자 vs SK하이닉스), 자동차(현대차 vs 기아) 등 동종 업계 경쟁사 간의 영업이익률 스프레드 및 외형 성장률을 한눈에 나란히 비교하는 스플릿 뷰(Split View) 제공.
3. **블룸버그 터미널 인터랙션 강화**:
   - 단축키 네비게이션 지원 (예: `Alt+1` 삼성전자, `Alt+2` 현대차, `Alt+3` SK하이닉스).
   - 실시간 시황 티커 클릭 시 관련 환율/지수 상세 모달 오버레이.
4. **반응형 모바일 터미널 뷰**:
   - 데스크톱뿐만 아니라 태블릿 및 스마트폰에서도 전문 금융 앱 수준의 콤팩트 가독성 보장.

---

## 7. 향후 구현 과제 및 기말고사 스프린트 계획 (Backlog & Roadmap)

| 스프린트 단계 | 중점 개발 과제 | 담당 영역 |
| :--- | :--- | :--- |
| **Sprint 1 (인프라)** | • **FastAPI 백엔드 Docker 컨테이너화 및 상시 클라우드 배포** (슬립 방지)<br>• **Supabase pgvector 실시간 라이브 연동** 및 임베딩 파이프라인 검증 | Backend / DevOps |
| **Sprint 2 (데이터 자동화)** | • **OpenDART 일일 자동 크롤러(Cron Scheduler) 구축**<br>• KOSPI 200 주요 종목 사업보고서 데이터셋 일괄 수집 및 벡터화 | Data / Backend |
| **Sprint 3 (AI 기능 확장)** | • **멀티턴(Multi-turn) 재무 질의응답 에이전트 개발** ("과거 2023년 적자 때와 비교하면?", "부문별 마진율 차이는?")<br>• 프롬프트 토큰 캐싱 및 레이트 리밋 최적화 | AI / Backend |
| **Sprint 4 (UI/UX 완성)** | • **Recharts 기반 5개년 재무 시계열 차트 및 피어 비교 대시보드 탑재**<br>• KOSPI 전 종목 검색/자동완성 UI 및 최종 QA | Frontend / Design |

---

## 8. 팀원 R&R (역할 분담) 제안

* **Frontend Lead**: UI/UX 고도화, Recharts 차트 도입, 피어 비교 대시보드 컴포넌트 개발.
* **Backend & Cloud Lead**: FastAPI Dockerizing, Render/AWS 상시 호스팅, Supabase DB 통신 최적화.
* **AI & Data Lead**: OpenDART 자동 수집 파이프라인(ETL), 멀티턴 재무 에이전트 프롬프트 튜닝, 임베딩 검색 품질 평가.
