import type { Resume } from "./types";

// 사이트의 모든 문구 · 데이터는 이 파일에서 관리한다.
// 출처: 개인 이력 문서 (수치는 최신 기준).
// 고객사 내부 시스템명(메신저 · Agent 플랫폼 · 내부 모델명 등)은 일반화된 표현으로 쓴다.
export const resume: Resume = {
  name: "김기웅",
  nameEn: "Kim Gi Woong",
  role: "Manufacturing AI Engineer",
  headline: "제조 도메인 × AI Agent\n실전형 엔지니어",
  headlineAccent: "실전형 엔지니어",
  summary:
    "제조 현장의 핵심 시스템인 MES를 SK hynix 양산 FAB에서 6년간 구축 · 운영했고, 현재 제조 AI Agent 프로젝트 PL을 맡고 있습니다. 제조 도메인 지식과 AI 기술을 연결해 현장에서 ‘진짜 쓰이는 AI’를 만듭니다.",
  email: "dkw9700@naver.com",
  github: "https://github.com/devGWeloper",
  company: {
    name: "SK AX",
    note: "구 SK C&C",
    position: "Manager · SW Engineering",
    start: "2020.01",
    client: "고객사 SK hynix 반도체 FAB",
  },

  sections: {
    competency: {
      index: "01",
      eyebrow: "CORE COMPETENCY",
      title: "제조 도메인 · 풀스택 개발 · AI Agent까지\n아우르는 올라운드 개발자",
      accent: "올라운드 개발자",
    },
    domain: {
      index: "02",
      eyebrow: "MANUFACTURING DOMAIN",
      title: "제조 핵심 시스템 MES 도메인 전문성",
      accent: "MES",
      description:
        "MES는 공정 · 설비 · 물류 · 품질 데이터가 모이는 제조 실행의 중심 시스템입니다. 수천 개 공정 · 설비와 다수 시스템이 연동되는 반도체 양산 FAB에서 MES를 구축부터 운영까지 수행하며, 반송 · 장비 · 스케줄링 · 품질 · 기준정보 시스템과의 연동 구조와 데이터 흐름을 개발 · 운영 양쪽에서 다뤄 왔습니다.",
    },
    career: {
      index: "03",
      eyebrow: "CAREER TIMELINE",
      title: "MES 개발 → 운영 총괄 → AI Agent PL",
      accent: "AI Agent PL",
      description:
        "SK AX(구 SK C&C) 입사 후 SK hynix FAB MES를 담당하며 단위 개발자에서 SM 총괄(부), AI 프로젝트 PL로 역할을 확장했습니다.",
    },
    results: {
      index: "04",
      eyebrow: "KEY RESULTS",
      title: "주요 프로젝트 성과",
      accent: "성과",
    },
    lab: {
      index: "05",
      eyebrow: "ENGINEERING LAB",
      title: "AI Agent 운영 · 평가 · 표준화 프로젝트",
      accent: "AI Agent",
      description: "Agent를 현장에서 운영하며 필요했던 추적 · 평가 · 표준 골격을 직접 개발했습니다.",
    },
    skills: {
      index: "06",
      eyebrow: "SKILLS · EDUCATION",
      title: "기술 스택 · 학력 · 활동",
    },
    contact: {
      index: "07",
      eyebrow: "CONTACT",
      title: "현장에서 ‘진짜 쓰이는 AI’를\n만들겠습니다",
      accent: "‘진짜 쓰이는 AI’",
      description: "제조 AI · MES 관련 포지션 제안은 이메일로 연락 부탁드립니다.",
    },
  },

  heroSteps: [
    {
      phase: "BUILD · OPERATE",
      tone: "cyan",
      role: "MES 개발자",
      title: "제조 MES 구축 · 운영 6년+",
      note: "SK hynix 양산 FAB",
    },
    {
      phase: "OPERATE",
      tone: "amber",
      role: "SM 총괄(부)",
      title: "MES 개발자 100명+ 표준 · 배포 총괄",
      note: "24시간 생산 라인 장애 · 현장 VOC 대응",
    },
    {
      phase: "TRANSFORM",
      tone: "violet",
      role: "AI Agent PL",
      title: "제조 현장 엔지니어 1,500명+ 사용",
      note: "누적 요청 50,000건+",
    },
    {
      phase: "AI PRODUCTIVITY",
      tone: "green",
      role: "CoE장 · PMO",
      title: "AI 생산성 측정 전략 수립",
      note: "생산성 측정 시스템 개발",
    },
  ],

  events: [
    { time: "2020.01", type: "TRACK-IN", message: "SK C&C 입사 · SW Engineering", tone: "cyan" },
    { time: "2020.03", type: "BUILD", message: "SK hynix 신규 양산 FAB MES 구축", tone: "cyan" },
    { time: "2021.01", type: "BUILD", message: "MES 구조개선 · 공정시작/종료 핵심 이벤트 설계", tone: "cyan" },
    { time: "2022.01", type: "OPERATE", message: "FAB MES 운영 · SM 총괄(부)", tone: "amber" },
    { time: "2022–25", type: "RESULT", message: "EUV Port 시나리오 개선 · +27,000 wafers/yr · ≈50억 원", tone: "amber" },
    { time: "2023.12", type: "AWARD", message: "파트 SUPEX 시상 · 파트원 투표 최다", tone: "green" },
    { time: "2024", type: "AWARD", message: "팀 제안 경진대회 1위 · LLM 통합 모니터링", tone: "green" },
    { time: "2025.09", type: "TRANSFORM", message: "제조 AI Agent Project Leader", tone: "violet" },
    { time: "2026.04", type: "RELEASE", message: "기준정보 가이드 Agent 베타 · 2개월 단축", tone: "violet" },
    { time: "2026.05", type: "RELEASE", message: "MES 실행 AI Agent 오픈 · 3개월 단축", tone: "violet" },
    { time: "2026 H2", type: "RELEASE", message: "MES Tool 프레임워크 구축 · Agent 공용 MES 실행 Tool 표준화", tone: "violet" },
    { time: "NOW", type: "STATUS", message: "현장 엔지니어 1,500+ · 누적 요청 50,000+ · 20 FTE/yr", tone: "green" },
  ],

  competencies: [
    {
      no: "01",
      tone: "amber",
      title: "MES SM 총괄(부)로서 쌓은 제조 도메인 이해",
      summary:
        "MES를 중심으로 반송 · 장비 · 스케줄링 · 품질 시스템이 어떤 데이터로 상호작용하며 현장이 돌아가는지 이해하고, 이를 바탕으로 현장 문제를 시스템으로 개선합니다.",
      points: [
        "SK hynix FAB MES 구축 → 운영 6년, SM 총괄(부)",
        "EUV 장비 Port 시나리오 개선 · 연간 약 50억 원 가치",
        "24시간 FAB 장애 · 현장 VOC 1선 대응, 단독 완결적 업무 수행",
      ],
    },
    {
      no: "02",
      tone: "cyan",
      title: "레거시 MES부터 AI Agent까지 풀스택 개발",
      summary:
        "Java · C# · Oracle 기반 MES 개발부터 React · Spring Boot 개발관리 웹, Jenkins CI/CD, LangGraph · RAG · FastMCP 기반 Agent 파이프라인, Next.js · FastAPI 통합 모니터링까지 직접 구현합니다.",
      points: [
        "MES 핵심 이벤트 · Tibco RV 기반 기능 개발",
        "개발관리 웹 운영, Jenkins CI/CD 구축",
        "Agent 파이프라인 · 통합 모니터링 시스템 구현",
      ],
    },
    {
      no: "03",
      tone: "violet",
      title: "AI Agent PL · 아키텍처 설계와 비즈니스 리딩",
      summary:
        "고객사의 추상적인 요구를 아키텍처 문서와 프로토타입으로 구체화하고, 설계부터 개발 · 폐쇄망 배포 · 운영까지 리딩합니다.",
      points: [
        "현장 Pain Point 분석 → ‘에이전트 자동화’ 역제안, 제조 부서 정식 과제화",
        "질의/답변 Template · AI Business Workflow · 프로토타입으로 요구사항 구체화 → 프로젝트 On-boarding",
        "MES 기능을 Agent 공용 MCP Tool로 표준화하는 프레임워크 구축 · Tool 개발 표준 수립",
        "100명+ 개발자 표준 정립 경험을 바탕으로 다수 이해관계자 조율",
      ],
    },
  ],

  domain: {
    nodes: [
      { code: "AMHS", label: "반송" },
      { code: "EQP", label: "장비" },
      { code: "SCHED", label: "스케줄링" },
      { code: "QUALITY", label: "품질" },
      { code: "MASTER", label: "기준정보" },
      { code: "TIBCO RV", label: "미들웨어" },
    ],
    facts: [
      {
        value: "3만 줄",
        label: "MES 핵심 이벤트 고도화",
        description: "분당 약 15회 호출되는 핵심 이벤트 고도화, 공정시작 · 공정종료 설계 · 개발",
      },
      {
        value: "100+",
        label: "개발자 표준 · 배포 통제",
        description: "개발표준 작성 · 소스 Review · SonarQube · Bitbucket 형상 관리 · ITSM 배포",
      },
      {
        value: "24/7",
        label: "양산 라인 장애 대응",
        description: "24시간 가동 양산 라인 장애 대응, 모니터링 기반 오류 사전 감지 · 선제 조치",
      },
      {
        value: "50+/일",
        label: "로그 분석",
        description: "트랜잭션이 어떤 데이터를 바꾸고 현장에 어떤 영향을 주는지 매일 분석",
      },
    ],
  },

  career: [
    {
      id: "build",
      phase: "BUILD",
      tone: "cyan",
      role: "MES 개발",
      position: "단위 개발자",
      start: "2020.03",
      end: "2021.12",
      duration: "1년 10개월",
      title: "SK hynix FAB MES 구축 · 구조개선 / 고도화",
      summary: "신규 양산 FAB MES 구축과 2차 구조 고도화 프로젝트를 수행했습니다.",
      groups: [
        {
          label: "2020.03 – 2020.12 · 신규 양산 FAB MES 구축",
          points: [
            "Legacy Workflow 기반 MES를 Service 구조로 Refactoring",
            "반도체 공정 · 생산 간 주요 트랜잭션 개발 (FutureHold · Reticle Defect · ChangeSpec 등 WIP 이벤트)",
            "QA Test를 통한 소스 품질 증대",
          ],
        },
        {
          label: "2021.01 – 2021.12 · 구조개선 / 고도화",
          points: [
            "MES 소스 구조 최적화, 비즈니스 도메인 분류 · API 재정립",
            "LotTracking 핵심 이벤트 공정종료 고도화, 공정시작 설계 · 개발",
            "MES Slim화 · Layer 분리 등 용인 클러스터向 MES 개발",
          ],
        },
      ],
      results: ["분당 15회 · 3만 줄 핵심 이벤트 고도화", "1년간 MES 이벤트 20여 개 개발"],
      tech: ["C#", "Java", "Oracle", "Tibco Rendezvous"],
    },
    {
      id: "operate",
      phase: "OPERATE",
      tone: "amber",
      role: "MES 운영 총괄",
      position: "SM 총괄(부)",
      start: "2022.01",
      end: "2025.09",
      duration: "3년 9개월",
      title: "SK hynix FAB MES 운영",
      summary: "24시간 가동 양산 FAB의 MES 운영을 총괄하며 장애 · VOC 대응과 고객사 소통을 맡았습니다.",
      groups: [
        {
          label: "운영 총괄",
          points: [
            "장애 대응, 개발 건 할당, MES 개선 포인트 제시 등 고객사 소통 창구",
            "고객사 ↔ 개발자 간 현장 대리인으로 일정 조율",
            "제조 현장 VOC 실시간 분석 · 오류 개선",
            "랏 투입 시 튀는 모니터링 지표를 사전 파악해 선제 조치, 지표 정상화",
          ],
        },
        {
          label: "개발",
          points: [
            "EUV 장비 도입에 따른 신규 기능 개발, 장비 · 반송 · 스케줄링 시스템 연동 시나리오 개발",
            "FMS · 스케줄링 · 장비 시스템 담당자와 신규 기능 Spec 정의, 운영 환경 테스트",
            "기존 FAB 추가 기능의 신규 FAB 횡전개 개발",
            "React · Spring Boot 기반 개발관리 웹 운영, Jenkins CI/CD 구축",
          ],
        },
        {
          label: "형상 · 배포 · 품질 관리",
          points: [
            "MES 형상 관리자: Bitbucket 브랜치 병합 · PR · 충돌 해결",
            "MES 배포 Process 관리: ITSM 절차, 빌드 / 배포, 패치일 협의",
            "개발표준 작성, 소스 Review, SonarQube 관리",
            "고객사 포함 100명+ 개발자 대상 배포 절차 · 개발 교육",
          ],
        },
      ],
      results: ["EUV +27,000장/년 · ≈50억", "100명+ 개발자 표준 · 배포 통제", "파트 SUPEX 시상 (2023)"],
      tech: ["Java", "C#", "Oracle", "Tibco RV", "Bitbucket", "SonarQube", "Jenkins", "React", "Spring Boot"],
    },
    {
      id: "transform",
      phase: "TRANSFORM",
      tone: "violet",
      role: "제조 AI Agent PL",
      position: "Project Leader",
      start: "2025.09",
      duration: "진행 중",
      title: "SK hynix AI 기반 MES 업무 효율화 프로젝트",
      summary: "제조 엔지니어용 AI Agent 프로젝트의 PL로 아키텍처 설계, 메인 개발, 고객 요구사항 · 일정 조율, 개발자 리딩을 수행하고 있습니다.",
      groups: [
        {
          label: "아키텍처 · 표준",
          points: [
            "제조 MES 영역 공통 Agentic AI 표준 아키텍처 · 개발 방법론 수립",
            "사내 메신저 → 챗봇 서버 → AI 백엔드 → MCP Gateway → MES 5-Layer E2E 파이프라인 설계",
            "사내 보안 거버넌스 충족, 폐쇄망 배포",
          ],
        },
        {
          label: "Agent 개발",
          points: [
            "MES 실행 Agent: 자연어 요청으로 Legacy MES 실행",
            "기준정보 셋업 가이드 Agent: 제조 도메인 특화 RAG (Hybrid Search · Reranker)",
            "DT 사용자용 MES 로그 분석 Agent, Multi-Agent Workflow 설계 · 구현",
            "최신 의사결정 모델 즉시 적용으로 응답 레이턴시 단축",
          ],
        },
        {
          label: "MES Tool 프레임워크",
          points: [
            "MES 기능을 Agent가 호출하는 MCP Tool로 개발 → MES 화면 접속 없이 AI로 MES를 실행하는 업무 방식으로 전환",
            "개발자별로 따로 만들던 기능을 표준 규격으로 등록하는 사내 MCP Tool 플랫폼向 프레임워크 구축, 타 Agent에서 재사용",
            "Tool 개발자 협업, Tool 개발 표준 · 운영 전략 수립",
          ],
        },
        {
          label: "연동 · 운영",
          points: [
            "타 조직 협업으로 Agent 간 A2A 연동 파이프라인 구축",
            "분리된 Layer 통합 모니터링 필요성 선제안 → 웹 구축, 필수 운용 프로그램으로 정착",
          ],
        },
        {
          label: "AI 생산성 CoE장 · PMO (병행)",
          points: [
            "SK AX 부문 단위 AI Tool 생산성 PoC의 CoE장 · PMO, 측정 전략 · 운영 체계 수립",
            "고객사 DT 전략 조직과 주간 협의로 과제 선정 · 측정 기준 합의",
            "과제 선정 · 생산성 측정 포털 직접 개발 (공수 · 비용 · 품질 9개 지표)",
          ],
        },
      ],
      results: ["현장 엔지니어 1,500명+", "누적 요청 50,000건+", "연간 20 FTE 절감", "전사 Agent 플랫폼 구독 2위", "제조기술 임원 · SK AX CEO 보고", "부문 AI 생산성 CoE장 · PMO"],
      tech: ["LangGraph", "LangChain", "RAG", "MCP", "FastMCP", "A2A", "FastAPI", "Next.js", "Claude Code", "Codex"],
    },
  ],

  milestones: [
    { date: "2020.01", label: "SK C&C 입사" },
    { date: "2026.05", label: "MES 실행 Agent 오픈" },
  ],

  cases: [
    {
      code: "CASE 01",
      tag: "MES · EQUIPMENT SCENARIO",
      tone: "amber",
      visual: "utilization",
      title: "EUV 장비의 물리적 한계를 시스템으로 개선",
      problem: "EUV 장비 도입 후, 물리적으로 한정된 Port 수 때문에 장비가 웨이퍼를 기다리는 Port Idle 구간이 발생했습니다.",
      actions: [
        "MES 데이터 흐름과 반송 · 장비 · 스케줄링 시스템 간 상호작용 분석",
        "물리 Port를 논리적 In / Out으로 구분하는 시나리오 설계 · 개발",
        "제조 엔지니어와 협업해 운영 테스트 후 양산 FAB 적용",
      ],
      metrics: [
        { value: "+27,000", label: "연간 추가 공정 웨이퍼 (장)" },
        { value: "≈ 50억", label: "연간 창출 가치 (원)" },
      ],
    },
    {
      code: "CASE 02",
      tag: "AGENTIC AI · PROJECT LEAD",
      tone: "violet",
      visual: "pipeline",
      title: "사내 메신저 기반 MES 실행 AI Agent 구축",
      problem:
        "엔지니어가 복잡한 MES 화면에 직접 접속해 반복 작업을 처리해야 했고, 현장은 이 불편을 시스템 요구사항으로 정의하지 못하고 있었습니다.",
      actions: [
        "엔지니어 반복 업무 분석 → ‘에이전트 자동화’ 역제안, 제조 부서 정식 과제화",
        "5개 시스템 Layer를 관통하는 E2E 아키텍처 설계 · 메인 개발",
        "MES 기능을 Agent가 호출하는 MCP Tool로 개발, Tool 표준 등록 프레임워크 구축",
        "사내 보안 거버넌스 충족, 폐쇄망 환경 배포",
        "AI Tool 활용으로 8월 오픈 목표를 5월 초로 단축",
      ],
      metrics: [
        { value: "1,500+", label: "현장 엔지니어 사용자" },
        { value: "50,000+", label: "누적 요청" },
        { value: "20 FTE", label: "연간 공수 절감" },
        { value: "구독 2위", label: "전사 Agent 플랫폼" },
      ],
    },
    {
      code: "CASE 03",
      tag: "RAG · DOMAIN KNOWLEDGE",
      tone: "cyan",
      visual: "rag",
      title: "제조 도메인 특화 RAG 기반 기준정보 가이드 Agent",
      problem:
        "기준정보 셋업이 산발적인 가이드와 구전 지식에 의존했고, 현장의 축약어 · 동의어 때문에 일반 검색으로는 답을 찾기 어려웠습니다.",
      actions: [
        "80개 이상 RAG 컬렉션 생성 후 자동 Scoring으로 후보 선별",
        "상위 컬렉션을 실사용자 평가표로 검증해 현장 맞춤 RAG 구성",
        "Hybrid Search + Reranker, 축약어 · 동의어 대응 전략 적용",
        "6월 예정이던 오픈을 4월 베타로 단축",
      ],
      metrics: [
        { value: "80+", label: "평가한 RAG 컬렉션" },
        { value: "-2개월", label: "베타 오픈 단축" },
      ],
    },
    {
      code: "CASE 04",
      tag: "AI PRODUCTIVITY · CoE / PMO",
      tone: "green",
      visual: "replay",
      title: "AI Tool 도입 효과를 측정하는 생산성 PoC 체계",
      problem:
        "고객사는 AI Tool 도입에 따른 DT 생산성 향상을 지표로 확인해야 했고, 과제 성격에 따라 AI 효과 편차가 커서 잘 맞는 과제만 고르면 효과가 과대평가될 수 있었습니다.",
      actions: [
        "SK AX 부문 AI 생산성 CoE장 · PMO로 측정 전략 수립, 고객사 DT 전략 조직과 주간 협의",
        "Replay 테스트 설계: 완료된 과제의 기능을 같은 설계서로 AI Tool(Claude Code · Codex)을 써서 다시 개발해 기존 실적과 비교",
        "과제 적합도 상 · 중 · 하 판정 후 유형이 고르게 섞이도록 선정해 과대평가 방지",
        "과제 선정 · 측정 포털 직접 개발: AI 사용량 · 커밋 자동 수집, 공수 · 비용 · 품질 지표 산출",
      ],
      metrics: [
        { value: "9개", label: "생산성 · 경제성 · 품질 지표" },
        { value: "주 1회", label: "고객사 DT 전략 조직 협의" },
      ],
    },
  ],

  projects: [
    {
      name: "TraceX",
      tag: "AGENT OBSERVABILITY",
      tone: "cyan",
      description:
        "AI Agent 요청이 메신저 → Agent 플랫폼 → MCP → MES 4개 계층을 지나며 각기 다른 DB에 남기는 이력을 TRACE_ID로 합쳐 하나의 타임라인으로 복원. 흐름 자동 판정, 토큰 · 지연 · 타임아웃 · FTE 실적, FAB별 허용 이벤트 정책 관리.",
      tech: ["Next.js", "TypeScript", "Oracle", "Recharts"],
      href: "https://github.com/devGWeloper/inview",
    },
    {
      name: "MES 운영 지능화 Agent",
      tag: "MES AGENT",
      tone: "violet",
      description:
        "Normalizer → Classifier → Router → 로그 분석 / 지식 조회 Agent → Responser LangGraph 그래프. MCP 툴 SSE 바인딩, Milvus dense + sparse 하이브리드 검색으로 매뉴얼 · 기준정보 조회.",
      tech: ["LangGraph", "MCP", "Milvus", "Python"],
      href: "https://github.com/devGWeloper/eworks",
    },
    {
      name: "TestX",
      tag: "LLMOPS · EVALUATION",
      tone: "green",
      description:
        "Agent 노드별 프롬프트 · 모델 설정 버전 관리와 데이터셋 기반 플로우 회귀 평가. RAGAS 5개 지표를 LLM 심판 방식으로 재구현, 프롬프트 버전 · 엔드포인트 축 A/B 비교, SSE 실시간 진행.",
      tech: ["Next.js", "TypeScript", "Oracle", "SSE"],
      href: "https://github.com/devGWeloper/AutoPrompt",
    },
    {
      name: "AI.MES",
      tag: "AI × MES PROTOTYPE",
      tone: "amber",
      description:
        "Lot · 설비 · 반송 화면별 LangChain Agent를 붙인 AI 기반 Web MES 프로토타입. Next.js → Spring Boot(JWT, FAB별 멀티 데이터소스) → FastAPI Agent 3-tier, 병목 식별 · 예측 정비 · 반송 원인 분석 목표.",
      tech: ["Next.js", "Spring Boot", "MyBatis", "FastAPI", "LangChain"],
      href: "https://github.com/devGWeloper/AI.MES",
    },
    {
      name: "LangGraph Challenge Platform",
      tag: "TEAM ENABLEMENT",
      tone: "blue",
      description:
        "workflow.py 하나만 작성하면 서버가 동적 로딩해 조별 탭을 자동 생성. 조별 상태 격리로 오류 전파 차단, 실행 노드 추적(TraceRail). 팀 멀티 에이전트 챌린지 운영 플랫폼.",
      tech: ["LangGraph", "FastAPI", "React", "Vite"],
      href: "https://github.com/devGWeloper/LangGraphTemplate",
    },
    {
      name: "Multi-Agent 표준 골격",
      tag: "AGENT FRAMEWORK",
      tone: "violet",
      description:
        "의도 분류 → Router → 도메인 Agent 구조에 Retriever · MCP 툴 선택 주입. 버전 폴더 격리로 운영 버전 영향 없이 다음 버전 개발, pytest 단위 · 통합 테스트.",
      tech: ["LangGraph", "Milvus", "pytest"],
      href: "https://github.com/devGWeloper/base_multi_agent",
    },
    {
      name: "AI 생산성 PoC 포털",
      tag: "AI PRODUCTIVITY",
      tone: "cyan",
      description:
        "AI 코딩 도구 PoC 과제 접수 · 판정 · 균형 선정, 공수 · 비용 · 품질 9개 지표로 생산성 측정. 칸반 보드, PDF 보고서, Jira 결함 연동.",
      tech: ["Next.js", "TypeScript", "Oracle", "LangChain", "Vitest"],
      href: "https://github.com/devGWeloper/devopspilot",
    },
    {
      name: "Durable Workflow POC",
      tag: "RELIABILITY",
      tone: "amber",
      description:
        "사내 폴링 프로세스에 durable workflow 도입 POC. 프로세스 강제 종료 후 재기동 시 완료 step은 재실행 없이 끊긴 지점부터 이어지는 것을 실측 검증.",
      tech: ["Python", "DBOS"],
      href: "https://github.com/devGWeloper/DBOS",
    },
  ],

  skills: [
    {
      code: "MFG",
      category: "Manufacturing",
      items: ["제조 MES 구축 · 운영", "LotTracking · QTime · WIP 이벤트", "반송 · 장비 · 스케줄링 연계", "기준정보", "반도체 FAB · EUV 장비 시나리오", "24/7 장애 대응"],
    },
    {
      code: "AI",
      category: "Agentic AI",
      items: ["LangGraph", "LangChain", "RAG · Hybrid Search · Reranker", "MCP · FastMCP", "A2A", "Multi-Agent Workflow", "Spring AI"],
    },
    {
      code: "BE",
      category: "Backend",
      items: ["Java", "C#", "Spring · Spring Boot", "Oracle", "Tibco Rendezvous", "Python", "FastAPI"],
    },
    {
      code: "FE",
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript"],
    },
    {
      code: "OPS",
      category: "DevOps · Quality",
      items: ["Jenkins CI/CD", "Bitbucket 형상 관리", "SonarQube", "ITSM 배포 프로세스", "폐쇄망 배포"],
    },
  ],

  education: [
    {
      school: "금오공과대학교",
      major: "컴퓨터공학과 학사",
      period: "2014.03 – 2020.02",
      notes: ["3 · 4학년 전교 1 · 2등", "CNN 직접 설계 · CIFAR-10 정확도 86%", "졸업 프로젝트: 딥러닝 기반 유해 이미지 자동 필터링 모듈"],
    },
  ],

  certifications: [
    { name: "정보처리기사", issuer: "한국산업인력공단" },
    { name: "NVIDIA NCA-GENL", issuer: "Generative AI LLMs Associate" },
    { name: "사내 AI 자격", issuer: "SK AX" },
  ],

  focus: [
    "Deep Agent 기반 자율 추론형 AI-MES",
    "AI · Digital Twin 기반 지능형 생산시스템",
    "Rule Base → AI Base 의사결정 지원",
  ],

  activities: [
    {
      year: "2024",
      title: "팀 제안 경진대회 1위",
      description:
        "인프라 · 로그 모니터링 등 5개 이상 툴을 통합하고 에러 패턴을 정제해 LLM Prompt로 제공하는 통합 모니터링 기획 (고객사 · 컨설턴트 · 팀장 평가 1위)",
    },
    {
      year: "2023",
      title: "파트 SUPEX 시상",
      description: "연말 파트 SUPEX 시상식에서 파트원 투표 최다 득표",
    },
    {
      year: "2025",
      title: "AI 아이디어 제안 · PoC",
      description: "엔지니어 의사결정 화면 AI UX, Pulling · 스마트 계측 등 Rule Base 업무의 AI 전환 아이디어 제안 · PoC, AI 기반 Web MES 구현",
    },
    {
      title: "SK hynix 연구회 · Spring AI",
      description: "MES 생성형 AI 도입 가능성을 Spring AI 프로그램으로 직접 개발 · 시연",
    },
    {
      title: "AI 역량 개발",
      description: "AI Boot Camp 참여, KOPIS 공공데이터를 연계한 서비스 수준의 공연 추천 AI Agent 개발, 사내 AI 자격 취득",
    },
    {
      title: "팀 AI 역량 활동",
      description: "AI 릴레이 프로젝트 · One Page Report 기획, LangGraph 멀티 에이전트 챌린지 플랫폼 운영",
    },
  ],
};
