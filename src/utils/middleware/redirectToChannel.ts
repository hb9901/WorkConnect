import api from '@/api';
import { NextRequest, NextResponse } from 'next/server';

export async function redirectToChannel(request: NextRequest) {
  const workspaceId = request.cookies.get('workspaceId')?.value;

  if (!request.nextUrl.href.includes(`/${workspaceId}/channels?redirect=true`)) return;

  const workspaceUserId = request.cookies.get('workspaceUserId')?.value;

  const channel_id = await api.channel.getChannelId({
    workspace_id: Number(workspaceId),
    workspace_user_id: workspaceUserId ?? ''
  });

  if (!channel_id) return;

  return NextResponse.redirect(new URL(`/${workspaceId}/channels/${channel_id}`, request.url));
}
