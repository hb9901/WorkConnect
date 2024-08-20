import { StoryFn } from '@storybook/react';
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
      description: 'input의 placeholder 텍스트를 지정합니다.'
    },
    id: {
      control: 'text',
      description: 'input의 id를 지정합니다.'
    },
    type: {
      control: 'select',
      description: 'input의 type을 지정합니다.',
      options: ['text', 'password']
    },
    value: {
      control: 'text',
      description: 'input의 value를 지정합니다.'
    },
    status: {
      control: 'select',
      options: ['default', 'focus', 'error', 'success', 'typing'],
      description: 'input의 상태를 지정합니다.'
    },
    togglePasswordVisibility: {
      control: 'boolean',
      description: '비밀번호 가시성 boolean 값입니다.'
    },
    className: {
      control: 'text',
      description: 'input의 추가적인 CSS 클래스를 지정합니다.'
    },
    onChange: {
      action: 'changed',
      description: 'input의 변경 이벤트를 지정합니다.'
    },
    onFocus: {
      action: 'focused',
      description: 'Input 필드가 포커스 되었을 때의 이벤트를 처리합니다.'
    },
    onBlur: {
      action: 'blurred',
      description: 'Input 필드의 포커스가 해제되었을 때의 이벤트를 처리합니다.'
    }
  }
};

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
