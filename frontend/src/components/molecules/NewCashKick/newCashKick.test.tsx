import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewCashKickCard from '.';

describe('NewCashKick Card Component', () => {
    test('it should render typography component correctly when user have balance', () => {
        render(
            <NewCashKickCard
                credit={11111}
                haveBalance={true}
                disabled={false}
            />
        );
        const headerElement = screen.getByText('Launch a new CashKick');
        const buttonTextElement = screen.getByText('New Cash Kick');
        expect(headerElement).toBeInTheDocument();
        expect(buttonTextElement).toBeInTheDocument();
    });

    test('it should render typography component correctly when user does not have balance', () => {
        render(
            <NewCashKickCard
                credit={11111}
                haveBalance={false}
                disabled={false}
            />
        );
        const headerElement = screen.getByText(
            '100% provided credit limit utilized'
        );
        const buttonTextElement = screen.getByText('Request Credit Increase');
        expect(headerElement).toBeInTheDocument();
        expect(buttonTextElement).toBeInTheDocument();
    });

    test('it should render enable state of button and onclick correctly', () => {
        const mockButtonClick = jest.fn();
        render(
            <NewCashKickCard
                credit={11111}
                haveBalance={false}
                disabled={false}
                onClick={mockButtonClick}
            />
        );
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeEnabled();
        fireEvent.click(buttonElement);
        expect(buttonElement).toBeInTheDocument();
    });

    test('it should render disable state of button', () => {
        render(
            <NewCashKickCard
                credit={11111}
                haveBalance={false}
                disabled={true}
            />
        );
        const buttonElement = screen.getByRole('button');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toBeDisabled();
    });
});
