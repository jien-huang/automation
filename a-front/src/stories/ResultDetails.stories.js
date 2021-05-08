import React from 'react';
import ResultDetails from '../../src/components/ResultDetails';


export default {
    title: 'ResultDetails',
    component: ResultDetails
}

const Template = (args) => <ResultDetails {...args} />

export const Simple = Template.bind({})
Simple.args = {
    info: [
        { "id": "6", "name": "main1.suite", "time_stamp": "2021-05-08 10:26:21", "content": "Login OK", "result": "Success" },
        {
            "id": "7", "name": "main2.suite", "time_stamp": "2021-05-08 10:26:21", "result": "Success", "content":
                [
                    { "id": "8", "name": "main3.suite", "time_stamp": "2021-05-08 10:26:21", "content": "Book Ticket", "result": "Success" },
                    { "id": "9", "name": "main4.suite", "time_stamp": "2021-05-08 10:26:21", "content": "Validate", "result": "Success" }
                ]
        }
    ]
};

export const Simpler = Template.bind({})
Simpler.args = {
    info: { "id": "6", "name": "main1.suite", "time_stamp": "2021-05-08 10:26:21", "content": "Login OK", "result": "Success" }
};