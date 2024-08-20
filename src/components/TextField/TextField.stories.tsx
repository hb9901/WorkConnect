import { StoryFn } from '@storybook/react';
import { useState } from 'react';
import TextField, { TextFieldProps } from './TextField';

export default {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'TextField의 placeholder 텍스트를 지정합니다.',
      defaultValue: 'Enter text...'
    },
    value: {
      control: 'text',
      description: 'TextField의 값입니다.',
      defaultValue: ''
    },
    isError: {
      control: 'boolean',
      description: '에러 상태 여부를 지정합니다.',
      defaultValue: false
    },
    isSuccess: {
      control: 'boolean',
      description: '성공 상태 여부를 지정합니다.',
      defaultValue: false
    },
    id: {
      control: 'text',
      description: 'TextField의 id를 지정합니다.',
      defaultValue: 'textfield-id'
    },
    label: {
      control: 'text',
      description: 'TextField의 레이블 텍스트를 지정합니다.',
      defaultValue: '레이블'
    },
    LabelColor: {
      control: 'select',
      options: ['primary200Main', 'grey700Black', 'error'],
      description: '레이블의 색상을 지정합니다.',
      defaultValue: 'grey700Black'
    },
    type: {
      control: 'select',
      options: ['text', 'password'],
      description: 'input의 type을 지정합니다.',
      defaultValue: 'text'
    },
    status: {
      control: 'select',
      options: ['default', 'success'],
      description: 'TextField의 상태를 지정합니다.',
      defaultValue: 'default'
    },
    onChange: {
      action: 'changed',
      description: '입력값 변경 이벤트를 처리합니다.'
    },
    labelClassName: {
      control: 'text',
      description: 'Label의 className을 지정합니다.'
    }
  },
  args: {
    onChange: () => {}
  }
};

const Template: StoryFn<TextFieldProps> = (args) => {
  const [value, setValue] = useState('');

  return (
    <TextField
      {...args}
      type={args.type}
      status={args.status}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Enter text...',
  value: '',
  isError: false,
  isSuccess: false,
  id: 'default-id',
  label: '기본 TextField',
  LabelColor: 'grey700Black',
  type: 'text'
};

export const Error = Template.bind({});
Error.args = {
  placeholder: 'Error text...',
  value: '',
  isError: true,
  isSuccess: false,
  id: 'error-id',
  label: '에러 TextField',
  LabelColor: 'error',
  type: 'text'
};

export const Success = Template.bind({});
Success.args = {
  placeholder: 'Success text...',
  value: '',
  isError: false,
  isSuccess: true,
  id: 'success-id',
  label: '성공 TextField',
  LabelColor: 'grey700Black',
  status: 'success',
  type: 'text'
};

export const Password = Template.bind({});
Password.args = {
  placeholder: 'Password text...',
  value: '',
  isError: false,
  isSuccess: false,
  id: 'password-id',
  label: '비밀번호 TextField',
  LabelColor: 'grey700Black',
  status: 'default',
  type: 'password'
};
