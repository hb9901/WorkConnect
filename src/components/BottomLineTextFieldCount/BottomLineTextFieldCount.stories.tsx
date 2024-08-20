import { StoryFn } from '@storybook/react';
import BottomLineTextFieldCount, { BottomLineTextFieldCountProps } from './BottomLineTextFieldCount';

export default {
  title: 'Components/BottomLineTextFieldCount',
  component: BottomLineTextFieldCount,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: 'text',
      description: 'Input의 id를 지정합니다.'
    },
    labelClassName: {
      control: 'text',
      description: 'Label의 className을 지정합니다.'
    },
    onChange: {
      action: 'changed',
      description: '입력값 변경 이벤트를 처리합니다.'
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 이벤트를 처리합니다.'
    },
    labelColor: {
      control: 'select',
      description: 'Label의 색상을 지정합니다.',
      options: ['primary200Main', 'grey400', 'grey700Black', 'error']
    },
    label: {
      control: 'text',
      description: 'Label의 텍스트를 지정합니다.'
    },
    placeholder: {
      control: 'text',
      description: 'Input의 플레이스홀더 텍스트를 지정합니다.'
    },
    type: {
      control: 'select',
      description: 'input의 type을 지정합니다.',
      options: ['text', 'password', 'email', 'number']
    },
    defaultValue: {
      control: 'text',
      description: 'Input의 기본값을 지정합니다.'
    }
  }
};

const Template: StoryFn<BottomLineTextFieldCountProps> = (args) => <BottomLineTextFieldCount {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '이메일',
  placeholder: '이메일을 입력해주세요.',
  onChange: () => {},
  labelColor: 'grey700Black',
  defaultValue: ''
};

export const PasswordField = Template.bind({});
PasswordField.args = {
  label: '비밀번호',
  placeholder: '비밀번호를 입력해주세요.',
  onChange: () => {},
  labelColor: 'primary200Main',
  defaultValue: '',
  type: 'password'
};
