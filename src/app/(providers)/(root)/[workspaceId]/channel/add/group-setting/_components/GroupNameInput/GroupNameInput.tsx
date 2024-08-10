import { forwardRef } from 'react';

const GroupNameInput = forwardRef<HTMLInputElement, {}>(({}, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      className="text-black border-b border-gray-300 w-full h-[45px]"
      placeholder="그룹대화방 이름"
    />
  );
});

export default GroupNameInput;
