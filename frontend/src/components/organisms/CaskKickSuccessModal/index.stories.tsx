import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { action } from '@storybook/addon-actions';
import CashKickSuccessModal, { CashKickSuccessModalProps } from '.';

export default {
    title: 'organisms/CashKickSuccessModal',
    component: CashKickSuccessModal
} as Meta;

const Template: StoryFn<CashKickSuccessModalProps> = (args) => (
    <CashKickSuccessModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
    width: '100%',
    handleCloseButtonClick: action('Close Button Clicked'),
    handleViewButtonClick: action('View CashKick Button Click'),
    handleCrossIconClick: action('Cross Icon Click')
};
