import { StrictPropsWithChildren } from '@/types/common';
import { useRef } from 'react';
import Typography from '@/components/Typography';
import FileInput from '@/components/FileInput';

const FileButton = ({
  children,
  title,
  name,
  accept,
  onChange
}: StrictPropsWithChildren<{
  title: string;
  name: string;
  accept: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}>) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    ref.current?.click();
  };

  return (
    <>
      <FileInput name={name} accept={accept} ref={ref} onChange={onChange} />
      <button
        type="button"
        className="flex flex-col items-center justify-center gap-[6px] px-[5px]"
        onClick={handleClick}
      >
        <div className="flex items-center justify-center w-[46px] h-[46px] rounded-full bg-[#74B974]">{children}</div>
        <Typography as="span" variant="Body12px" className="text-grey500">
          {title}
        </Typography>
      </button>
    </>
  );
};

export default FileButton;
