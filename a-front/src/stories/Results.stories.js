import React from 'react';
import Results from '../../src/components/Results';
import { worker, result, config } from '../../src/mocks/handlers';


export default {
    title: 'Results',
    Component: Results
}

const Template = (args) => {
    worker.resetHandlers(...result);
    return (
        <Results {...args}></Results>
    )
}
export const Simple = Template.bind({});

const Error_Template = (args) => {
    worker.resetHandlers(...config)
    
    return (
        <Results {...args}></Results>
    )
}

export const Error = Error_Template.bind({});

