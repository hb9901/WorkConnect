import Typography from '@/components/Typography';
import CheckCircleIcon from '@/icons/CheckCircle.svg';
import LoaderIcon from '@/icons/Loader.svg';
import MinusCircleIcon from '@/icons/MinusCircle.svg';

const TodoListTitle = ({ title }: { title: '진행 전' | '진행 중' | '완료' | null | undefined }) => {
  return (
    <div className="lg:flex lg:flex-row lg:items-center lg:gap-[12px]">
      {title === '진행 전' ? (
        <MinusCircleIcon className="hidden lg:flex w-[20px] h-[20px] stroke-[#737B91]" />
      ) : title === '진행 중' ? (
        <LoaderIcon className="hidden lg:flex w-[20px] h-[20px] stroke-[#737B91]" />
      ) : title === '완료' ? (
        <CheckCircleIcon className="hidden lg:flex w-[20px] h-[20px] stroke-[#737B91]" />
      ) : (
        <></>
      )}
      <Typography variant="Subtitle16px" color="grey700Black">
        {title}
      </Typography>
    </div>
  );
};

export default TodoListTitle;
