# 📊 DART 기업 실적 변화 브리핑 AI (RAG 공시 분석 시스템)

> **8주차 프로젝트**: 수집한 DART 사업보고서 공시 데이터에 화면(React), 서버(FastAPI), AI(LLM + RAG) 기능을 연결해 실제로 동작하고 배포 가능한 금융 분석 서비스를 구축합니다.

---

## 🎯 1. 서비스 개요 및 타겟 사용자

- **서비스명**: DART 기업 실적 변화 브리핑 AI
- **타겟 사용자**: 사업보고서를 읽는 **투자자 및 증권사 애널리스트**
- **핵심 가치**: 
  - 기업과 연도를 선택하면 **매출액·영업이익·영업이익률이 전년 대비(YoY) 얼마나 변했는지 자동 계산**
  - 회사가 공식 공시(이사의 경영진단 및 분석의견 MD&A)를 통해 밝힌 **실적 변동 사유를 RAG(pgvector)로 정확히 검색하여 AI 브리핑 및 공시 원문 출처를 함께 제공**

---

## 🛠️ 2. 기술 스택 및 배포 구조 (과제 요구사항 충족)

| 구분 | 사용 기술 | 배포 환경 | 주요 구현 내용 |
| :--- | :--- | :--- | :--- |
| **프론트엔드** | **React** (Vite, Tailwind CSS, Lucide) | **Vercel** (`vercel.json` 내장) | • 입력·로딩·오류·응답·출처 표시<br>• 데이터 분석 대시보드 페이지 (`/analytics`)<br>• RAG 우수사례 3건 실시간 시연 프리셋 |
| **백엔드** | **FastAPI** (Python, Pydantic, Uvicorn) | **Render** (`render.yaml`, `Dockerfile`) | • LLM API 연동 (Gemini / OpenAI)<br>• 재무 지표 자동 연산 (매출/OP/OPM YoY)<br>• Supabase pgvector RAG 검색 파이프라인 |
| **데이터베이스** | **PostgreSQL** + **pgvector** | **Supabase** (`supabase_schema.sql`) | • HNSW 코사인 유사도 벡터 인덱스<br>• DART 사업보고서 청크 및 출처 메타데이터<br>• `match_dart_documents` RPC 함수 |
| **소스 코드** | Git / GitHub | **GitHub** | • 풀스택 모노레포 구조 (`frontend/`, `backend/`) |

---

## 🌟 3. RAG 적용 우수 사례 3건 실시간 시연 (Live Demonstration)

과제 요구사항인 **"RAG를 적용한 팀은 우수 사례 3건을 실시간으로 시연합니다."**를 만족하기 위해 화면 최상단에 **원클릭 실시간 시연 프리셋 카드**가 배치되어 있습니다. 발표 시 클릭 한 번으로 아래 3가지 시나리오가 즉시 실행됩니다:

### Case 1. 삼성전자 (005930) - 2023년 vs 2022년
- **주요 실적**: 매출 258.9조원(-14.3%), 영업이익 6.5조원(**-84.8%** 급감), 영업이익률 2.54%(**-11.8%p**)
- **회사가 밝힌 사유 (공시 원문 발췌)**:
  > *"글로벌 IT 경기 침체에 따른 고객사들의 재고 조정과 수요 둔화로 DRAM 및 NAND 판가가 급락하여 DS(디바이스솔루션) 부문에서만 연간 14조 8,800억원의 영업손실을 기록..."*
- **공시 출처**: 삼성전자 사업보고서 (2023.12) / 접수번호 `20240312000854` / [DART 바로가기](https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20240312000854)

### Case 2. 현대자동차 (005380) - 2023년 vs 2022년
- **주요 실적**: 매출 162.6조원(+14.4%), 영업이익 15.1조원(**+54.0%** 역대 최대 경신), 영업이익률 9.30%(**+2.41%p**)
- **회사가 밝힌 사유 (공시 원문 발췌)**:
  > *"차량용 반도체 수급 정상화에 따른 판매 물량 확대와 고수익 차종인 SUV(팰리세이드, 싼타페 등) 및 제네시스 믹스 개선, 선진 시장 인센티브 절감 및 환율 효과..."*
- **공시 출처**: 현대자동차 사업보고서 (2023.12) / 접수번호 `20240313000621` / [DART 바로가기](https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20240313000621)

### Case 3. SK하이닉스 (000660) - 2023년 vs 2022년
- **주요 실적**: 매출 32.7조원(-26.6%), 영업이익 **-7.7조원 (대규모 적자 전환)**, 영업이익률 -23.59%(**-39.1%p**)
- **회사가 밝힌 사유 (공시 원문 발췌)**:
  > *"전방 세트 고객사들의 메모리 구매 축소 및 재고 누적으로 범용 DRAM/NAND 판가 급락 및 재고평가손실 발생. 그러나 하반기 AI 서버향 HBM3 및 고용량 DDR5 독점 공급으로 DRAM 흑자 전환 토대 마련..."*
