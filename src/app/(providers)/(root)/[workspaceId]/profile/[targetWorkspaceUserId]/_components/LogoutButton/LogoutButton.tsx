import Typography from '@/components/Typography';

interface LogoutButtonProps {
  handleLogoutClick: () => void;
}
const LogoutButton = ({ handleLogoutClick }: LogoutButtonProps) => {
  return (
    <button onClick={handleLogoutClick}>
      <Typography variant="Subtitle14px" color="grey400">
        로그아웃
      </Typography>
    </button>
  );
};

export default LogoutButton;
