import { forwardRef, useId } from 'react';

type InputProps = {
  label: string;
  defaultValue: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, defaultValue }, ref) => {
  const inputUId = useId();

  return (
    <div className="flex flex-row w-full justify-between items-center">
      <label htmlFor={inputUId} className="text-sm font-semibold">
        {label}
      </label>
      <input id={inputUId} ref={ref} className="bg-slate-300 w-56 px-2 py-1" defaultValue={defaultValue} />
    </div>
  );
});

export default Input;
