import { Tab, TabProps, Tabs } from './Tabs';

export default {
  title: 'Components/Tabs',
  component: Tabs,
  subcomponents: { Tab },
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Tab 컴포넌트만 들어갈 수 있습니다.'
    },
    active: {
      control: 'boolean',
      description: 'Tab의 활성화 상태를 지정합니다.'
    },
    className: {
      control: 'text',
      description: 'Tab의 추가적인 CSS 클래스를 지정합니다.'
    },
    as: {
      control: 'text',
      description: 'Tab의 HTML 태그를 지정합니다.'
    },
    onClick: {
      action: 'clicked',
      description: 'Tab 클릭 시 호출되는 함수입니다.'
    }
  }
};

export const Default = (args: TabProps) => (
  <Tabs {...args}>
    <Tab {...args} active>
      사진・동영상
    </Tab>
    <Tab {...args}>파일</Tab>
    <Tab {...args}>공지</Tab>
  </Tabs>
);

Default.args = {};
