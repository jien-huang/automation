import React from 'react';
import { setupWorker } from 'msw';
import Results from '../../src/components/Results'

if (typeof global.process === 'undefined') {
    const { result } = require('../../src/mocks/handlers');
    const worker = setupWorker(...result);
    worker.start();
  }

export default {
    title: 'Results',
    Component: Results
}

const Template = (args) => <Results {...args}></Results>

export const Simple = Template.bind({});
Simple.args = {

}
