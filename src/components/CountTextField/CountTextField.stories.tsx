import { StoryFn } from '@storybook/react';
import CountTextField, { CountTextFieldProps } from './CountTextField';

export default {
  title: 'Components/CountTextField',
  component: CountTextField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    children: { control: 'text' },
    maxLength: { control: 'number' },
    placeholder: { control: 'text' }
  }
};

const Template: StoryFn<CountTextFieldProps> = (args) => <CountTextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '이름',
  placeholder: '이름을 입력하세요',
  maxLength: 20
};
