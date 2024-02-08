import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import SuccessCard, { SuccessCardProps } from '.';

export default {
    title: 'molecules/SuccessCard',
    component: SuccessCard
} as Meta;

const Template: StoryFn<SuccessCardProps> = (args) => <SuccessCard {...args} />;

export const ResetEmail = Template.bind({});
ResetEmail.args = {
    width: '434px',
    displayEmail: true,
    email: 'your@example.com'
};

export const Password = Template.bind({});
Password.args = {
    width: '434px',
    displayEmail: false
};
