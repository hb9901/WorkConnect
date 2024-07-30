'use client';

import { useRouter } from 'next/navigation';

const TestHeader = ({
  title,
  leftButton,
  rightButton
}: {
  title: string;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <header className="flex items-center justify-between p-4 relative border-b z-10 bg-white">
      <button type="button" className="absolute left-[3%] z-10 text-[18px] font-semibold" onClick={handleBack}>
        &lt;
      </button>
      <h1 className="text-[16px] font-semibold text-center w-full">{title}</h1>
      <div className="absolute right-[3%] flex items-center justify-between">
        <div>{leftButton}</div>
        <div>{rightButton}</div>
      </div>
    </header>
  );
};

export default TestHeader;
