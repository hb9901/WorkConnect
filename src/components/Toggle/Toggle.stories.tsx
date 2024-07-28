import { useEffect, useState } from 'react';
import Toggle, { ToggleProps } from './Toggle';

export default {
  title: 'Components/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    isChecked: {
      description: '토글의 체크 여부를 나타내는 boolean 값입니다.',
      control: 'boolean',
      defaultValue: false
    },
    onChange: {
      description: '토글의 상태가 변경될 때 호출되는 함수입니다.',
      action: 'changed'
    }
  }
};

export const Default = (args: ToggleProps) => {
  const [isChecked, setIsChecked] = useState(args.isChecked);

  useEffect(() => {
    setIsChecked(args.isChecked);
  }, [args.isChecked]);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  return <Toggle {...args} isChecked={isChecked} onChange={handleChange} />;
};

Default.args = {
  isChecked: false
};
