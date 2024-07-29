import { fn } from '@storybook/test';
import TextField from './TextField';

export default {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed', description: '텍스트 필드 값 변경 이벤트' },
    placeholder: {
      control: 'text',
      description: '텍스트 필드의 placeholder',
      defaultValue: 'Enter text...'
    },
    value: {
      control: 'text',
      description: '텍스트 필드의 값',
      defaultValue: ''
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지',
      defaultValue: ''
    },
    isError: {
      control: 'boolean',
      description: '에러 상태 여부',
      defaultValue: false
    },
    id: {
      control: 'text',
      description: '텍스트 필드의 id',
      defaultValue: ''
    }
  },
  args: {
    onChange: fn()
  }
};

export const Default = {
  args: {
    placeholder: 'Enter text...',
    value: '',
    errorMessage: 'error!',
    isError: false,
    id: 'email',
    children: 'email',
    label: '이메일 입력',
    color: 'grey700Black'
  }
};

export const Error = {
  args: {
    placeholder: 'Enter text...',
    value: '',
    errorMessage: 'error!',
    isError: false,
    id: 'email',
    children: 'email',
    label: '이메일 입력',
    color: 'grey700Black'
  }
};

export const Success = {
  args: {
    placeholder: 'Enter text...',
    value: '',
    errorMessage: 'error!',
    isError: false,
    id: 'email',
    children: 'email',
    label: '이메일 입력',
    color: 'grey700Black'
  }
};

export const BottomLine = {
  args: {
    placeholder: 'Enter text...',
    value: '',
    errorMessage: 'error!',
    isError: false,
    id: 'email',
    children: 'email',
    label: '이메일 입력',
    color: 'grey700Black'
  }
};
