import { NavigationBar, Tab, TabProps } from './NavigationBar';

export default {
  title: 'Components/NavigationBar',
  component: NavigationBar,
  subcomponents: { Tab },
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'Tab 컴포넌트만 들어갈 수 있습니다.'
    },
    active: {
      control: 'boolean',
      description: '현재 활성화된 탭을 설정합니다.'
    },
    className: {
      control: 'text',
      description: '추가적인 CSS 클래스를 지정합니다.'
    }
  }
};

export const Default = (args: TabProps) => {
  return (
    <NavigationBar>
      <Tab {...args} active={!args.active == true}>
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.5 22V12H15.5V22M3.5 9L12.5 2L21.5 9V20C21.5 20.5304 21.2893 21.0391 20.9142 21.4142C20.5391 21.7893 20.0304 22 19.5 22H5.5C4.96957 22 4.46086 21.7893 4.08579 21.4142C3.71071 21.0391 3.5 20.5304 3.5 20V9Z"
            stroke={!args.active ? '#7173FA' : '#5C6275'}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        홈
      </Tab>
      <Tab {...args} active={args.active}>
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M21.5 11.5C21.5034 12.8199 21.1951 14.1219 20.6 15.3C19.8944 16.7118 18.8098 17.8992 17.4674 18.7293C16.1251 19.5594 14.5782 19.9994 13 20C11.6801 20.0035 10.3781 19.6951 9.2 19.1L3.5 21L5.4 15.3C4.80493 14.1219 4.49656 12.8199 4.5 11.5C4.50061 9.92179 4.94061 8.37488 5.77072 7.03258C6.60083 5.69028 7.78825 4.6056 9.2 3.90003C10.3781 3.30496 11.6801 2.99659 13 3.00003H13.5C15.5843 3.11502 17.553 3.99479 19.0291 5.47089C20.5052 6.94699 21.385 8.91568 21.5 11V11.5Z"
            stroke={args.active ? '#7173FA' : '#5C6275'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        채팅
      </Tab>
      <Tab {...args}>
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.5 17H4.5C3.96957 17 3.46086 16.7893 3.08579 16.4142C2.71071 16.0391 2.5 15.5304 2.5 15V5C2.5 4.46957 2.71071 3.96086 3.08579 3.58579C3.46086 3.21071 3.96957 3 4.5 3H20.5C21.0304 3 21.5391 3.21071 21.9142 3.58579C22.2893 3.96086 22.5 4.46957 22.5 5V15C22.5 15.5304 22.2893 16.0391 21.9142 16.4142C21.5391 16.7893 21.0304 17 20.5 17H19.5M12.5 15L17.5 21H7.5L12.5 15Z"
            stroke="#5C6275"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        화상회의
      </Tab>
      <Tab {...args}>
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16.5 2V6M8.5 2V6M3.5 10H21.5M5.5 4H19.5C20.6046 4 21.5 4.89543 21.5 6V20C21.5 21.1046 20.6046 22 19.5 22H5.5C4.39543 22 3.5 21.1046 3.5 20V6C3.5 4.89543 4.39543 4 5.5 4Z"
            stroke="#5C6275"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        일정
      </Tab>
      <Tab {...args}>
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.5 21V19C20.5 17.9391 20.0786 16.9217 19.3284 16.1716C18.5783 15.4214 17.5609 15 16.5 15H8.5C7.43913 15 6.42172 15.4214 5.67157 16.1716C4.92143 16.9217 4.5 17.9391 4.5 19V21M16.5 7C16.5 9.20914 14.7091 11 12.5 11C10.2909 11 8.5 9.20914 8.5 7C8.5 4.79086 10.2909 3 12.5 3C14.7091 3 16.5 4.79086 16.5 7Z"
            stroke="#5C6275"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        마이페이지
      </Tab>
    </NavigationBar>
  );
};

Default.args = {
  // active: false
};
