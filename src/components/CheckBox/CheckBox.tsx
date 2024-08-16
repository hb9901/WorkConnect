import Check from '../Check/Check';

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
      <Check className={`mr-2 p-2 rounded-full border-transparent ${iconStyle}`} stroke={strokeColor} />
      {children}
    </div>
  );
};

export default CheckBox;
