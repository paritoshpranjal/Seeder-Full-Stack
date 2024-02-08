import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import ForgotPassword from '.';

export default {
    title: 'organisms/ForgotPassword',
    component: ForgotPassword
} as Meta;

const Template: StoryFn<typeof ForgotPassword> = (args) => (
    <ForgotPassword {...args} />
);

export const Default = Template.bind({});
Default.args = {
    onLoginClick: action('Login Click'),
    onContinueClick: action('Continue Click')
};
