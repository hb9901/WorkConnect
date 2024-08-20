import { SnackBarContextProvider } from '@/providers/SnackBarContext';
import { StoryFn } from '@storybook/react';
import { useState } from 'react';
import EditTextField, { EditTextFieldProps } from './EditTextField';

export default {
  title: 'Components/EditTextField',
  component: EditTextField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    labelClassName: {
      control: 'text',
      description: 'Label의 className을 지정합니다.'
    },
    className: {
      control: 'text',
      description: 'Input의 className을 지정합니다.'
    },
    id: {
      control: 'text',
      description: '입력 필드의 고유 ID를 지정합니다.'
    },
    label: {
      control: 'text',
      description: '입력 필드에 표시될 레이블 텍스트를 지정합니다.'
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
      description: '입력 필드의 타입을 지정합니다.'
    },
    value: {
      control: 'text',
      description: '입력 필드의 초기 값을 지정합니다.'
    },
    labelColor: {
      control: 'select',
      options: ['primary200Main', 'grey700Black', 'error'],
      description: '레이블의 색상을 지정합니다.'
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 이벤트를 지정합니다.'
    },
    onChange: {
      action: 'changed',
      description: '입력값 변경 이벤트를 처리합니다.'
    },
    isRequired: {
      control: 'boolean',
      description: '필수 입력 필드 여부를 지정합니다.'
    }
  }
};

const Template: StoryFn<EditTextFieldProps> = (args) => {
  const [value, setValue] = useState(args.value);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <SnackBarContextProvider>
      <EditTextField {...args} value={value} onChange={handleChange} />
    </SnackBarContextProvider>
  );
};

export const Default = Template.bind({});
Default.args = {
  id: 'id',
  label: 'Label',
  type: 'text',
  value: '',
  labelColor: 'grey400',
  isRequired: false
};

export const Required = Template.bind({});
Required.args = {
  id: 'id',
  label: 'Label',
  type: 'text',
  value: '',
  labelColor: 'grey400',
  isRequired: true
};
