import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import SignUp from '.';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';

export default {
    title: 'organisms/SignUp',
    component: SignUp
} as Meta;

const Template: StoryFn<typeof SignUp> = (args) => (
    <MemoryRouter>
        <SignUp {...args} />
    </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
    onGoogleLoginClick: action('Google Icon Click'),
};
