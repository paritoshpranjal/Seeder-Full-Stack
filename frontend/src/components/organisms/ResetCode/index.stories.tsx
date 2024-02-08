import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import ResetPassword from '.';
import { action } from '@storybook/addon-actions';
import { MemoryRouter } from 'react-router-dom';

export default {
    title: 'organisms/ResetPassword',
    component: ResetPassword
} as Meta;

const Template: StoryFn<typeof ResetPassword> = (args) => (
    <MemoryRouter>
        <ResetPassword {...args} />
    </MemoryRouter>
);

export const ResetPasswordOrganism = Template.bind({});
ResetPasswordOrganism.args = {
    handleButtonClick: action('Button Clicked')
};
