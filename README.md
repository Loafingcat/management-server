# 🚀 Management System - Backend API

이 프로젝트는 기존 모놀리식 구조에서 프론트엔드와 백엔드를 분리하여 독립적인 서비스로 구축한 **Node.js Express API 서버**입니다.

## 📌 주요 특징
- **저장소 분리:** 유지보수와 개별 배포를 위해 프론트엔드(React)와 백엔드(Express) 저장소를 완전히 분리.
- **인증 시스템:** `JSON Web Token(JWT)`과 `bcrypt`를 활용한 보안 로그인 및 권한 관리.
- **데이터베이스:** `PostgreSQL`을 사용하여 고객 데이터 관리.
- **자동 배포:** GitHub과 연동하여 `Railway`를 통한 지속적 통합 및 배포(CI/CD) 환경 구축.

## 🛠 Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (with `pg` library)
- **Authentication:** JWT, bcrypt
- **Deployment:** Railway

## 📂 프로젝트 구조 분리 과정
기존 `management` 폴더 내에 공존하던 코드를 다음과 같이 구조화하였습니다.
1. **Repository Split:** `git subtree`를 활용하여 서버 코드 이력을 보존하며 신규 저장소 생성.
2. **Environment Isolation:** 서버 전용 `.env` 및 `package.json` 구성.
3. **CORS Configuration:** 프론트엔드(Vercel)와의 원활한 통신을 위한 CORS 보안 설정.

## 🚀 시작하기

### 1. 환경 변수 설정
루트 폴더에 `.env` 파일을 생성하고 다음 변수들을 설정합니다.
```text
NETLIFY_DATABASE_URL=your_postgresql_url
JWT_SECRET=your_secret_key

# 의존성 설치
npm install

# 서버 실행
node server.js
