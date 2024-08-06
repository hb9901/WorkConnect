import { NextResponse, type NextRequest } from 'next/server';

const EMAIL_TOKEN = 'sb-ripbxzxpvscuqgdjpkix-auth-token';
const KAKAO_TOKEN_0 = 'sb-ripbxzxpvscueqgdjpkix-auth-token.0';
const KAKAO_TOKEN_1 = 'sb-ripbxzxpvscuqgdjpkix-auth-token.1';
// const AUTH_PATHS = ['/auth', '/null', '/undfined'];

const hasValidToken = (request: NextRequest) => {
  const emailToken = request.cookies.get(EMAIL_TOKEN)?.value;
  const kakaoToken0 = request.cookies.get(KAKAO_TOKEN_0)?.value;
  const kakaoToken1 = request.cookies.get(KAKAO_TOKEN_1)?.value;
  return emailToken || kakaoToken0 || kakaoToken1;
};

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const workspaceIdMatch = pathname.match(/^\/(\d+)/);
  const workspaceId = workspaceIdMatch ? workspaceIdMatch[1] : null;
  const cookies = request.headers.get('cookie');
  const userToken = cookies
    ?.split('; ')
    .find((row) => row.startsWith('workspaceId='))
    ?.split('=')[1];

  if (pathname.startsWith(`/${workspaceId}`)) {
    if (!hasValidToken(request)) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  if (pathname === '/') {
    if (hasValidToken(request)) {
      return NextResponse.redirect(new URL(`/${userToken}`, request.url));
    }
    return NextResponse.next();
  }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|/).*)']
};
