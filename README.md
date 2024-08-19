<h1 style="color:#7173FA">WorkConnect</h1>

<img src="https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2Fe8590d08-670b-4726-861b-fc600b72c783%2FFrame_1707485583.png?table=block&id=71915d4f-b9c4-4077-b4f4-a7a6d1e7cc59&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=1420&userId=&cache=v2" 
width="400">

<h2>📝 기획</h2>

협업을 위해 여러 서비스를 사용해야 하는 현대인들을 위한 통합 워크스페이스 서비스입니다.

<h2>🌐 서비스 링크</h2>

[WorkConnect 이동하기](https://work-connect-plum.vercel.app/)

## 👥 팀원소개

|                                          김형빈                                          |                                    김민곤                                    |                                    강해원                                    |                                    유태윤                                     |                                    이예린                                    |
| :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :--------------------------------------------------------------------------: | :---------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
|       <img src="https://avatars.githubusercontent.com/u/50387658?v=4" width="200">       | <img src="https://avatars.githubusercontent.com/u/57051139?v=4" width="200"> | <img src="https://avatars.githubusercontent.com/u/67379144?v=4" width="200"> | <img src="https://avatars.githubusercontent.com/u/167043856?v=4" width="200"> | <img src="https://avatars.githubusercontent.com/u/40863185?v=4" width="200"> |
|                                           리더                                           |                                    부리더                                    |                                     팀원                                     |                                     팀원                                      |                                     팀원                                     |
|                           [hb9901](https://github.com/hb9901)                            |                  [MinKonKim](https://github.com/MinKonKim)                   |                  [riverSun1](https://github.com/riverSun1)                   |                    [taeyun01](https://github.com/taeyun01)                    |                   [1eeyerin](https://github.com/1eeyerin)                    |
| <div>메인 페이지</div> <div>프로필 페이지</div><div>일정 페이지</div><div>레이아웃</div> |                             <div>화상 채팅</div>                             |                           <div>공용 레이아웃</div>                           |      <div>회원 가입</div> <div>로그인</div><div>워크스페이스 생성</div>       |        <div>실시간 채팅</div><div>채널 목록</div><div>파일 관리</div>        |

<br/>

## 🛠️ Tools

### 개발환경

<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"><img src="https://img.shields.io/badge/storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white"><img src="https://img.shields.io/badge/REACT-%2361DAFB?style=for-the-badge&logo=REACT&logoColor=black"><img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"><img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=Supabase&logoColor=white"><img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"><img src="https://img.shields.io/badge/nextjs-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"><img src="https://img.shields.io/badge/tanstackquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"><img src="https://img.shields.io/badge/zustand-dda0dd?style=for-the-badge&logo=react&logoColor=black"><img src="https://img.shields.io/badge/livekit-000000?style=for-the-badge&logo=react&logoColor=white">

### Communication

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"><img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"><img src="https://img.shields.io/badge/slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"><img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">

<br />

## 시작하기

```bash
npm run dev
npm run build-storybook
npm run storybook
```

## 로컬 서버 주소

- dev
  - http://localhost:3100
- storybook
  - http://localhost:6006

## .env.local

```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_API_URL

LIVEKIT_API_KEY
LIVEKIT_API_SECRET
NEXT_PUBLIC_LIVEKIT_URL

SENTRY_AUTH_TOKEN
```

## supabase 타입 업데이트

- 토큰 만료시 재 로그인 필요

```bash
npx supabase login
npm run gen
```

<br/>

## 📌 서비스 아키텍처

<img src="https://teamsparta.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F83c75a39-3aba-4ba4-a792-7aefe4b07895%2F0f6d6395-355c-4c5b-aed3-c8f7e778bd31%2Fnew_Architecture.png?table=block&id=93e813c3-2333-4e3f-8662-d449039c0dd8&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&width=2000&userId=&cache=v2" 
width="600">

## 📌 ERD

<img src="./public/images/readme/workconnectSchema.png" 
width="600">

## 📁 프로젝트 구조

## 📖 실제 구현 화면
