import { useEffect, useState } from 'react';
import CheckBox, { CheckBoxProps } from './CheckBox';

export default {
  title: 'Components/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '체크될 항목의 내용'
    },
    theme: {
      control: {
        type: 'select',
        options: ['primary200', 'grey100']
      },
      description: '체크박스 테마',
      defaultValue: 'primary200'
    },
    isChecked: {
      description: '체크 여부를 나타내는 boolean 값입니다.'
    },
    onClick: { action: 'clicked', description: '체크박스 클릭 이벤트' }
  }
};

export const Default = (args: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(args.isChecked);

  useEffect(() => {
    setIsChecked(args.isChecked);
  }, [args.isChecked]);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <CheckBox theme={args.theme} isChecked={isChecked} onClick={handleChange}>
      약관 전체 동의
    </CheckBox>
  );
};

Default.args = {
  isChecked: false,
  theme: 'primary200',
  children: '약관 전체 동의'
};
