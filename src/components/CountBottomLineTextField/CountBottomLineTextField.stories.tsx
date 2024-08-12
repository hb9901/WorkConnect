import { StoryFn } from '@storybook/react';
import CountBottomLineTextField, { CountBottomLineTextFieldProps } from './CountBottomLineTextField';

export default {
  title: 'Components/CountBottomLineTextField',
  component: CountBottomLineTextField,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    onClick: { action: 'clicked' },
    LabelColor: {
      control: {
        type: 'select',
        options: ['primary200Main', 'grey400', 'grey700Black', 'error', undefined]
      }
    },
    type: {
      control: {
        type: 'text'
      }
    }
  }
};

const Template: StoryFn<CountBottomLineTextFieldProps> = (args) => <CountBottomLineTextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '이메일',
  placeholder: '이메일을 입력해주세요.',
  onChange: () => {},
  LabelColor: 'grey700Black',
  defaultValue: ''
};
