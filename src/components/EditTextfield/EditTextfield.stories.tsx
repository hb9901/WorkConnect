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
    label: {
      control: 'text',
      description: 'Label'
    },
    value: {
      control: 'text',
      description: '입력 필드의 현재 값'
    },
    LabelColor: {
      control: {
        type: 'select',
        options: ['primary200Main', 'grey400', 'grey700Black', 'error']
      },
      description: '라벨 색상'
    },
    onChange: {
      action: 'changed',
      description: '입력 필드의 값이 변경될 때 호출되는 함수'
    },
    onClick: {
      action: 'iconClicked',
      description: '아이콘이 클릭될 때 호출되는 함수'
    }
  }
};

const Template: StoryFn<EditTextfieldProps> = (args) => {
  const [value, setValue] = useState(args.value);

  return <EditTextfield {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = {
  label: 'Default Label',
  value: ''
};
