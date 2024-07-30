import PlusIcon from '@/icons/plus.svg';
import SmileIcon from '@/icons/Smile.svg';
import SendIcon from '@/icons/Send.svg';
import { forwardRef } from 'react';

const MessageTextarea = forwardRef<
  HTMLTextAreaElement,
  {
    handleOpenUtil: () => void;
  }
>(({ handleOpenUtil }, ref) => {
  const handleResizeHeight = () => {
    const textArea = ref as React.RefObject<HTMLTextAreaElement>;
    if (!textArea.current) return;
    textArea.current.style.height = 'auto';
    textArea.current.style.height = textArea.current.scrollHeight + 'px';
  };

  return (
    <div className="flex py-4 w-full bg-white p-4 pb-[14px] gap-[10px] border-t border-grey50 items-center">
      <button
        type="button"
        onClick={handleOpenUtil}
        className="w-6 h-6 rounded-full bg-primary200Main flex justify-center items-center shrink-0"
      >
        <PlusIcon className="w-5 h-5 text-white stroke-current" />
      </button>
      <div className="relative w-full">
        <textarea
          ref={ref}
          rows={1}
          onKeyDown={handleResizeHeight}
          placeholder="메시지를 입력하세요"
          className="rounded w-full px-2 py-[12px] bg-[#fafafa] text-[12px] leading-[130%] tracking-[-0.24px] pr-9 resize-none h-[40px] max-h-[86px] block"
        />
        <button type="button" className="absolute right-2 bottom-[10px] z-10">
          <SmileIcon className="w-5 h-5 text-grey400" />
        </button>
      </div>
      <button type="submit">
        <SendIcon className="w-5 h-5 text-grey700Black" />
      </button>
    </div>
  );
});

export default MessageTextarea;
