import Typography from '@/components/Typography';
import { TWorkspaceInfo } from '@/types/workspace';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';

interface HeaderProps {
  workspaceList: TWorkspaceInfo[];
  workspaceId: string;
}

const Header = ({ workspaceList, workspaceId }: HeaderProps) => {
  const router = useRouter();
  const handleWorkspaceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    router.push(`/${e.target.value}`);
  };

  return (
    <header className="mt-[14px] mx-[16px] mb-[12px]">
      <Typography variant="Title20px" color="grey700Black">
        <select defaultValue={Number(workspaceId)} className="gap-[2px]" onChange={handleWorkspaceChange}>
          {workspaceList.map((workspace) => (
            <option key={workspace.id} value={workspace.id}>
              {workspace.name}
            </option>
          ))}
        </select>
      </Typography>
    </header>
  );
};

export default Header;
