import { StoryFn } from '@storybook/react';
import SelectBox, { SelectBoxProps } from './SelectBox';

export default {
  title: 'Components/SelectBox',
  component: SelectBox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'SelectBox의 레이블 텍스트를 지정합니다.'
    },
    options: {
      control: 'object',
      description: 'SelectBox의 옵션을 지정합니다.'
    },
    onChange: {
      action: 'changed',
      description: 'SelectBox의 변경 이벤트를 지정합니다.'
    }
  }
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
