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
        options: ['High', 'Medium', 'Low']
      },
      description: 'Tag 테마를 지정합니다.',
      defaultValue: 'High'
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
    theme: 'High'
  }
};

export const High = {
  args: {
    children: 'High',
    theme: 'High'
  }
};

export const Medium = {
  args: {
    children: 'Medium',
    theme: 'Medium'
  }
};

export const Low = {
  args: {
    children: 'Low',
    theme: 'Low'
  }
};
