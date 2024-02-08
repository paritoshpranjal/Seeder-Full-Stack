import React from 'react';
import Header from '.';
import Typography from '../../atoms/Typography';
import { theme } from '../../../theme';
import { Meta, StoryFn } from '@storybook/react';
import { CASH_ACCELERATION, CREATE_NEW_CASH_KICK } from '../../../utils/constant';

export default {
    title: 'molecules/Header',
    component: Header
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = ({ ...args }) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
    heading:<Typography variant='title' color={theme.palette.text.primary}>{CASH_ACCELERATION}</Typography>,
    message:CREATE_NEW_CASH_KICK
};
