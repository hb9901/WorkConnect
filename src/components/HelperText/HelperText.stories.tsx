import { StoryFn } from '@storybook/react';
import HelperText, { HelperTextProps } from './HelperText';

export default {
  title: 'Components/HelperText',
  component: HelperText,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

const Template: StoryFn<HelperTextProps> = (args) => <HelperText {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: '이것은 기본 메시지입니다.'
};

export const Success = Template.bind({});
Success.args = {
  message: '성공적으로 완료되었습니다!',
  isSuccess: true
};

export const Error = Template.bind({});
Error.args = {
  message: '오류가 발생했습니다.',
  isError: true
};

export const NoMessage = Template.bind({});
NoMessage.args = {
  message: ''
};
