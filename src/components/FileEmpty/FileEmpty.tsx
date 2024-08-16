import clsx from 'clsx';
import FileEmptyIcon from '../../icons/FileEmptyIcon.svg';
import Typography from '../Typography';

export interface FileEmptyProps {
  className?: string;
}

const FileEmpty = ({ className }: FileEmptyProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-center justify-center text-center my-auto gap-[20px] sm:gap-[26px]',
        className
      )}
    >
      <FileEmptyIcon />
      <Typography color="grey700Black" className="sm:text-[32px] text-[24px] text-center">
        파일이 비어있어요!
      </Typography>
    </div>
  );
};

export default FileEmpty;
