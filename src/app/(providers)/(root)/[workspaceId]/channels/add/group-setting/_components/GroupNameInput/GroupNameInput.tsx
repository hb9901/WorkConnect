import { forwardRef } from 'react';

const GroupNameInput = forwardRef<HTMLInputElement, { className?: string }>(({ className }, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      className={`text-black border-b border-gray-300 w-full h-[54px] outline-none active:border-primary200Main focus:border-primary200Main ${className}`}
      placeholder="방 제목을 입력해주세요"
      maxLength={20}
    />
  );
});

export default GroupNameInput;
