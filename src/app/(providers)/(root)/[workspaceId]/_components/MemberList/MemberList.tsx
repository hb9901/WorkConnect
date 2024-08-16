import { Tables } from '@/types/supabase';
import MemberExistComponent from '../MemberExistComponent';
import MemberNotExistComponent from '../MemberNotExistComponent';

interface MemberListProps {
  workspaceUserList: Tables<'workspace_user'>[] | undefined;
}

const MemberList = ({ workspaceUserList }: MemberListProps) => {
  if (!workspaceUserList || workspaceUserList.length === 0) return <MemberNotExistComponent />;

  return <MemberExistComponent workspaceUserList={workspaceUserList} />;
};

export default MemberList;
