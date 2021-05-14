import React from 'react';
import TestTree from '../../src/components/TestTree';
import {worker, tests} from '../../src/mocks/handlers';

worker.use(...tests);

export default {
    title: 'TestTree',
    Component: TestTree,
    argTypes: {
        parentCallback: {action: 'parentCallback'}
    }
}

const Template = (args) => <TestTree {...args} />

export const Simple = Template.bind({});
Simple.args ={}