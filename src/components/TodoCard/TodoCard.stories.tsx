import { StoryFn } from '@storybook/react';
import TodoCard, { TodoCardProps } from './TodoCard';

export default {
  title: 'Components/TodoCard',
  component: TodoCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    tag: {
      control: {
        type: 'select',
        options: ['high', 'medium', 'low']
      },
      description: 'Tag를 지정합니다.'
    }
  }
};

const Template: StoryFn<TodoCardProps> = (args) => <TodoCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  subtitle: '시간 | 장소',
  tag: 'high',
  onClick: () => alert('clicked')
};
