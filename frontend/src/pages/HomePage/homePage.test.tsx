import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomePage from '.';
import * as services from '../../services/calls/index';

jest.mock('../../services/calls/index', () => ({
    fetchTransaction: jest.fn()
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

jest.mock('axios');

describe('HomePage', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should render correctly', async () => {
        const mockTransactionData: {
            id: number;
            dueDate: string;
            transactionAmount: number;
        }[] = [
            {
                id: 1,
                dueDate: '2023-12-13',
                transactionAmount: 170454
            }
        ];
        const getTransactionDataMock = jest.spyOn(services, 'fetchTransaction');
        getTransactionDataMock.mockResolvedValue({
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: {} as any },
            data: mockTransactionData
        });

        render(<HomePage />);

        await waitFor(() => {
            const buttonElement = screen.getByText('New Cash Kick');
            expect(buttonElement).toBeDefined();
        });
    });

    test('handles API error gracefully', async () => {
        jest.spyOn(services, 'fetchTransaction').mockRejectedValue(
            new Error('Internal Server Error')
        );

        render(<HomePage />);
        await waitFor(() => {
            expect(console.error).toHaveBeenCalled();
        });
    }, 10000);

    test('it should render use navigate when we click ', async () => {
        const mockTransactionData = [
            {
                id: 1,
                paymentDate: '2023-12-13',
                transactionAmount: 170454
            }
        ];

        const getTransactionDataMock = jest.spyOn(services, 'fetchTransaction');
        getTransactionDataMock.mockResolvedValue({
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: {} as any },
            data: mockTransactionData
        });

        render(<HomePage />);

        await waitFor(() => {
            const buttonElement = screen.getByText('New Cash Kick');
            fireEvent.click(buttonElement);
            expect(mockNavigate).toHaveBeenCalledWith('/new-cash-kick');
        });
    });
});
