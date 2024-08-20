import { useState } from 'react';
import CheckBox, { CheckBoxProps } from './CheckBox';

export default {
  title: 'Components/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['primary', 'grey'],
      description: '체크박스의 테마 색상을 지정합니다.',
      defaultValue: 'primary'
    },
    children: {
      control: 'text',
      description: '체크박스 옆에 표시할 텍스트를 지정합니다.'
    },
    onClick: {
      action: 'clicked',
      description: '체크박스가 클릭될 때 호출되는 함수를 지정합니다.'
    },
    isChecked: {
      control: 'boolean',
      description: '체크박스의 체크 여부를 지정합니다.',
      defaultValue: false
    }
  }
};

export const Checkbox = (args: CheckBoxProps) => {
  const [checked, setChecked] = useState(false);
  return (
    <CheckBox theme={args.theme} onClick={() => setChecked((prev) => !prev)} isChecked={checked}>
      동의
    </CheckBox>
  );
};
