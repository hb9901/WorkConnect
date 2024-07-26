'use client';
import useWorkspaceUserList from '@/hooks/useWorkspaceUserList';
import { Tables } from '@/types/supabase';

const FAKE_WORKSPACE_ID = 2;
const CreateChannelPage = () => {
  const { workspaceUserList } = useWorkspaceUserList(FAKE_WORKSPACE_ID);

  return <div>{workspaceUserList && workspaceUserList.map((item) => <div key={item.id}>{item.name}</div>)}</div>;
};

export default CreateChannelPage;

const UserItem = (wokespaceUser: Tables<'workspace_user'>) => {
  return <div key={wokespaceUser.id}>{wokespaceUser.name}</div>;
};
