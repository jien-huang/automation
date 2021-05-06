import React from 'react';

import FourPartsHeader from '../../src/components/FourPartsHeader';

export default {
  title: 'FourPartsHeader',
  component: FourPartsHeader
};

const Template = (args) => <FourPartsHeader {...args} />;

export const Suite = Template.bind({});
Suite.args = {
  info: {
    meata: { name: 'login_test_pass', path: 'suite/login_test_pass.yml', lastUpdated: '2021-05-13 08:26:00' },
    default: { url: 'http://newtours.demoaut.com', password: 'test' },
    input: ['user_test'],
    output: ['result']
  }
};

export const Case = Template.bind({});
Case.args = {
  info: {
    meata: { name: 'login', path: 'case/login.yml', lastUpdated: '2021-05-13 08:20:00' },
    default: { username: 'test', password: 'test' },
    input: ['username', 'password'],
    output: ['result']
  }
};

export const UI = Template.bind({});
UI.args = {
  info: {
    meata: { name: 'login', path: 'ui/login.yml', lastUpdated: '2021-05-13 08:17:00' },
    default: { username: 'user', password: 'pass' },
    input: [],
    output: []
  }
};

export const Data = Template.bind({});
Data.args = {
  info: {
    meata: { name: 'user_test', path: 'data/user_test.yml', lastUpdated: '2021-05-13 08:15:00' },
    default: { username: 'test', password: 'test' },
    input: [],
    output: []
  }
};
