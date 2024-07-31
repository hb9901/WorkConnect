import { StoryFn } from '@storybook/react';
import SelectBox, { SelectBoxProps } from './SelectBox';

export default {
  title: 'Components/SelectBox',
  component: SelectBox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

const Template: StoryFn<SelectBoxProps> = (args) => <SelectBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '진행 상태',
  options: [
    { label: '진행 전', value: '진행 전 value', icon: <div>🔜</div> },
    { label: '진행 중', value: '진행 중 ', icon: <div>⏳</div> },
    { label: '완료', value: '완료 value', icon: <div>✅</div> }
  ],
  onChange: (value: string) => console.log(value)
};
