import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import { getAllUsersDetail } from '../../services/calls';
import { FORGOT_PASSWORD_DATA } from '../../utils/constant';
import ForgotPasswordPage from '.';

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));


jest.mock('axios');
const mockUserData = [
    {
        id: 1,
        name: 'Pari',
        email: 'test@gmail.com',
        password: 'Abcd@1234'
    }
];

jest.mock('../../services/api', () => ({
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
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        jest.clearAllMocks();
        render(<ForgotPasswordPage />);
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

        const continueButtonElement = screen.getByText('Continue');
        expect(screen.getByText('Continue')).toBeInTheDocument();

        fireEvent.click(continueButtonElement);

        const resetInputField = screen.getByPlaceholderText('Enter reset code');

        fireEvent.change(resetInputField, {
            target: { value: '12345678' }
        });

        const resetButtonElement = screen.getByText('Reset Password');
        expect(resetButtonElement).toBeInTheDocument();
        fireEvent.click(resetButtonElement);

        const changePasswordElement = screen.getByText(
            'Password must contain at least 7 letters and 1 number'
        );
        expect(changePasswordElement).toBeInTheDocument();
    });
});
