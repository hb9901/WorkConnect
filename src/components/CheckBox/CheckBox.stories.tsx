import React from 'react';
import CheckBox from './CheckBox';

export default {
  title: 'Components/CheckBox',
  component: CheckBox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
};

export const Checkbox = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <CheckBox
      theme="primary200"
      onClick={(newChecked) => setChecked(newChecked)}
      children={checked ? 'Checked' : 'Unchecked'}
    />
  );
};
