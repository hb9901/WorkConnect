import Typography from '@/components/Typography';
import LogoutIcon from '@/icons/LogOut.svg';

interface LogoutButtonProps {
  handleLogoutClick: () => void;
}
const LogoutButton = ({ handleLogoutClick }: LogoutButtonProps) => {
  return (
    <button onClick={handleLogoutClick}>
      <Typography variant="Subtitle18px" color="grey500" className="flex flex-row gap-[12px] items-center">
        <LogoutIcon className="size-[24px] stroke-grey500" />
        로그아웃
      </Typography>
    </button>
  );
};

export default LogoutButton;
