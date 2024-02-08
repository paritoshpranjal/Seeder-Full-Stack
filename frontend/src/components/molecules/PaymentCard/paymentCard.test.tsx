import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaymentCard from '.';
import dataBlock from '../../../../public/assets/icons/dataBlock.svg';
import { paymentCard } from '../../../utils/constant';

describe('PaymentCard Component', () => {
    test('it should render the card correctly with true state', () => {
        render(
            <PaymentCard
                dueDateState={true}
                iconSrc={dataBlock}
                iconAlt={'data-block'}
                footerText={paymentCard.date}
                amount={11111}
            />
        );
        expect(screen.getByAltText('info-icon')).toBeInTheDocument();
    });

    test('it should render the card correctly with false state', () => {
        render(
            <PaymentCard
                dueDateState={false}
                iconSrc={dataBlock}
                iconAlt={'data-block'}
                footerText={paymentCard.date}
                amount={11111}
            />
        );
        expect(screen.getByTestId('box-id')).toBeInTheDocument();
        expect(screen.getByAltText('info-icon')).toBeInTheDocument();
    });
});
