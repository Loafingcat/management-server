# 🚀 Management System - Backend API (Refactored)

이 프로젝트는 기존 모놀리식 구조에서 프론트엔드와 백엔드를 분리하고, **관심사 분리(SoC)** 원칙에 따라 전체 코드를 모듈화하여 리팩토링한 **Node.js Express API 서버**입니다.

# 🛠 리팩토링 상세 내용 (Key Improvements)

기존 수백 줄의 `server.js` 코드를 역할에 따라 모듈화하여 유지보수성을 극대화했습니다.

* **관심사 분리 (Separation of Concerns)**: 단일 파일 구조를 역할에 따라 4개의 핵심 모듈로 분리하여 가독성을 높이고 디버깅 효율을 향상시켰습니다.
* **미들웨어 모듈화**: 인증 로직(`authenticateToken`)을 독립적인 미들웨어로 분리하여 보안이 필요한 API에 선언적으로 적용할 수 있도록 설계했습니다.
* **연결 관리 최적화**: DB 연결 로직을 `config/db.js`로 캡슐화하여 데이터베이스 설정 변경 시 서버 코드 수정 없이 유연한 대응이 가능합니다.
* **보안 정책 수립**: 특정 Origin(Vercel)만 접근 가능한 **CORS 정책**을 적용하여 서버 리소스를 보호합니다.

---

## 🏗️ Architecture & Refactoring (핵심 개선 사항)

단순히 기능 구현에 그치지 않고, 프로젝트의 확장성을 위해 다음과 같이 구조를 리팩토링하였습니다.



## 📂 구조화된 프로젝트 폴더
```text
management-server/
├── 📂 config/          # DB 연결 설정 (PostgreSQL Pool 관리)
├── 📂 middleware/      # 공통 미들웨어 (JWT 인증 검증)
├── 📂 routes/          # 도메인별 라우팅 분리 (Auth, Customers)
├── 📄 server.js        # 서버 진입점 및 의존성 주입
└── 📄 .env             # 환경 변수 관리 (보안을 위해 .gitignore 등록)

---

# 📂 프로젝트 구조 분리 과정 (Migration)

기존 `management` 단일 저장소에서 백엔드 코드를 추출하며 진행한 주요 작업 단계입니다.

1.  **Repository Split**: `git subtree` 명령어를 통해 서버 코드의 커밋 이력을 보존하며 신규 저장소로 이전했습니다.
2.  **Environment Isolation**: 서버 전용 독립 환경(`.env`, `package.json`)을 구축하여 의존성을 최적화했습니다.
3.  **CORS Configuration**: 프론트엔드(Vercel)와 백엔드(Railway) 간의 원활하고 안전한 통신 설정을 완료했습니다.

---

# 🏗 Tech Stack

* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: PostgreSQL (Railway Managed)
* **Authentication**: JWT (JSON Web Token), bcrypt
* **Deployment**: Railway

---

# 🚀 시작하기 (How to Run)

## 1. 환경 변수 설정
루트 폴더에 `.env` 파일을 생성하고 아래의 필수 변수를 설정합니다.

```plaintext
NETLIFY_DATABASE_URL=your_postgresql_url
JWT_SECRET=your_secret_key

# 의존성 설치
npm install

# 서버 실행
node server.js

# 🔗 연관 프로젝트
Frontend Repository (React): React-site (Vercel)
