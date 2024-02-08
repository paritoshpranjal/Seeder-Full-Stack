import React from 'react';
import Button from '.';
import { Meta, StoryFn } from '@storybook/react';
import { theme } from '../../../theme';
import { action } from '@storybook/addon-actions';
import Typography from '../Typography';

export default {
    title: 'atoms/Button',
    component: Button
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = ({ ...args }) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: (
        <Typography color={theme.palette.text.primary}>
            View cash kicks
        </Typography>
    ),
    variant: 'contained',
    sx: {
        backgroundColor: theme.palette.primary.main,
        width: '200px',
        height: '60px',
        ': hover': {
            backgroundColor: theme.palette.primary.main
        }
    },
    handleClick: action('Button Click')
};
