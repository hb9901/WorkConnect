import { StoryFn } from '@storybook/react';
import MemberCard, { MemberCardProps } from './MemberCard';

export default {
  title: 'Components/MemberCard',
  component: MemberCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

const Template: StoryFn<MemberCardProps> = (args) => <MemberCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'Name',
  position: 'Position',
  status: 'Status',
  icon: <div>👤</div>,
  children: <div>⚪</div>
};
