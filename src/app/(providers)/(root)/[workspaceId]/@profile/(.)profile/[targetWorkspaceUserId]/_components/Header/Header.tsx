import Typography from '@/components/Typography';
import BackButton from '../BackButton';

interface HeaderProps {
  title: string;
  type: 'edit' | 'profile' | 'myPage';
}

const Header = ({ title, type }: HeaderProps) => {
  return (
    <header>
      <div className="grid grid-cols-3 items-center px-[16px] pt-[14px] pb-[12px] w-full">
        <BackButton />
        <Typography
          variant="Title20px"
          color="grey700Black"
          className="text-center text-ellipsis whitespace-nowrap overflow-hidden"
        >
          {title}
        </Typography>

        <div className="flex items-center justify-end">
          {/* {type === 'myPage' && <button className="text-sm">로그아웃</button>} */}
        </div>
      </div>
    </header>
  );
};

export default Header;
