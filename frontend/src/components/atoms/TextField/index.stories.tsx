import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import TextField from '.';
import { action } from '@storybook/addon-actions';
import { IconButton, InputAdornment } from '@mui/material';
import Icon from '../Icon';
import SMILE from '../../../../public/assets/icons/smile.svg';
import LOCK from '../../../../public/assets/icons/lock.svg';
import NOTIFICATION from '../../../../public/assets/icons/notification.svg';
import VisibilityOffIcon from '../../../../public/assets/icons/visibilityOff.svg';

export default {
    title: 'Atoms/TextField',
    component: TextField
} as Meta<typeof TextField>;

const Template: StoryFn<typeof TextField> = (args) => <TextField {...args} />;

export const TextFields = Template.bind({});
TextFields.args = {
    placeholder: 'Your Name',
    variant: 'outlined',
    onChange: action('onChange event'),
    style: {
        width: '100%'
    },
    InputProps: {
        startAdornment: (
            <InputAdornment position="start">
                <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    data-testid="toggle-show-password-button"
                >
                    <Icon src={SMILE} alt={''} />
                </IconButton>
            </InputAdornment>
        )
    }
};

export const PasswordVisibleTextField = Template.bind({});
PasswordVisibleTextField.args = {
    placeholder: 'Password',
    variant: 'outlined',
    onChange: action('onChange event'),
    style: {
        width: '100%'
    },
    InputProps: {
        startAdornment: (
            <InputAdornment position="start">
                <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    data-testid="toggle-show-password-button"
                >
                    <Icon src={LOCK} alt={''} />
                </IconButton>
            </InputAdornment>
        ),
        endAdornment: (
            <InputAdornment position="start">
                <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    data-testid="toggle-show-password-button"
                >
                    <Icon src={VisibilityOffIcon} alt={''} />
                </IconButton>
            </InputAdornment>
        )
    }
};

export const Email = Template.bind({});
Email.args = {
    placeholder: 'Email Address',
    variant: 'outlined',
    onChange: action('onChange event'),
    style: {
        width: '100%'
    },
    InputProps: {
        startAdornment: (
            <InputAdornment position="start">
                <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    data-testid="toggle-show-password-button"
                >
                    <Icon src={NOTIFICATION} alt={''} />
                </IconButton>
            </InputAdornment>
        )
    }
};
