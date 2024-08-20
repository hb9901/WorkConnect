import { useState } from 'react';
import MemberCard, { MemberCardProps } from './MemberCard';

export default {
  title: 'Components/MemberCard',
  component: MemberCard,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: '팀원의 이름을 지정합니다.'
    },
    position: {
      control: 'text',
      description: '팀원의 직책을 지정합니다.'
    },
    status: {
      control: 'text',
      description: '팀원의 상태 (예: 온라인, 오프라인)를 지정합니다.'
    },
    icon: {
      control: 'element',
      description: '팀원 아이콘을 지정합니다.'
    },
    checked: {
      control: 'boolean',
      description: '체크박스 체크 여부를 지정합니다.'
    },
    onToggle: {
      action: 'toggled',
      description: '체크박스를 클릭했을 때 호출되는 함수를 지정합니다.'
    }
  }
};

export const MemberCardStory = (args: MemberCardProps) => {
  const [checked, setChecked] = useState(args.checked);

  const handleToggle = () => {
    setChecked((prev) => !prev);
  };

  return (
    <MemberCard
      name="이름"
      position="프론트엔드 개발자"
      status="온라인"
      checked={args.checked}
      onToggle={handleToggle}
    />
  );
};
