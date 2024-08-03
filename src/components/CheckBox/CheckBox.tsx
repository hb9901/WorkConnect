import { useEffect, useState } from 'react';

type CheckboxTheme = 'primary' | 'grey';

export interface CheckBoxProps {
  theme?: CheckboxTheme;
  children?: string;
  isChecked?: boolean;
  onClick?: () => void;
}

const primary200Checked = 'bg-primary200Main fill-white';
const primary200Unchecked = 'bg-transparent fill-primary200Main';
const grey100Checked = 'bg-grey200 fill-white';
const grey100Unchecked = 'bg-transparent fill-grey100';

const color: Record<CheckboxTheme, { checked: string; unchecked: string }> = {
  primary: {
    checked: primary200Checked,
    unchecked: primary200Unchecked
  },
  grey: {
    checked: grey100Checked,
    unchecked: grey100Unchecked
  }
};

export const CheckBox = ({ theme = 'primary', children, isChecked = false, onClick }: CheckBoxProps) => {
  const iconStyle = isChecked ? color[theme].checked : color[theme].unchecked;
  const strokeColor = isChecked ? 'white' : color[theme].checked;

  return (
    <div onClick={onClick} className="flex items-center cursor-pointer">
      <input type="checkbox" checked={isChecked} className="hidden" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        className={`mr-2 p-2 rounded-full border-transparent ${iconStyle}`}
      >
        <path
          d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"
          stroke={strokeColor}
          strokeWidth="2"
        />
      </svg>
      {children}
    </div>
  );
};

export default CheckBox;
