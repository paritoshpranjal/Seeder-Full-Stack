import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import * as services from '../../services/calls/index';
import CashAccelerationPage from '.';

jest.mock('../../services/calls/index', () => ({
    fetchCashKickContract: jest.fn(),
    fetchContracts: jest.fn(),
    fetchCashKicks: jest.fn()
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

jest.mock('axios');

describe('HomePage Component', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('it should render correctly and fetch CashKick data,Contract Data and CashKickContract data', async () => {
        render(<CashAccelerationPage />);
        const mockCashKickData: {
            id: number;
            name: string;
            maturity: string;
            totalFinanced: number;
            totalReceived: number;
            termRate: number;
            userId: number;
            status: string;
        }[] = [
            {
                name: 'My First Advance',
                status: 'Pending',
                maturity: '2023-11-21T12:02:33Z',
                totalFinanced: 199128.2384,
                totalReceived: 177793.07,
                termRate: 12,
                id: 1,
                userId: 1
            }
        ];
        const getTransactionDataMock = jest.spyOn(services, 'fetchCashKicks');
        getTransactionDataMock.mockResolvedValue({
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: {} as any },
            data: mockCashKickData
        });
        waitFor(() => {
            const contractButton = screen.getByText('My Contracts');
            fireEvent.click(contractButton);
            const mockCashContractData: {
                id: number;
                cashKickid: number;
                contractId: number;
            }[] = [
                {
                    id: 1,
                    cashKickid: 1,
                    contractId: 1
                }
            ];
            const getCCData = jest.spyOn(services, 'fetchCashKickContract');
            getCCData.mockResolvedValue({
                status: 200,
                statusText: 'OK',
                headers: {},
                config: { headers: {} as any },
                data: mockCashContractData
            });
            const mockCashKickContractData: {
                id: number;
                name: string;
                status: string;
                type: string;
                perPayment: number;
                totalFinanced: string;
                totalAvailable: number;
                termLength: number;
                termRate: number;
                paymentAmount: number;
                partialAmount: number;
            }[] = [
                {
                    id: 1,
                    name: 'Contract 1',
                    status: 'Available',
                    type: 'Monthly',
                    perPayment: 12000.25,
                    totalFinanced: '-',
                    totalAvailable: 126722.64,
                    termLength: 12,
                    termRate: 12,
                    paymentAmount: 63360,
                    partialAmount: 0
                }
            ];
            const getData = jest.spyOn(services, 'fetchContracts');
            getData.mockResolvedValue({
                status: 200,
                statusText: 'OK',
                headers: {},
                config: { headers: {} as any },
                data: mockCashKickContractData
            });
        });
    });

    test('it should handle  API error of CashKick data', async () => {
        jest.spyOn(services, 'fetchCashKicks').mockRejectedValue(
            new Error('Internal Server Error')
        );

        render(<CashAccelerationPage />);
        await waitFor(() => {
            expect(console.error).toHaveBeenCalled();
        });
    }, 10000);

    test('it should handle API error of Contract Data', async () => {
        jest.spyOn(services, 'fetchCashKickContract').mockRejectedValue(
            new Error('Internal Server Error')
        );
        render(<CashAccelerationPage />);
        const mockCashKickData: {
            id: number;
            name: string;
            maturity: string;
            totalFinanced: number;
            totalReceived: number;
            termRate: number;
            userId: number;
            status: string;
        }[] = [
            {
                name: 'My First Advance',
                status: 'Pending',
                maturity: '2023-11-21T12:02:33Z',
                totalFinanced: 199128.2384,
                totalReceived: 177793.07,
                termRate: 12,
                id: 1,
                userId: 1
            }
        ];
        const getTransactionDataMock = jest.spyOn(services, 'fetchCashKicks');
        getTransactionDataMock.mockResolvedValue({
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: {} as any },
            data: mockCashKickData
        });
        waitFor(() => {
            const contractButton = screen.getByText('My Contracts');
            fireEvent.click(contractButton);
            expect(console.error).toHaveBeenCalled();
        });
    }, 10000);

    test('it should handle API error of fetchContract', () => {
        jest.spyOn(services, 'fetchContracts').mockRejectedValue(
            new Error('Internal Server Error')
        );
        render(<CashAccelerationPage />);
        const mockCashKickData: {
            id: number;
            name: string;
            maturity: string;
            totalFinanced: number;
            totalReceived: number;
            termRate: number;
            userId: number;
            status: string;
        }[] = [
            {
                name: 'My First Advance',
                status: 'Pending',
                maturity: '2023-11-21T12:02:33Z',
                totalFinanced: 199128.2384,
                totalReceived: 177793.07,
                termRate: 12,
                id: 1,
                userId: 1
            }
        ];
        const getTransactionDataMock = jest.spyOn(services, 'fetchCashKicks');
        getTransactionDataMock.mockResolvedValue({
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: {} as any },
            data: mockCashKickData
        });
        waitFor(() => {
            const contractButton = screen.getByText('My Contracts');
            fireEvent.click(contractButton);
            const mockCashContractData: {
                id: number;
                cashKickid: number;
                contractId: number;
            }[] = [
                {
                    id: 1,
                    cashKickid: 1,
                    contractId: 1
                }
            ];
            const getCCData = jest.spyOn(services, 'fetchCashKickContract');
            getCCData.mockResolvedValue({
                status: 200,
                statusText: 'OK',
                headers: {},
                config: { headers: {} as any },
                data: mockCashContractData
            });
            const getTransactionDataMock = jest.spyOn(
                services,
                'fetchContracts'
            );
            expect(console.error).toHaveBeenCalled();
        });
    });

    test('it should handle myCaskKick button onClick', () => {
        render(<CashAccelerationPage />);
        const contractButton = screen.getByText('My Contracts');
        fireEvent.click(contractButton);
        const cashKick = screen.getByText('My Cash Kicks');
        fireEvent.click(cashKick);
        const newCashKickElement = screen.getByText('New Cash Kick');
        fireEvent.click(newCashKickElement);
        expect(mockNavigate).toHaveBeenCalledWith('/new-cash-kick');
    });
});
