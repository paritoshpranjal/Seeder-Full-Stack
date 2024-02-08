import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { CongratulationCard } from '.';

export default {
    title: 'Molecules/CongratulationCard',
    component: CongratulationCard
} as Meta;

const Template: StoryFn<typeof CongratulationCard> = (args) => (
    <CongratulationCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
    buttonName: 'Learn More',
    description:
        'You are approved for funding. We are ready to advance you upto',
    headingSentence: 'Congratulations you are ready to start!',
    amount: '$8.8M'
};
