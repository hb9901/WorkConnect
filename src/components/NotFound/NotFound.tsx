import clsx from 'clsx';
import Link from 'next/link';
import NotFoundIcon from '../../icons/NotFoundIcon.svg';
import Button from '../Button';
import Typography from '../Typography';

export interface NotFoundProps {
  className?: string;
}

const NotFound = ({ className }: NotFoundProps) => {
  return (
    <div className={clsx('flex flex-col items-center justify-center text-center my-auto', className)}>
      <NotFoundIcon />
      <Typography
        color="grey700Black"
        className="text-[20px] mt-[15px] mb-[10px] sm:text-[32px] sm:mt-[26px] sm:mb-[18px]"
      >
        이용에 불편을 드려 죄송합니다.
      </Typography>
      <Typography color="grey400" className="text-[14px] sm:text-[24px]">
        요청하신 페이지를 찾을 수 없어요.
      </Typography>
      <Typography color="grey400" className="text-[14px] sm:text-[24px]">
        페이지 주소가 잘못 입력되었거나 삭제된 페이지일 수 있습니다.
      </Typography>
      <div className="pt-16">
        <Button theme="outline" className="w-80 hover:bg-gray-50">
          <Link href="/">홈으로 가기</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
