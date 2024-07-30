import Typography from '@/components/Typography';
import { TWorkspaceInfo } from '@/types/workspace';

interface HeaderProps {
  workspaceList: TWorkspaceInfo[];
}

const Header = ({ workspaceList }: HeaderProps) => {
  const testList = ['예시 조직1', '예시 조직2'];

  return (
    <header className="mt-[14px] mx-[16px] mb-[12px]">
      <Typography variant="Title20px" color="grey700Black">
        <select defaultValue="조직이름" className="gap-[2px]">
          {testList.map((workspace, index) => (
            <option key={index}>{workspace}</option>
          ))}
        </select>
      </Typography>
    </header>
  );
};

export default Header;
