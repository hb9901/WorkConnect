import Tag from './Tag';

export default {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: ['high', 'medium', 'low']
      },
      description: 'Tag 테마를 지정합니다.',
      defaultValue: 'high'
    },
    children: {
      control: 'text',
      description: 'Tag 텍스트를 지정합니다.',
      defaultValue: 'High'
    }
  }
};

export const Default = {
  args: {
    children: 'Tag',
    theme: 'high'
  }
};

export const High = {
  args: {
    children: 'High',
    theme: 'high'
  }
};

export const Medium = {
  args: {
    children: 'Medium',
    theme: 'medium'
  }
};

export const Low = {
  args: {
    children: 'Low',
    theme: 'low'
  }
};
