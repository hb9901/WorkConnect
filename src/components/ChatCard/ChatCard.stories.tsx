import { StoryFn } from '@storybook/react';
import ChatCard, { ChatCardProps } from './ChatCard';

export default {
  title: 'Components/ChatCard',
  component: ChatCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

const Template: StoryFn<ChatCardProps> = (args) => <ChatCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  icon: <div className="flex w-10 h-10 bg-gray-400 rounded-full items-center justify-center" />,
  name: 'Name',
  status: '🌴 휴가중',
  date: '2024-07-31',
  message: '메시지 미리보기',
  unreadCount: 1,
  pin: <div>📌</div>
};
