import { User } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentRoute } from './getCurrentRoute';
import { redirectRoutes } from '@/constants/redirectRoutes';

export const handleAuthRedirect = async (request: NextRequest, user: User | null) => {
  const path = request.nextUrl.pathname;
  const workspaceId = request.cookies.get('workspaceId')?.value;

  const target = getCurrentRoute({ routes: redirectRoutes, path });

  if (user && target?.isGuestOnly && workspaceId) {
    return NextResponse.redirect(new URL(`/${workspaceId}`, request.url));
  }

  if (user && target?.isWorkspaceUserOnly && !workspaceId) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!user && target?.isAuthOnly) {
    return NextResponse.redirect(new URL('/', request.url));
  }
};
