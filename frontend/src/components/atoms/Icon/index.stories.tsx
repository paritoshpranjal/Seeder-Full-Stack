import Icon from '.';
import Google from '../../../../public/assets/icons/google.svg';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'atoms/Icon',
    component: Icon
} satisfies Meta<typeof Icon>;

type Story = StoryObj<typeof meta>;

export const GoogleIcon: Story = {
    args: {
        src: Google,
        alt: 'Google Icon',
        style: {
            height: '50px',
            width: '50px'
        }
    }
};

export default meta;
