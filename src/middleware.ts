import { type NextRequest } from 'next/server';
import { updateSession } from './utils/middleware/supabaseMiddleware';
import { redirectToChannel } from './utils/middleware/redirectToChannel';

export async function middleware(request: NextRequest) {
  let response = await updateSession(request);

  const channelRedirectResponse = await redirectToChannel(request);
  if (channelRedirectResponse) {
    return channelRedirectResponse;
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|images|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$|/).*)'
  ]
};
