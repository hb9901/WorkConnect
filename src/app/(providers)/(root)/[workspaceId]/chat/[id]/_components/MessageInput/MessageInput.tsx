import PlusIcon from '@/icons/plus.svg';
import SmileIcon from '@/icons/smile.svg';
import { forwardRef } from 'react';

const MessageInput = forwardRef<
  HTMLInputElement,
  {
    handleOpenUtil: () => void;
  }
>(({ handleOpenUtil }, ref) => {
  return (
    <div className="flex py-4 w-full bg-white p-4 pb-[14px] gap-2 border-t border-grey50">
      <button type="button" onClick={handleOpenUtil}>
        <PlusIcon />
      </button>
      <input
        type="text"
        ref={ref}
        placeholder="메시지를 입력하세요"
        className="rounded w-full px-[6px] py-[8px] bg-background text-[12px] leading-[130%] tracking-[-0.24px]"
      />
      <button type="button">
        <SmileIcon />
      </button>
    </div>
  );
});

export default MessageInput;
