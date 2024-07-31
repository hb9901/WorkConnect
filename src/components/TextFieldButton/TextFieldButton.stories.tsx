import { StoryFn } from '@storybook/react';
import TextFieldButton, { TextFieldButtonProps } from './TextFieldButton';

export default {
  title: 'Components/TextFieldButton',
  component: TextFieldButton,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    onClick: { action: 'clicked' }
  }
};

const Template: StoryFn<TextFieldButtonProps> = (args) => <TextFieldButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Default Label',
  value: ''
};
