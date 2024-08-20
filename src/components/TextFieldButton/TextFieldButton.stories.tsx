import { StoryFn } from '@storybook/react';
import TextFieldButton, { TextFieldButtonProps } from './TextFieldButton';

export default {
  title: 'Components/TextFieldButton',
  component: TextFieldButton,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label의 텍스트를 지정합니다.'
    },
    value: {
      control: 'text',
      description: '입력 필드의 value를 지정합니다.'
    },
    onChange: {
      action: 'changed',
      description: '입력값 변경 이벤트를 처리합니다.'
    },
    onClick: {
      action: 'clicked',
      description: '버튼이 클릭될 때 호출되는 함수'
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
      description: 'input의 type을 지정합니다.'
    },
    LabelColor: {
      control: 'select',
      options: ['primary200Main', 'grey700Black', 'error'],
      description: '레이블의 색상을 지정합니다.'
    }
  }
};

const Template: StoryFn<TextFieldButtonProps> = (args) => <TextFieldButton {...args} LabelColor={args.LabelColor} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Default Label',
  value: ''
};
