import { Meta, StoryFn } from '@storybook/react';
import BottomLineTextFieldCount, { CountBottomLineTextFieldProps } from './CountBottomLineTextField';

export default {
  title: 'Components/BottomLineTextFieldCount',
  component: BottomLineTextFieldCount,
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
} as Meta;

const Template: StoryFn<CountBottomLineTextFieldProps> = (args) => <BottomLineTextFieldCount {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '이메일',
  labelClassName: 'text-sm',
  onChange: () => {},
  LabelColor: 'grey700Black',
  defaultValue: ''
};
