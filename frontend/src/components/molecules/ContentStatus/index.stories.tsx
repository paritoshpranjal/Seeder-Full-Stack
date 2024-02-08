import React from 'react';
import ContentStatus from '.';
import Warning from '../../../../public/assets/icons/warning.svg';
import { Meta, StoryFn } from '@storybook/react';
import { CONNECTION_STATUS,CONNECTION_MESSAGE,RETRY } from '../../../utils/constant';

export default {
    title: 'molecules/ContentStatus',
    component: ContentStatus
} as Meta<typeof ContentStatus>;

const Template: StoryFn<typeof ContentStatus> = ({ ...args }) => <ContentStatus {...args} />;

export const Default = Template.bind({});
Default.args = {
   imgSrc:Warning,
   connectionStatus:CONNECTION_STATUS,
   message:CONNECTION_MESSAGE,
   buttonText:RETRY
};
