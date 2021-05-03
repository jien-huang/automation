import React from 'react';

import  FourPartsHeader  from '../../src/components/FourPartsHeader';

export default {
  title: 'FourPartsHeader',
  component: FourPartsHeader
};

const Template = (args) => <FourPartsHeader {...args} />;

export const Suite = Template.bind({});
Suite.args = {
  primary: true,
  label: 'FourPartsHeader',
};

export const Case = Template.bind({});
Case.args = {
  label: 'FourPartsHeader',
};

export const UI = Template.bind({});
UI.args = {
  size: 'large',
  label: 'FourPartsHeader',
};

export const Data = Template.bind({});
Data.args = {
  size: 'small',
  label: 'FourPartsHeader',
};
