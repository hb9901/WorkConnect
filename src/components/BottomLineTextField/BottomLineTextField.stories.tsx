import { StoryFn } from '@storybook/react';
import { useState } from 'react';
import BottomLineTextField, { BottomTextFieldProps } from './BottomLineTextField';

export default {
  title: 'Components/BottomLineTextField',
  component: BottomLineTextField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    LabelColor: {
      control: {
        type: 'select',
        options: ['primary200Main', 'grey400', 'grey700Black', 'error']
      }
    },
    onClick: {
      action: 'clicked'
    }
  }
};

export const Template: StoryFn<BottomTextFieldProps> = (args) => {
  const [value, setValue] = useState(args.value || '');

  return <BottomLineTextField {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  label: '기본 텍스트 필드',
  LabelColor: 'grey700Black',
  type: 'text'
};

export const Focused = Template.bind({});
Focused.args = {
  label: '포커스된 텍스트 필드',
  LabelColor: 'primary200Main',
  type: 'text',
  value: '포커스 상태'
};

export const Typing = Template.bind({});
Typing.args = {
  label: '입력 중인 텍스트 필드',
  LabelColor: 'grey400',
  type: 'text',
  value: '입력 중...'
};

export const WithDeleteButton = Template.bind({});
WithDeleteButton.args = {
  label: '삭제 버튼이 있는 텍스트 필드',
  LabelColor: 'error',
  type: 'text',
  value: '삭제할 내용'
};
