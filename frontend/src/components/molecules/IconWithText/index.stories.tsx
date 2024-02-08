import React from 'react';
import IconWithText from '.';
import { Meta, StoryFn } from '@storybook/react';
import Home from '../../../../public/assets/icons/home.svg';

export default {
    title: 'molecules/IconWithText',
    component: IconWithText
} as Meta<typeof IconWithText>;

const Template: StoryFn<typeof IconWithText> = ({ ...args }) => <IconWithText {...args} />;

export const Default = Template.bind({});
Default.args = {
    src:Home,
    text:"Home",
    alt:"home-page",
    isClicked:false,
};
