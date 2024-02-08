import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import LoginTemplate, { LoginTemplateProps } from '.';
import loginPanel from '../../../../public/assets/images/login-panel.png';
import Login from '../../organisms/Login';
import { Box } from '@mui/material';
import { MemoryRouter } from 'react-router-dom';

export default {
    title: 'templates/LoginTemplate',
    component: LoginTemplate
} as Meta;

const Template: StoryFn<LoginTemplateProps> = (args) => (
    <MemoryRouter>
        <LoginTemplate {...args} />
    </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
    imageSrc: loginPanel,
    bodyNode: (
        <Box marginTop={'5rem'}>
            <Login />
        </Box>
    )
};
