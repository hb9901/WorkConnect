### 시작하기

```bash
npm run dev
npm run build-storybook
npm run storybook
```

### 로컬 서버 주소

- dev
  - http://localhost:3100
- storybook
  - http://localhost:6006

### .env.local

```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_API_URL
```

### supabase 타입 업데이트

- 토큰 만료시 재 로그인 필요

```bash
npx supabase login
npm run gen
```
