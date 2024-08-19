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
    labelColor: {
      control: {
        type: 'select',
        options: ['primary200Main', 'grey700Black', 'error']
      }
    }
  }
};

const Template: StoryFn<EditTextFieldProps> = (args) => {
  const [value, setValue] = useState(args.value);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return <EditTextField {...args} value={value} onChange={handleChange} />;
};

export const Default = Template.bind({});
Default.args = {
  id: 'id',
  label: 'Label',
  type: 'text',
  value: '',
  labelColor: 'grey400'
};
