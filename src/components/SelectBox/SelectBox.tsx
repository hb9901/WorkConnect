import { ReactNode, useState } from 'react';

export interface Option {
  label: string;
  value: string;
  icon?: ReactNode;
}

export interface SelectBoxProps {
  label: string;
  options: Option[];
  onChange: (value: string) => void;
}

export const SelectBox = ({ label, options, onChange, ...props }: SelectBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" {...props}>
      <div
        className="flex items-center justify-between w-full p-2 gap-2 bg-[#FAFAFA] border border-gray-300 rounded-md focus:outline-none"
        onClick={handleToggle}
      >
        {selectedValue || label}
        {isOpen ? (
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <g id="ChevronUp">
              <path
                d="M15 13L10 8L5 13"
                stroke="#9096A7"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        ) : (
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="cursor-pointer"
          >
            <g id="ChevronDown">
              <path
                d="M5 8L10 13L15 8"
                stroke="#9096A7"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        )}
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-grey50 border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              className="flex items-center p-2 hover:bg-primary25 cursor-pointer"
              onClick={() => handleSelect(option.value)}
            >
              {option.icon && <span className="mr-2">{option.icon}</span>}
              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectBox;
