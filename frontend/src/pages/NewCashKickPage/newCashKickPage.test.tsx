import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as services from '../../services/calls/';
import NewCashKickPage from '.';
import React from 'react';

const mockCashkickData = {
    data: [
        {
            name: 'second',
            status: 'Pending',
            maturity: '2023-11-13T06:19:34.383Z',
            totalFinanced: 449436.5568,
            totalReceived: 401282.64,
            id: 7728,
            userId: 1
        }
    ]
};

const mockContractData = {
    data: [
        {
            id: 1,
            name: 'Contract 1',
            type: 'Monthly',
            perPayment: 12000.25,
            termLength: 12,
            termRate: 12,
            paymentAmount: 126722.64,
            totalFinanced: '-',
            status: 'Available',
            totalAvailable: 1000,
            partialAmount: 0
        },
        {
            id: 2,
            name: 'Contract 2',
            type: 'Monthly',
            perPayment: 6000.0,
            termLength: 12,
            termRate: 12,
            paymentAmount: 21120.0,
            totalFinanced: '-',
            status: 'Available',
            totalAvailable: 1000,
            partialAmount: 0
        },
        {
            id: 3,
            name: 'Contract 3',
            type: 'Monthly',
            perPayment: 6000,
            termLength: 12,
            termRate: 12,
            paymentAmount: 63360.0,
            totalFinanced: '-',
            status: 'Available',
            totalAvailable: 1000,
            partialAmount: 0
        },
        {
            id: 4,
            name: 'Contract 4',
            type: 'Monthly',
            perPayment: 6000,
            termLength: 12,
            termRate: 12,
            paymentAmount: 63360.0,
            totalFinanced: '-',
            status: 'Available',
            totalAvailable: 1000,
            partialAmount: 0
        },
        {
            id: 5,
            name: 'Contract 5',
            type: 'Monthly',
            perPayment: 6000,
            termLength: 12,
            termRate: 12,
            paymentAmount: 63360.0,
            totalFinanced: '-',
            status: 'Available',
            totalAvailable: 1000,
            partialAmount: 0
        }
    ]
};
const mockUserData = {
    data: [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            password: 'Password@123',
            availableCredit: 430563.4432
        }
    ]
};
const mockCashkickContract = {
    data: [
        {
            id: 257,
            cashkickId: 8012,
            contractId: 1
        }
    ]
};

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe('NewCashKick page component testcases', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    jest.spyOn(services, 'createNewCashkick').mockResolvedValue(
        mockCashkickData as any
    );
    jest.spyOn(services, 'getAllContracts').mockResolvedValue(
        mockContractData as any
    );
    jest.spyOn(services, 'updateAvailableCreditOfUser').mockResolvedValue(
        mockUserData as any
    );
    jest.spyOn(services, 'createCashkickContract').mockResolvedValue(
        mockCashkickContract as any
    );
    it('should render navbar and content as expected', () => {
        render(<NewCashKickPage />);
        const appName = screen.getByText('Seeder');
        expect(appName).toBeInTheDocument();
    });
    it('should render balance datacard of user', () => {
        jest.spyOn(services, 'createNewCashkick').mockResolvedValue(
            mockCashkickData as any
        );
        jest.spyOn(services, 'getAllContracts').mockResolvedValue(
            mockContractData as any
        );
        jest.spyOn(services, 'updateAvailableCreditOfUser').mockResolvedValue(
            mockUserData as any
        );
        jest.spyOn(services, 'createCashkickContract').mockResolvedValue(
            mockCashkickContract as any
        );
        render(<NewCashKickPage />);
        const balance = screen.getByText(
            'Let’s setup a new cash kick to power your Saas'
        );
        expect(balance).toBeInTheDocument();
    });
    test('should render the NewCashKick component', async () => {
        jest.spyOn(services, 'createNewCashkick').mockResolvedValue(
            mockCashkickData as any
        );
        jest.spyOn(services, 'getAllContracts').mockResolvedValue(
            mockContractData as any
        );
        jest.spyOn(services, 'updateAvailableCreditOfUser').mockResolvedValue(
            mockUserData as any
        );
        jest.spyOn(services, 'createCashkickContract').mockResolvedValue(
            mockCashkickContract as any
        );
        render(<NewCashKickPage />);

        const slider = screen.getByRole('slider');
        fireEvent.change(slider, { target: { value: '146842' } });

        const resetButton = screen.getByText('Reset');
        expect(resetButton).toBeInTheDocument();
        fireEvent.click(resetButton);
        fireEvent.change(slider, { target: { value: '14567' } });

        const backBtn = screen.getByText('Back');
        fireEvent.click(backBtn);
    });
    it('should create cashkick', () => {
        jest.spyOn(services, 'createNewCashkick').mockResolvedValue(
            mockCashkickData as any
        );
        jest.spyOn(services, 'getAllContracts').mockResolvedValue(
            mockContractData as any
        );
        jest.spyOn(services, 'updateAvailableCreditOfUser').mockResolvedValue(
            mockUserData as any
        );
        jest.spyOn(services, 'createCashkickContract').mockResolvedValue(
            mockCashkickContract as any
        );
        render(<NewCashKickPage />);
        const checkboxElement = screen.getAllByRole('checkbox');
        fireEvent.click(checkboxElement[0]);
        const slider = screen.getByRole('slider');
        fireEvent.change(slider, { target: { value: '84480' } });
        const resetButton = screen.getByText('Reset');
        fireEvent.click(resetButton);
        fireEvent.change(slider, { target: { value: '84480' } });
        const reviewBtn = screen.getByText('Review your credit');
        expect(reviewBtn).toBeEnabled();
        fireEvent.click(reviewBtn);
        const submitBtn = screen.getByText('Submit your credit');
        fireEvent.click(submitBtn);
        const inputElement = screen.getByPlaceholderText(
            'Ex: marketing expenses'
        );
        expect(inputElement).toBeInTheDocument();
        fireEvent.change(inputElement, { target: { value: 'Test Cashkick' } });
        expect(inputElement).toHaveValue('Test Cashkick');
        const submitButton = screen.getByTestId('create-button');
        fireEvent.click(submitButton);
    });
    it('should close the model on clicking on cancel button', async () => {
        jest.spyOn(services, 'createNewCashkick').mockResolvedValue(
            mockCashkickData as any
        );
        jest.spyOn(services, 'getAllContracts').mockResolvedValue(
            mockContractData as any
        );
        jest.spyOn(services, 'updateAvailableCreditOfUser').mockResolvedValue(
            mockUserData as any
        );
        jest.spyOn(services, 'createCashkickContract').mockResolvedValue(
            mockCashkickContract as any
        );

        render(<NewCashKickPage />);
        await (() => {
            expect(screen.getByText('Contract 1')).toBeInTheDocument();
        });
        const checkboxElement = screen.getAllByRole('checkbox');
        fireEvent.click(checkboxElement[0]);
        const slider = screen.getByRole('slider');
        fireEvent.change(slider, { target: { value: '240000' } });
        const resetButton = screen.getByText('Reset');
        fireEvent.click(resetButton);
        fireEvent.change(slider, { target: { value: '240000' } });
        const reviewBtn = screen.getByText('Review your credit');
        expect(reviewBtn).toBeEnabled();
        fireEvent.click(reviewBtn);
        const submitBtn = screen.getByText('Submit your credit');
        fireEvent.click(submitBtn);
        const inputElement = screen.getByPlaceholderText(
            'Ex: marketing expenses'
        );
        expect(inputElement).toBeInTheDocument();
        fireEvent.change(inputElement, { target: { value: 'Test Cashkick' } });
        expect(inputElement).toHaveValue('Test Cashkick');
        const submitButton = screen.getByTestId('create-button');
        fireEvent.click(submitButton);
        const successModalCloseButton = screen.getByText('Cancel');
        fireEvent.click(successModalCloseButton);
    });
});
