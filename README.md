# <div align="center">**멋쟁이 사자처럼 프론트엔드 스쿨 6기<br>React 프로젝트**</div>

<div align="center">

![header](https://capsule-render.vercel.app/api?type=soft&color=E67800&height=200&section=header&text=🦁Lionly🦁&fontSize=80&fontColor=fff&animation=scaleIn)

</div>

## 👋 서비스 소개
멋쟁이 사자처럼 프론트엔드 스쿨 6기와 이듬을 위한 SNS
## 📆 목차 및 기간

- 목차 : 미구성
- 기간 : 2023 / 08 / 30 ~ 2023 / 09 / 26

## 🚀 팀 구성

### 팀 이름 : 2제는 할 수 있조

- 황초원(조장) : [GitHub 바로가기](https://github.com/chowonn)
- 김태일(스크럼 마스터) : [GitHub 바로가기](https://github.com/seumomo)
- 박지함 : [GitHub 바로가기](https://github.com/itzwe)
- 이지수 : [GitHub 바로가기](https://github.com/jisulee97)

## ✅ 프로젝트 진행 시 준수사항

- 웹 표준, 접근성 준수 및 (가능한 선에서) 반응형 웹 구현
- 오픈 소스 라이브러리 또는 (작성 가능한 경우) 유틸리티 함수 최대한 활용
- 가급적 작은 단위로 React 컴포넌트 구성 (유지 보수 용이)
- 코드가 복잡한 React 컴포넌트가 없도록 설계 (유지 보수가 어렵기 때문)
- 컴포넌트 간 재사용 가능한 로직은 (가능한 선에서) 커스텀 훅 활용
- React 프론트엔드 개발에 집중 (백엔드 서비스는 팀 별, PocketBase 활용)
- API 데이터 모델링 (팀 별, PocketBase 계정 생성 후 업로드)

## 💪 개인별 프로젝트 목표
- 황초원 : 리액트에 익숙해지며 hook을 적절하게 사용해보고 프로젝트 경험 쌓기
- 김태일 : 많은 페이지를 만들기보다 완성도 있게 만들기
- 박지함 : 기능 구현을 통해서 리액트 및 관련 라이브러리 활용하는 실력 늘리기
- 이지수 : 배운 것을 최대한 많이 활용하여 프로젝트 잘 마무리 하기

## 📚 기술 스택

### 환경

<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

### 언어
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">

### 도구
<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> <img src="https://img.shields.io/badge/reactrouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/pocketbase-B8DBE4?style=for-the-badge&logo=pocketbase&logoColor=white"> <img src="https://img.shields.io/badge/framer-0055FF?style=for-the-badge&logo=framer&logoColor=white"> <img src="https://img.shields.io/badge/githubpages-222222?style=for-the-badge&logo=githubpages&logoColor=white">

### 소통

<img src="https://img.shields.io/badge/discord-5865F2?style=for-the-badge&logo=discord&logoColor=white"> <img src="https://img.shields.io/badge/kakaotalk-FFCD00?style=for-the-badge&logo=kakaotalk&logoColor=white">

## 📋 시작 가이드

  `npm i` | `pnpm i`
* `react` ➡️ 18.2.0
* `react-helmet-async` ➡️ 1.3.0
* `react-hot-toast` ➡️ 2.4.1
* `prop-types` ➡️ 15.8.1
* `framer-motion` ➡️ 10.16.2
* `vite` ➡️ 4.4.5
* `tailwindcss` ➡️ 3.3.3
* `postcss` ➡️ 8.4.29
* `autoprefixer` ➡️ 10.4.15
* `prettier` ➡️ 3.0.3
* `prettier-plugin-tailwindcss` ➡️ 0.5.4
* `eslint` ➡️ 8.45.0

## 🚩 서비스 흐름도
<div align="center">
<img src="https://github.com/FRONTENDSCHOOL6/Lionly/assets/127176650/be8dc5b0-f930-4860-93c1-968eb921d3ec" height="800">
</div>

### 로그인 과정
- 랜딩 페이지 ➡️ 로그인 페이지 ➡️ 로그인 | 계정 찾기 | 회원가입
  - 로그인 ➡️ 피드
  - 계정 찾기 ➡️ 아이디 찾기 | 비밀번호 찾기 ➡️ 로그인 페이지 ➡️ 로그인 ➡️ 피드
  - 회원가입 ➡️ 피드

### 로그인 후
- 피드 ➡️ 마이 페이지 | 글쓰기 | 글 선택하기
  - 마이 페이지 ➡️ 프로필 수정 | 내 글 보기
    - 프로필 수정
    - 내 글 보기 ➡️ 내 글 보기 피드 페이지 ➡️ 수정하기 | 삭제하기 | 댓글 쓰기
  - 글쓰기
  - 글 선택하기
    - 내가 작성한 글 ➡️ 수정하기 | 삭제하기 | 댓글 쓰기
    - 다른 사람이 작성한 글 ➡️ 댓글 쓰기