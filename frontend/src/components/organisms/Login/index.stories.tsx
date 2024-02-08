import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import Login from '.';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';

export default {
    title: 'organisms/Login',
    component: Login
} as Meta;

const Template: StoryFn<typeof Login> = (args) => (
    <MemoryRouter>
        <Login {...args} />
    </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
    onForgotClick: action('Forgot Clicked'),
    onGoogleLoginClick: action('Google Icon Click'),
    onSignupClick: action('Signup Click')
};
