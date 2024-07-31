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
        options: ['primary200Main', 'grey700Black', 'error']
      }
    }
  }
};

const Template: StoryFn<BottomTextFieldProps> = (args) => {
  const [value, setValue] = useState(args.value);
  return <BottomLineTextField {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  id: 'id',
  label: 'Label',
  type: 'text',
  value: ''
};
