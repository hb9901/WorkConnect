import Typography from '../Typography';
import NavigationBarComponent, { TabProps } from './NavigationBar';
const { NavigationBar, Tab } = NavigationBarComponent;

export default {
  title: 'Components/NavigationBar',
  component: NavigationBar,
  subcomponents: { Tab },
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Tab 컴포넌트만 들어갈 수 있습니다.'
    }
  }
};

export const Default = (args: TabProps) => {
  return (
    <NavigationBar {...args}>
      <Tab {...args} active>
        <Typography variant="Subtitle14px" className="whitespace-nowrap">
          홈
        </Typography>
      </Tab>
      <Tab {...args}>
        <Typography variant="Subtitle14px" className="whitespace-nowrap">
          채팅
        </Typography>
      </Tab>
      <Tab {...args}>
        <Typography variant="Subtitle14px" className="whitespace-nowrap">
          화상
        </Typography>
      </Tab>
      <Tab {...args}>
        <Typography variant="Subtitle14px" className="whitespace-nowrap">
          마이페이지
        </Typography>
      </Tab>
    </NavigationBar>
  );
};

Default.args = {};
