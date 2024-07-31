import Typography from '@/components/Typography';
import { useParams } from 'next/navigation';
import BackButton from '../BackButton';
import DeleteButton from '../DeleteButton';

const Header = () => {
  const params = useParams();
  const isExist = params.id !== 'new';

  return (
    <header>
      <div
        className="flex flex-row justify-between
        items-center px-[16px] pt-[14px] pb-[12px] w-full"
      >
        <BackButton />
        <Typography
          variant="Title20px"
          color="grey700Black"
          className="text-center text-ellipsis whitespace-nowrap overflow-hidden"
        >
          일정상세
        </Typography>
        {isExist ? <DeleteButton /> : <div />}
      </div>
    </header>
  );
};

export default Header;
