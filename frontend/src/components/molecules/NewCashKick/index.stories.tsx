import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import NewCashKickCard, { NewCashKickProps } from '.';

export default {
    title: 'molecules/NewCashKickCard',
    component: NewCashKickCard
} as Meta;

const Template: StoryFn<NewCashKickProps> = (args) => (
    <NewCashKickCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
    credit: 11111,
    haveBalance: true,
    disabled: false,
    onClick: action('New CashKick Card clicked')
};

export const NoBalance = Template.bind({});
NoBalance.args = {
    haveBalance: false,
    disabled: false,
    onClick: action('New CashKick Card clicked')
};

export const DisableState = Template.bind({});
DisableState.args = {
    credit: 121,
    haveBalance: true,
    disabled: true
};
