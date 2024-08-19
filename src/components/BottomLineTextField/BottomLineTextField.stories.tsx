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
      control: 'select',
      description: 'Label의 색상을 지정합니다.',
      options: ['primary200Main', 'grey400', 'grey700Black', 'error']
    },
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
      description: 'Input의 id를 지정합니다.'
    },
    label: {
      control: 'text',
      description: 'label의 text를 지정합니다.'
    },
    type: {
      control: 'select',
      description: 'input의 type을 지정합니다.',
      options: ['text', 'password', 'email', 'number']
    },
    value: {
      control: 'text',
      description: 'input의 value를 지정합니다.'
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 이벤트를 지정합니다.'
    },
    onChange: {
      action: 'changed',
      description: 'input의 변경 이벤트를 지정합니다.'
    }
  }
};

export const Template: StoryFn<BottomTextFieldProps> = (args) => {
  const [value, setValue] = useState(args.value || '');

  return <BottomLineTextField {...args} label={args.label} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  label: '기본 텍스트 필드',
  LabelColor: 'grey700Black',
  type: 'text'
};

export const Typing = Template.bind({});
Typing.args = {
  label: '입력 중인 텍스트 필드',
  LabelColor: 'grey400',
  type: 'text',
  value: '입력 중...'
};
