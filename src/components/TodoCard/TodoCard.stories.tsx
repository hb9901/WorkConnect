import { StoryFn } from '@storybook/react';
import Tag from '../Tag';
import TodoCard, { TodoCardProps } from './TodoCard';

export default {
  title: 'Components/TodoCard',
  component: TodoCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

const Template: StoryFn<TodoCardProps> = (args) => <TodoCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  subtitle: '시간 | 장소',
  tag: <Tag theme="high">High</Tag>,
  onClick: () => alert('clicked')
};
