'use client';

import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';
import { supabase } from '@/utils/supabase/supabaseClient';
import { useEffect } from 'react';
import useGetChannelId from '../../../../_hook/useGetChannelId';

const UpdateChannelReadAt = () => {
  const workspaceUserId = useWorkspaceUserId();
  const channelId = useGetChannelId();

  useEffect(() => {
    if (!workspaceUserId) return;
    const dd = async () => {
      await supabase
        .from('channel_user')
        .update({ last_active_at: new Date().toISOString() })
        .eq('workspace_user_id', workspaceUserId)
        .eq('channel_id', channelId);
    };
    dd();
  }, []);

  return null;
};

export default UpdateChannelReadAt;
