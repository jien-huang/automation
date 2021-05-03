import React from 'react';

import  FourPartsHeader  from '../../src/components/FourPartsHeader';

export default {
  title: 'FourPartsHeader',
  component: FourPartsHeader,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <FourPartsHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'FourPartsHeader',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'FourPartsHeader',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'FourPartsHeader',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'FourPartsHeader',
};
