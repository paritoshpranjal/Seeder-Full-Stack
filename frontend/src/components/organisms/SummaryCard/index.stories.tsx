
import React from 'react';
import SummaryCard from '.';
import { Meta, StoryFn } from '@storybook/react';


export default {
    title: 'organisms/SummaryCard',
    component: SummaryCard
} as Meta<typeof SummaryCard>;

const Template: StoryFn<typeof SummaryCard> = ({ ...args }) => <SummaryCard {...args} />;

export const Default = Template.bind({});
Default.args={
    summaryType:"review",
    selectedContracts:2,
    maximumAmount:880000,
    selectedAmount:0,
};
