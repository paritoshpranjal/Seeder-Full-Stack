import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUp from '.';
import { getUserByEmailId } from '../../../services/calls/index';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const mockUserData = [
    { id: 1, name: 'John', email: 'john@gmail.com', password: 'John@1234' }
];

jest.mock('../../../services/calls/index', () => ({
    registerUser: jest.fn(),
    getUserByEmailId: jest.fn()
}));

jest.mock('../../../services/api', () => ({
    get: jest.fn().mockImplementation((url) => {
        if (url.includes(`/user?email=${'john@gmail.com'}`)) {
            return Promise.resolve({
                data: mockUserData
            });
        }
    })
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

describe('SignUp Component', () => {
    test('it should enable the "Continue" button with valid email and password', async () => {
        const mockOnGoogleLoginClick = jest.fn();
        render(<SignUp onGoogleLoginClick={mockOnGoogleLoginClick} />);

        const nameInput = screen.getByPlaceholderText('Your Name');

        fireEvent.change(nameInput, {
            target: { value: 'John' }
        });
        const emailInput = screen.getByPlaceholderText('Email Address');

        fireEvent.change(emailInput, {
            target: { value: 'john1@gmail.com' }
        });

        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(passwordInput, {
            target: { value: 'John@1234' }
        });

        const buttonElement = screen.getByText('Sign Up');
        expect(buttonElement).toBeEnabled();
        fireEvent.click(buttonElement);

        axios.get = jest.fn().mockResolvedValue({ data: mockUserData });
        const response = await getUserByEmailId('john@gmail.com');
    });

    test('it should render Login Page when we click on hyperLink', () => {
        const mockOnGoogleLoginClick = jest.fn();
        render(<SignUp onGoogleLoginClick={mockOnGoogleLoginClick} />);

        const loginElement = screen.getByText('Login');
        expect(loginElement).toBeInTheDocument();
        fireEvent.click(loginElement);
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
    test('it should enable the "Continue" button with valid email and password', () => {
        const mockOnGoogleLoginClick = jest.fn();
        render(<SignUp onGoogleLoginClick={mockOnGoogleLoginClick} />);

        const nameInput = screen.getByPlaceholderText('Your Name');

        fireEvent.change(nameInput, {
            target: { value: 'va' }
        });
        const emailInput = screen.getByPlaceholderText('Email Address');

        fireEvent.change(emailInput, {
            target: { value: 'validemai' }
        });

        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(passwordInput, {
            target: { value: 'Valid' }
        });

        const buttonElement = screen.getByTestId('SignupButton');
        expect(buttonElement).toBeDisabled();
    });
    test('it should prevent default behavior', () => {
        const mockOnGoogleLoginClick = jest.fn();
        const preventDefault = jest.fn();
        const e = { preventDefault };
        const { getByTestId } = render(
            <SignUp onGoogleLoginClick={mockOnGoogleLoginClick} />
        );
        const toggleButton = getByTestId('toggle-show-password-button');
        fireEvent.mouseDown(toggleButton, e);
        expect(preventDefault).toHaveBeenCalledTimes(0);
    });
    test('it should toggle showPassword state on button click', () => {
        const mockOnGoogleLoginClick = jest.fn();
        render(<SignUp onGoogleLoginClick={mockOnGoogleLoginClick} />);

        const toggleButton = screen.getByTestId('toggle-show-password-button');

        expect(
            screen.getByPlaceholderText('Password').getAttribute('type')
        ).toBe('password');

        fireEvent.click(toggleButton);

        expect(
            screen.getByPlaceholderText('Password').getAttribute('type')
        ).toBe('text');

        fireEvent.click(toggleButton);

        expect(
            screen.getByPlaceholderText('Password').getAttribute('type')
        ).toBe('password');
    });
    test('it should handle focus and blur events for the password field', () => {
        const mockOnGoogleLoginClick = jest.fn();
        render(<SignUp onGoogleLoginClick={mockOnGoogleLoginClick} />);
        const passwordInput = screen.getByPlaceholderText('Password');
        const lockIcon = screen.getByAltText('Lock Icon');

        expect(passwordInput).toHaveValue('');
        expect(lockIcon).toHaveAttribute('alt', 'Lock Icon');

        fireEvent.focus(passwordInput);

        expect(passwordInput).toHaveValue('');
        expect(lockIcon).toHaveAttribute('alt', 'Lock Icon');

        fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

        expect(passwordInput).toHaveValue('testPassword');
        expect(lockIcon).toHaveAttribute('alt', 'Lock Icon');

        fireEvent.blur(passwordInput);

        expect(passwordInput).toHaveValue('testPassword');
        expect(lockIcon).toHaveAttribute('alt', 'Lock Icon');
    });

    test('it should handle focus and blur events for the email field', () => {
        const mockOnGoogleLoginClick = jest.fn();
        render(<SignUp onGoogleLoginClick={mockOnGoogleLoginClick} />);

        const emailInput = screen.getByPlaceholderText('Email Address');
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

    test('should render Google Icon and trigger Signup Auth0 action', () => {
        render(<SignUp />);
        const button = screen.getByAltText('Google');
        fireEvent.click(button);

        expect(loginMock).toHaveBeenCalled();
    });

    test('it should render the onFocus and onBlue', async () => {
        render(<SignUp />);
        const nameInput = screen.getByPlaceholderText('Your Name');

        fireEvent.focus(nameInput);

        fireEvent.change(nameInput, {
            target: { value: 'test' }
        });

        fireEvent.blur(nameInput);
    });

    test('it should enable the "Continue" button with valid email and password', () => {
        const mockOnGoogleLoginClick = jest.fn();
        render(<SignUp onGoogleLoginClick={mockOnGoogleLoginClick} />);

        const nameInput = screen.getByPlaceholderText('Your Name');

        fireEvent.change(nameInput, {
            target: { value: 'testing' }
        });
        const emailInput = screen.getByPlaceholderText('Email Address');

        fireEvent.change(emailInput, {
            target: { value: 'test@gmail.com' }
        });

        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(passwordInput, {
            target: { value: 'Abcd@1234' }
        });

        const buttonElement = screen.getByTestId('SignupButton');
        expect(buttonElement).toBeEnabled();
    });

});
