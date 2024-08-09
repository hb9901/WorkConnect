import useWorkspaceId from '@/hooks/useWorkspaceId';
import { Tables } from '@/types/supabase';
import Link from 'next/link';
import MemberImg from '../MemberImg';
import MemberName from '../MemberName';
import MemberState from '../MemberState';

interface MemberCardProps {
  workspaceUser: Tables<'workspace_user'>;
}

const MemberCard = ({ workspaceUser }: MemberCardProps) => {
  const workspaceId = useWorkspaceId();

  return (
    <Link href={`/${workspaceId}/profile/${workspaceUser.id}`}>
      <div className="flex flex-row items-center justify-between py-[16px]">
        <div className="flex flex-row items-center gap-[12px]">
          <MemberImg profileImage={workspaceUser.profile_image} name={workspaceUser.name} />
          <MemberName name={workspaceUser.name} />
        </div>
        <MemberState state={workspaceUser.state} />
      </div>
    </Link>
  );
};

export default MemberCard;
