import React from 'react';

import  OneTriItems  from '../../src/components/OneTriItems';

export default {
  title: 'OneTriItems',
  component: OneTriItems,
  argTypes: { 
    deleteData: { action: 'deleteData' },
    updateData: { action: 'updateData' }
  },
};

const Template = (args) => <OneTriItems {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  info: {name: 'Name', value: 'Value', description: 'Description'},
};