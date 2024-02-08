import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ForgotPassword from '.';
import axios from 'axios';
import { getAllUsersDetail } from '../../../services/calls';
import { FORGOT_PASSWORD_DATA } from '../../../utils/constant';

jest.mock('axios');
const mockUserData = [
    {
        id: 1,
        name: 'Pari',
        email: 'test@gmail.com',
        password: 'Abcd@1234'
    }
];

jest.mock('../../../services/api', () => ({
    get: jest.fn().mockImplementation((url) => {
        if (url.includes(`/users`)) {
            return Promise.resolve({
                data: mockUserData
            });
        }
    })
}));

jest.mock('axios');

describe('ForgotPassword Component', () => {
    const mockOnLoginClick = jest.fn();
    const mockOnContinueClick = jest.fn();
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        jest.clearAllMocks();
        render(
            <ForgotPassword
                onContinueClick={mockOnContinueClick}
                onLoginClick={mockOnLoginClick}
            />
        );
    });
    test('it should enable the "Reset Password" button with valid email and send a reset message', async () => {
        const emailInput = screen.getByPlaceholderText('Enter your email id');

        fireEvent.change(emailInput, {
            target: { value: 'test@gmail.com' }
        });

        const buttonElement = screen.getByTestId('ResetButton');
        expect(buttonElement).toBeEnabled();

        axios.get = jest.fn().mockResolvedValue({ data: mockUserData });
        const response = await getAllUsersDetail();
        expect(response.data).toEqual(mockUserData);

        fireEvent.click(buttonElement);

        expect(
            await screen.findByText(FORGOT_PASSWORD_DATA.resetMessage)
        ).toBeInTheDocument();
    });

    test('it should enable the "Reset Password" button with invalid user and send a message as Invalid User', async () => {
        const emailInput = screen.getByPlaceholderText('Enter your email id');

        fireEvent.change(emailInput, {
            target: { value: 'test@zemosolabs.com' }
        });

        const buttonElement = screen.getByTestId('ResetButton');
        expect(buttonElement).toBeEnabled();

        axios.get = jest.fn().mockResolvedValue({ data: mockUserData });
        const response = await getAllUsersDetail();
        expect(response.data).toEqual(mockUserData);

        fireEvent.click(buttonElement);

        expect(
            await screen.findByText(FORGOT_PASSWORD_DATA.invalidUser)
        ).toBeInTheDocument();
    });

    test('it should not enable the "Reset Password" button with invalid email', async () => {
        const emailInput = screen.getByPlaceholderText('Enter your email id');

        fireEvent.focus(emailInput);

        fireEvent.change(emailInput, {
            target: { value: 'test@gmail' }
        });

        fireEvent.blur(emailInput);

        const buttonElement = screen.getByTestId('ResetButton');
        expect(buttonElement).toBeDisabled();
    });
});
