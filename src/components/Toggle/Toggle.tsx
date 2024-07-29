import clsx from 'clsx';
export interface ToggleProps {
  isChecked: boolean;
  onChange: () => void;
  className?: string;
}

const Toggle = ({ isChecked, onChange, className, ...props }: ToggleProps) => {
  return (
    <div
      className={clsx(
        'relative inline-block w-12 h-6 transition duration-200 ease-linear rounded-full',
        {
          'bg-primary200Main': isChecked,
          'bg-gray-200': !isChecked
        },
        className
      )}
      onClick={onChange}
      {...props}
    >
      <label
        htmlFor="toggle"
        className="absolute left-0 w-6 h-6 transition-transform duration-100 ease-linear transform bg-white border-2 rounded-full cursor-pointer"
        style={{
          transform: isChecked ? 'translateX(1.5rem)' : 'translateX(0)'
        }}
      />
    </div>
  );
};

export default Toggle;
