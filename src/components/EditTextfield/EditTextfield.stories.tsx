import { StoryFn } from '@storybook/react';
import { useState } from 'react';
import EditTextfield, { EditTextfieldProps } from './EditTextfield';

export default {
  title: 'Components/EditTextfield',
  component: EditTextfield,
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

const Template: StoryFn<EditTextfieldProps> = (args) => {
  const [value, setValue] = useState(args.value);

  return <EditTextfield {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  id: 'id',
  label: 'Label',
  type: 'text',
  value: ''
};
