import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import ChangePassword from '.';

export default {
    title: 'organisms/ChangePassword',
    component: ChangePassword
} as Meta;

const Template: StoryFn<typeof ChangePassword> = (args) => (
    <ChangePassword {...args} />
);

export const Default = Template.bind({});
Default.args = {
    onLoginClick: action('Login Clicked')
};
