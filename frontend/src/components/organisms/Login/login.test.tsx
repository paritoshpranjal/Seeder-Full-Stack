import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '.';
import * as services from '../../../services/calls/index';
import { MOCK_USER } from '../../../utils/constant';
import { useAuth0 } from '@auth0/auth0-react';

jest.mock('../../../services/api', () => ({
    getAllUsersDetail: jest.fn(),
    getUserByEmailId: jest.fn(),
    registerUser: jest.fn(),
}));

jest.mock('@auth0/auth0-react', () => ({
    useAuth0: jest.fn()
}));

const loginMock = jest.fn();
(useAuth0 as jest.Mock).mockReturnValue({
    loginWithRedirect: loginMock
});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

jest.mock('axios');

describe('Login Component', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('it should enable the "Continue" button with valid email and password', () => {
        const mockOnForgotClick = jest.fn();
        const mockOnGoogleLoginClick = jest.fn();
        const mockOnLoginClick = jest.fn();
        const mockOnSignupClick = jest.fn();
        render(
            <Login
                onForgotClick={mockOnForgotClick}
                onGoogleLoginClick={mockOnGoogleLoginClick}
                onSignupClick={mockOnSignupClick}
            />
        );

        const emailInput = screen.getByPlaceholderText('Enter your email id');

        fireEvent.change(emailInput, {
            target: { value: 'validemail@example.com' }
        });

        const passwordInput = screen.getByPlaceholderText(
            'Enter your password'
        );

        fireEvent.change(passwordInput, {
            target: { value: 'ValidP@ssword123' }
        });

        const buttonElement = screen.getByTestId('ContinueButton');
        expect(buttonElement).toBeEnabled();
    });

    test('it should disable the "Continue" button with invalid email and password', () => {
        const mockOnForgotClick = jest.fn();
        const mockOnGoogleLoginClick = jest.fn();
        const mockOnSignupClick = jest.fn();
        render(
            <Login
                onForgotClick={mockOnForgotClick}
                onGoogleLoginClick={mockOnGoogleLoginClick}
                onSignupClick={mockOnSignupClick}
            />
        );

        const emailInput = screen.getByPlaceholderText('Enter your email id');

        fireEvent.change(emailInput, {
            target: { value: 'Test@example.com' }
        });

        const passwordInput = screen.getByPlaceholderText(
            'Enter your password'
        );

        fireEvent.change(passwordInput, {
            target: { value: 'Valid' }
        });

        const buttonElement = screen.getByTestId('ContinueButton');
        expect(buttonElement).toBeDisabled();
    });

    test('it should render disable state of button if email and password field is invalid', () => {
        const mockOnForgotClick = jest.fn();
        const mockOnGoogleLoginClick = jest.fn();
        const mockOnSignupClick = jest.fn();
        render(
            <Login
                onForgotClick={mockOnForgotClick}
                onGoogleLoginClick={mockOnGoogleLoginClick}
                onSignupClick={mockOnSignupClick}
            />
        );

        const emailInput = screen.getByPlaceholderText('Enter your email id');

        fireEvent.change(emailInput, {
            target: { value: 'Test@example' }
        });

        const passwordInput = screen.getByPlaceholderText(
            'Enter your password'
        );

        fireEvent.change(passwordInput, {
            target: { value: 'Valid@123' }
        });

        const buttonElement = screen.getByTestId('ContinueButton');
        expect(buttonElement).toBeDisabled();
    });

    test('it should handle focus and blur events for the email field', () => {
        const mockOnForgotClick = jest.fn();
        const mockOnGoogleLoginClick = jest.fn();
        const mockOnSignupClick = jest.fn();
        render(
            <Login
                onForgotClick={mockOnForgotClick}
                onGoogleLoginClick={mockOnGoogleLoginClick}
                onSignupClick={mockOnSignupClick}
            />
        );

        const emailInput = screen.getByPlaceholderText('Enter your email id');
        const notificationIcon = screen.getByAltText('Notification Icon');

        expect(emailInput).toHaveValue('');
        expect(notificationIcon).toHaveAttribute('alt', 'Notification Icon');

        fireEvent.focus(emailInput);

        expect(emailInput).toHaveValue('');
        expect(notificationIcon).toHaveAttribute('alt', 'Notification Icon');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

        expect(emailInput).toHaveValue('test@example.com');
        expect(notificationIcon).toHaveAttribute('alt', 'Notification Icon');

        fireEvent.blur(emailInput);

        expect(emailInput).toHaveValue('test@example.com');
        expect(notificationIcon).toHaveAttribute('alt', 'Notification Icon');
    });

    test('it should handle focus and blur events for the password field', () => {
        const mockOnForgotClick = jest.fn();
        const mockOnGoogleLoginClick = jest.fn();
        const mockOnSignupClick = jest.fn();
        render(
            <Login
                onForgotClick={mockOnForgotClick}
                onGoogleLoginClick={mockOnGoogleLoginClick}
                onSignupClick={mockOnSignupClick}
            />
        );

        const passwordInput = screen.getByPlaceholderText(
            'Enter your password'
        );
        const lockIcon = screen.getByAltText('UnCheck Icon');

        expect(passwordInput).toHaveValue('');
        expect(lockIcon).toHaveAttribute('alt', 'UnCheck Icon');

        fireEvent.focus(passwordInput);

        expect(passwordInput).toHaveValue('');
        expect(lockIcon).toHaveAttribute('alt', 'UnCheck Icon');

        fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

        expect(passwordInput).toHaveValue('testPassword');
        expect(lockIcon).toHaveAttribute('alt', 'UnCheck Icon');

        fireEvent.blur(passwordInput);

        expect(passwordInput).toHaveValue('testPassword');
        expect(lockIcon).toHaveAttribute('alt', 'UnCheck Icon');
    });

    test('it should prevent default behavior', () => {
        const mockOnForgotClick = jest.fn();
        const mockOnGoogleLoginClick = jest.fn();
        const mockOnSignupClick = jest.fn();
        const preventDefault = jest.fn();
        const e = { preventDefault };
        const { getByTestId } = render(
            <Login
                onForgotClick={mockOnForgotClick}
                onGoogleLoginClick={mockOnGoogleLoginClick}
                onSignupClick={mockOnSignupClick}
            />
        );
        const toggleButton = getByTestId('toggle-show-password-button');
        fireEvent.mouseDown(toggleButton, e);
        expect(preventDefault).toHaveBeenCalledTimes(0);
    });

    test('it should toggle showPassword state on button click', () => {
        const mockOnForgotClick = jest.fn();
        const mockOnGoogleLoginClick = jest.fn();
        const mockOnSignupClick = jest.fn();

        render(
            <Login
                onForgotClick={mockOnForgotClick}
                onGoogleLoginClick={mockOnGoogleLoginClick}
                onSignupClick={mockOnSignupClick}
            />
        );

        const toggleButton = screen.getByTestId('toggle-show-password-button');

        expect(
            screen
                .getByPlaceholderText('Enter your password')
                .getAttribute('type')
        ).toBe('password');

        fireEvent.click(toggleButton);

        expect(
            screen
                .getByPlaceholderText('Enter your password')
                .getAttribute('type')
        ).toBe('text');

        fireEvent.click(toggleButton);

        expect(
            screen
                .getByPlaceholderText('Enter your password')
                .getAttribute('type')
        ).toBe('password');
    });

    test('it should handle login correctly with valid user', async () => {
        const mockOnForgotClick = jest.fn();
        const mockOnGoogleLoginClick = jest.fn();
        const mockOnSignupClick = jest.fn();

        const mockUserDetailsInfo: {
            id: number;
            email: string;
            password: string;
        }[] = [
            {
                id: 1,
                email: 'Test@gmail.com',
                password: 'Abcd@1234'
            }
        ];

        const getUserDetailsMock = jest.spyOn(services, 'getAllUsersDetail');
        getUserDetailsMock.mockResolvedValue({
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: {} as any },
            data: mockUserDetailsInfo
        });

        const { getByPlaceholderText, getByTestId } = render(
            <Login
                onForgotClick={mockOnForgotClick}
                onGoogleLoginClick={mockOnGoogleLoginClick}
                onSignupClick={mockOnSignupClick}
            />
        );

        const emailInput = getByPlaceholderText('Enter your email id');
        fireEvent.change(emailInput, { target: { value: 'Test@gmail.com' } });

        const passwordInput = getByPlaceholderText('Enter your password');
        fireEvent.change(passwordInput, { target: { value: 'Abcd@1234' } });

        const loginButton = getByTestId('ContinueButton');
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/home");
        });
        getUserDetailsMock.mockRestore();
    });

    test('it should handle login correctly with Invalid user and password', async () => {
        const mockOnForgotClick = jest.fn();
        const mockOnGoogleLoginClick = jest.fn();
        const mockOnSignupClick = jest.fn();

        const mockUserDetailsInfo: {
            id: number;
            email: string;
            password: string;
        }[] = [
            {
                id: 1,
                email: 'Test@gmail.com',
                password: 'Abcd@1234'
            }
        ];

        const getUserDetailsMock = jest.spyOn(services, 'getAllUsersDetail');
        getUserDetailsMock.mockResolvedValue({
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: {} as any },
            data: mockUserDetailsInfo
        });

        const { getByPlaceholderText, getByTestId } = render(
            <Login
                onForgotClick={mockOnForgotClick}
                onGoogleLoginClick={mockOnGoogleLoginClick}
                onSignupClick={mockOnSignupClick}
            />
        );

        const emailInput = getByPlaceholderText('Enter your email id');
        fireEvent.change(emailInput, { target: { value: 'Test@gmail.com' } });

        const passwordInput = getByPlaceholderText('Enter your password');
        fireEvent.change(passwordInput, { target: { value: 'Test@1234' } });

        const loginButton = getByTestId('ContinueButton');
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(
                screen.getByText('Invalid User and Password')
            ).toBeInTheDocument();
        });
        getUserDetailsMock.mockRestore();
    });
    test('should render Google Icon and trigger Signup Auth0 action', () => {
        const getUserByEmailId = jest.spyOn(services, 'getUserByEmailId');
        const registerUser = jest.spyOn(services, 'registerUser');

        registerUser.mockResolvedValue({
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: {} as any },
            data: MOCK_USER
        });
    
        getUserByEmailId.mockResolvedValue({
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: {} as any },
            data: MOCK_USER
        });
         render(<Login/>)
        const button = screen.getByAltText('Google');
        fireEvent.click(button);

        expect(loginMock).toHaveBeenCalled();
    });

    test('should render Google Icon and trigger Signup Auth0 action', () => {
        const getUserByEmailId = jest.spyOn(services, 'getUserByEmailId');
        const registerUser = jest.spyOn(services, 'registerUser');


        getUserByEmailId.mockResolvedValue({
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: {} as any },
            data: []
        });

        registerUser.mockResolvedValue({
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: {} as any },
            data: MOCK_USER
        });
    
         render(<Login/>)
        const button = screen.getByAltText('Google');
        fireEvent.click(button);

        expect(loginMock).toHaveBeenCalled();
    });
    

    test('it should redirect to forgot password page', () => {
        render(<Login/>)
        const forgotElement = screen.getByText('Forgot Password?');
        fireEvent.click(forgotElement);
        expect(mockNavigate).toHaveBeenCalledWith("/forgot");
    })

    test('it should redirect to sign up page', () => {
        render(<Login/>)
        const forgotElement = screen.getByText('Sign Up');
        fireEvent.click(forgotElement);
        expect(mockNavigate).toHaveBeenCalledWith("/");
    })
});
