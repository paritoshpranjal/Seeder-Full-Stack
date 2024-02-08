import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import PaymentCard, { PaymentCardProps } from '.';
import dataBlock from '../../../../public/assets/icons/dataBlock.svg';
import circularProgress from '../../../../public/assets/icons/circularProgress.svg';
import { paymentCard } from '../../../utils/constant';

export default {
    title: 'molecules/PaymentCard',
    component: PaymentCard
} as Meta;

const Template: StoryFn<PaymentCardProps> = (args) => <PaymentCard {...args} />;

export const DueAmount = Template.bind({});
DueAmount.args = {
    dueDate: 'Due in 30 day(s)',
    dueDateState: true,
    iconSrc: dataBlock,
    iconAlt: 'data-block',
    footerText: paymentCard.date,
    amount: 1111
};

export const OutstandingAmount = Template.bind({});
OutstandingAmount.args = {
    dueDateState: false,
    iconSrc: circularProgress,
    iconAlt: 'outstanding-icon',
    footerText: paymentCard.outstandingAmount,
    amount: 11111
};
