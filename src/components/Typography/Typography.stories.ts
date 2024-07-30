import Typography from './Typography';

export default {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '텍스트를 지정합니다.'
    },
    color: {
      control: 'select',
      description: '텍스트의 색상을 지정합니다.',
      options: [
        'grey900',
        'grey800',
        'grey700Black',
        'grey600',
        'grey500',
        'grey400',
        'grey300',
        'grey200',
        'grey100',
        'grey50',
        'primary900',
        'primary800',
        'primary700',
        'primary600',
        'primary500',
        'primary400',
        'primary300',
        'primary200Main',
        'primary100',
        'primary50',
        'caution',
        'error',
        'information',
        'success'
      ]
    },
    as: {
      control: 'select',
      description: '텍스트의 태그를 지정합니다.',
      options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    },
    variant: {
      control: 'select',
      description: '텍스트의 크기를 지정합니다.',
      options: [
        'Title22px',
        'Title20px',
        'Title18px',
        'Title16px',
        'Title14px',
        'Subtitle18px',
        'Subtitle16px',
        'Subtitle14px',
        'Subtitle12px',
        'Body16px',
        'Body14px',
        'Body12px'
      ]
    }
  }
};

export const Title22px = {
  args: {
    children: 'Title22px 텍스트',
    variant: 'Title22px',
    color: 'black'
  }
};

export const Title20px = {
  args: {
    children: 'Title20px 텍스트',
    variant: 'Title20px',
    color: 'black'
  }
};

export const Title18px = {
  args: {
    children: 'Title18px 텍스트',
    variant: 'Title18px',
    color: 'black'
  }
};

export const Title16px = {
  args: {
    children: 'Title16px 텍스트',
    variant: 'Title16px',
    color: 'black'
  }
};

export const Title14px = {
  args: {
    children: 'Title14px 텍스트',
    variant: 'Title14px',
    color: 'black'
  }
};

export const Subtitle18px = {
  args: {
    children: 'Subtitle18px 텍스트',
    variant: 'Subtitle18px',
    color: 'black'
  }
};

export const Subtitle16px = {
  args: {
    children: 'Subtitle16px 텍스트',
    variant: 'Subtitle16px',
    color: 'black'
  }
};

export const Subtitle14px = {
  args: {
    children: 'Subtitle14px 텍스트',
    variant: 'Subtitle14px',
    color: 'black'
  }
};

export const Subtitle12px = {
  args: {
    children: 'Subtitle12px 텍스트',
    variant: 'Subtitle12px',
    color: 'black'
  }
};

export const Body16px = {
  args: {
    children: 'Body16px 텍스트',
    variant: 'Body16px',
    color: 'black'
  }
};

export const Body14px = {
  args: {
    children: 'Body14px 텍스트',
    variant: 'Body14px',
    color: 'black'
  }
};

export const Body12px = {
  args: {
    children: 'Body12px 텍스트',
    variant: 'Body12px',
    color: 'black'
  }
};
