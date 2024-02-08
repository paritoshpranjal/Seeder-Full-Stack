import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SuccessCard from '.';

describe('Success Card Component', () => {
    test('should render success card when email is there ', () => {
        render(
            <SuccessCard
                width={'434px'}
                displayEmail={true}
                email="you@gmail.com"
            />
        );
        expect(screen.getByText('Reset email sent')).toBeInTheDocument();
    });

    test('should render success card when email is there ', () => {
        render(
            <SuccessCard
                width={'434px'}
                displayEmail={false}
                email="you@gmail.com"
            />
        );
        expect(
            screen.getByText('Password reset successful')
        ).toBeInTheDocument();
        expect(
            screen.getByText('Click on button below to proceed to login')
        ).toBeInTheDocument();
    });
});
