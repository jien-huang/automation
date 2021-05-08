import React from 'react';
import { Meta } from "@storybook/react";
import OneResult from '../../src/components/OneResult';
import { worker, result } from '../../src/mocks/handlers';
import { MemoryRouter, Route } from "react-router-dom";

export default {
    title: 'OneResult',
    component: OneResult,
    
};

// This is a good example how to pass useParams to storybook!

const Template = (args) => {
    worker.resetHandlers(...result);
    return (
        <MemoryRouter initialEntries={["/v1/results/oneResult/1"]}>
            <Route component={(routerProps) => <OneResult {...routerProps} />}
                path="/v1/results/oneResult/:id" />
        </MemoryRouter>
    )
}

export const Simple = Template.bind({})
Simple.args = {}