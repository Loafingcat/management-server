# 🚀 Management System - Backend API (Refactored)

이 프로젝트는 기존 모놀리식 구조에서 프론트엔드와 백엔드를 분리하고, **관심사 분리(SoC)** 원칙에 따라 전체 코드를 모듈화하여 리팩토링한 **Node.js Express API 서버**입니다.

## 📌 주요 특징
- **저장소 분리:** 독립적인 유지보수와 배포를 위해 프론트엔드(React)와 백엔드(Express) 저장소를 완전 분리.
- **아키텍처 리팩토링:** 단일 파일(`Fat File`) 구조를 `Config`, `Middleware`, `Routes`로 계층화하여 설계.
- **보안 강화:** `JWT` 인증 미들웨어를 통한 API 접근 제어 및 `bcrypt` 기반 비밀번호 암호화.
- **자동 배포:** GitHub 연동을 통해 `Railway` 클라우드 환경에 실시간 CI/CD 구축.

---

## 🏗️ Architecture & Refactoring (핵심 개선 사항)

단순히 기능 구현에 그치지 않고, 프로젝트의 확장성을 위해 다음과 같이 구조를 리팩토링하였습니다.



### 📂 구조화된 프로젝트 폴더
```text
management-server/
├── 📂 config/          # DB 연결 설정 (PostgreSQL Pool 관리)
├── 📂 middleware/      # 공통 미들웨어 (JWT 인증 검증)
├── 📂 routes/          # 도메인별 라우팅 분리 (Auth, Customers)
├── 📄 server.js        # 서버 진입점 및 의존성 주입
└── 📄 .env             # 환경 변수 관리 (보안을 위해 .gitignore 등록)
