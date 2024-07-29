import { useState } from 'react';
import Input, { InputProps } from './Input';

export default {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'placeholder 텍스트를 지정합니다.'
    },
    id: {
      control: 'text',
      description: 'id를 지정합니다.'
    },
    type: {
      control: 'text',
      description: 'type을 지정합니다.'
    },
    value: {
      control: 'text',
      description: 'value를 지정합니다.'
    }
  }
};

export const Default = (args: InputProps) => {
  const [value, setValue] = useState('');

  return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

Default.args = {
  placeholder: 'Enter text...'
};
