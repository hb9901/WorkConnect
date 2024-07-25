import { StoryFn } from '@storybook/react';
import Button from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: ['primary200', 'primary300', 'grey50', 'grey200', 'text', 'underlineText']
      },
      description: '버튼 테마',
      defaultValue: 'primary200'
    },
    children: {
      control: 'text',
      description: '버튼 텍스트를 지정합니다.',
      defaultValue: 'icon'
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 이벤트'
    },
    isDisabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
      defaultValue: true
    }
  },
  decorators: [
    (Story: StoryFn) => (
      <div style={{ width: '360px' }}>
        <Story />
      </div>
    )
  ]
};

export const Default = {
  args: {
    children: 'Button',
    theme: 'primary200',
    isDisabled: false
  }
};

export const Primary200 = {
  args: {
    children: 'Button',
    theme: 'primary200',
    isDisabled: false
  }
};

export const Primary300 = {
  args: {
    children: 'Button',
    theme: 'primary300',
    isDisabled: false
  }
};

export const Grey50 = {
  args: {
    children: 'Button',
    theme: 'grey50',
    isDisabled: false
  }
};

export const Grey200 = {
  args: {
    children: 'Button',
    theme: 'grey200',
    isDisabled: false
  }
};

export const Text = {
  args: {
    children: 'Button',
    theme: 'text',
    isDisabled: false
  }
};

export const UnderlineText = {
  args: {
    children: 'Button',
    theme: 'underlineText',
    isDisabled: false
  }
};
