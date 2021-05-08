import React from 'react';
import { setupWorker } from 'msw';
import {Configuration} from '../../src/components/Configuration'
import {worker, config} from '../../src/mocks/handlers';


// worker.stop();
// if (!global.process) {
//     worker.start();
// }
 worker.use(...config);

  

  export default {
    title: 'Configuration',
    Component: Configuration
}

const Template = (args) => <Configuration {...args} />

export const Simple = Template.bind({});
Simple.args = {

}