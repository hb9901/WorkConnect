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
        options: ['primary', 'grey', 'text', 'underlineText']
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
    },
    isSmall: {
      control: 'boolean',
      description: '버튼의 Height 사이즈',
      default: false
    },
    type: {
      type: 'select',
      options: ['button', 'submit', 'reset'],
      description: '버튼의 type을 지정합니다.',
      defaultValue: 'button'
    }
  }
};

export const Default = {
  args: {
    children: 'Button',
    theme: 'primary',
    isDisabled: false
  }
};

export const Primary = {
  args: {
    children: 'Button',
    theme: 'primary',
    isDisabled: false
  }
};

export const Grey = {
  args: {
    children: 'Button',
    theme: 'grey',
    isDisabled: false
  }
};

export const OutlineText = {
  args: {
    children: 'Button',
    theme: 'outline',
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

export const SmallPrimary = {
  args: {
    children: 'Button',
    theme: 'primary',
    isDisabled: false,
    isSmall: true
  }
};

export const SmallGrey = {
  args: {
    children: 'Button',
    theme: 'grey',
    isDisabled: false,
    isSmall: true
  }
};
