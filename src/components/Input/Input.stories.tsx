import { Meta, StoryFn } from '@storybook/react';
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
      control: 'select',
      description: 'type을 지정합니다.',
      options: ['text', 'password']
    },
    value: {
      control: 'text',
      description: 'value를 지정합니다.'
    },
    status: {
      control: 'select',
      options: ['default', 'focus', 'error', 'success', 'typing'],
      description: 'input의 상태를 지정합니다.'
    },
    togglePasswordVisibility: {
      control: 'boolean',
      description: '비밀번호 가시성 boolean 값입니다.'
    }
  }
} as Meta;

const Template: StoryFn<InputProps> = (args) => {
  const [value, setValue] = useState('');

  return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter text...',
  id: 'default-input',
  type: 'text',
  status: 'default'
};

export const Error = Template.bind({});
Error.args = {
  placeholder: 'Error text...',
  id: 'error-input',
  type: 'text',
  status: 'error'
};

export const Success = Template.bind({});
Success.args = {
  placeholder: 'Success text...',
  id: 'success-input',
  type: 'text',
  status: 'success'
};

export const Password = Template.bind({});
Password.args = {
  placeholder: 'Enter password...',
  id: 'password-input',
  type: 'password',
  status: 'default'
};
