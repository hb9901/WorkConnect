import { forwardRef } from 'react';

const GroupNameInput = forwardRef<HTMLInputElement, {}>(({}, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      className="text-black border-b border-gray-300 w-full h-[45px]"
      placeholder="방 제목을 입력해주세요"
    />
  );
});

export default GroupNameInput;