- **공시 출처**: SK하이닉스 사업보고서 (2023.12) / 접수번호 `20240320001015` / [DART 바로가기](https://dart.fss.or.kr/dsaf001/main.do?rcpNo=20240320001015)

---

## 📁 4. 프로젝트 폴더 구조

```
finance-w4/
├── backend/
│   ├── main.py                  # FastAPI 앱 엔드포인트
│   ├── config.py                # 환경변수 설정
│   ├── models.py                # Pydantic 데이터 모델
│   ├── services/
│   │   ├── financial_calc.py    # 매출/영업이익/영업이익률 YoY 연산
│   │   ├── rag_service.py       # Supabase pgvector RAG & 인메모리 검색
│   │   └── llm_client.py        # Gemini / OpenAI API 연동 및 DART 브리핑 생성
│   ├── data/
│   │   ├── dart_dataset.py      # DART 공시 원문 청크, 메타데이터, 재무 데이터
│   │   ├── supabase_schema.sql  # Supabase pgvector DDL & RPC 스크립트
│   │   └── seed_data.py         # Supabase 데이터베이스 시딩 스크립트
│   ├── requirements.txt         # 파이썬 의존성 패키지
│   ├── render.yaml              # Render 백엔드 배포 설정
│   ├── Dockerfile               # 컨테이너 빌드 설정
│   └── .env.example             # 환경변수 예시 파일
│
├── frontend/
│   ├── package.json             # React 의존성 패키지
│   ├── vite.config.js           # Vite 빌드 및 프록시 설정
│   ├── vercel.json              # Vercel 배포 및 라우팅 설정
│   ├── tailwind.config.js       # Tailwind CSS 스타일 설정
│   ├── index.html               # HTML 엔트리포인트
│   └── src/
│       ├── App.jsx              # 프론트엔드 메인 컴포넌트
│       ├── components/
│       │   ├── Navbar.jsx           # 네비게이션 및 시스템 상태 뱃지
│       │   ├── DemoPresets.jsx      # 우수사례 3건 실시간 시연 프리셋
│       │   ├── CompanySelector.jsx  # 기업/연도/맞춤질의 선택 폼
│       │   ├── MetricsCard.jsx      # 정량 지표 변동 계산 카드
│       │   ├── AiBriefing.jsx       # LLM 브리핑, 로딩, 에러 핸들링
│       │   ├── SourceCitation.jsx   # DART 공시 원문 및 출처 명시
│       │   ├── AnalyticsPage.jsx    # 데이터 분석 대시보드 페이지
│       │   └── ArchitectureView.jsx # 풀스택 아키텍처 및 Supabase SQL 뷰어
│       ├── main.jsx
│       └── index.css
│
├── README.md                    # 프로젝트 전체 설명서
└── .gitignore                   # Git 제외 파일 목록
```

---

## 🚀 5. 로컬 실행 가이드

### 1) 백엔드 (FastAPI) 실행
```bash
# 가상환경 활성화 (선택)
.\venv\Scripts\activate

# 의존성 설치
pip install -r backend/requirements.txt

# (선택) 환경변수 설정: backend/.env 파일 생성
# GEMINI_API_KEY=your_key 또는 OPENAI_API_KEY=your_key
# SUPABASE_URL=... SUPABASE_KEY=...

# FastAPI 서버 구동
uvicorn backend.main:app --reload --port 8000
```
- 백엔드 주소: `http://localhost:8000`
- Swagger API 문서: `http://localhost:8000/docs`

### 2) 프론트엔드 (React) 실행
```bash
cd frontend

# 패키지 설치
npm install

# 개발 서버 시작
npm run dev
```
- 프론트엔드 접속: `http://localhost:3000`

---

## ☁️ 6. 클라우드 배포 가이드

### 1) Supabase (PostgreSQL + pgvector)
1. [Supabase](https://supabase.com) 프로젝트 생성
2. 좌측 메뉴 **SQL Editor**로 이동
3. `backend/data/supabase_schema.sql` 내용을 복사하여 실행 (pgvector 활성화 및 `dart_documents` 테이블, HNSW 인덱스, `match_dart_documents` 함수 생성)
4. 프로젝트의 `Project URL` 및 `anon public API Key` 확인

### 2) Render (FastAPI 백엔드)
1. GitHub 저장소에 푸시
2. [Render](https://render.com) 대시보드에서 `New +` -> `Web Service`
3. 본 저장소 선택 후:
   - **Environment**: Python
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
4. Environment Variables 등록:
   - `GEMINI_API_KEY` (또는 `OPENAI_API_KEY`)
   - `SUPABASE_URL` (선택)
   - `SUPABASE_KEY` (선택)

### 3) Vercel (React 프론트엔드)
1. [Vercel](https://vercel.com) 대시보드에서 `Add New Project`
2. 본 GitHub 저장소 임포트 후:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
3. `Deploy` 클릭 시 `frontend/vercel.json`에 정의된 백엔드 프록시 및 빌드 파이프라인에 따라 배포 완료!
