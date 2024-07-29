import Label from './Label';

export default {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '텍스트를 지정합니다.'
    },
    color: {
      control: 'select',
      description: '텍스트의 색상을 지정합니다.',
      options: ['primary200Main', 'grey700Black', 'error']
    },
    htmlFor: {
      control: 'text',
      description: 'label의 htmlFor를 지정합니다'
    },
    className: {
      control: 'text',
      description: '기타 css 속성을 지정합니다'
    }
  }
};

export const Primary = {
  args: {
    children: 'Primary Label',
    color: 'primary200Main'
  }
};

export const Grey = {
  args: {
    children: 'Grey Label',
    color: 'grey700Black'
  }
};

export const Error = {
  args: {
    children: 'Error Label',
    color: 'error'
  }
};
