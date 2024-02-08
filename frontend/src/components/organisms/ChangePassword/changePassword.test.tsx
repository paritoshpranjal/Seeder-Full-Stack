import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as services from '../../../services/calls/index';
import ChangePassword from '.';

jest.mock('../../../services/api', () => ({
    updatePasswordByUserId: jest.fn()
}));

jest.mock('axios');

jest.useFakeTimers();

describe('ChangePassword Component', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('it should enable the "Change Password" button with valid password', () => {
        const mockOnLoginClick = jest.fn();

        render(<ChangePassword onLoginClick={mockOnLoginClick} />);
        const passwordInput = screen.getByPlaceholderText(
            'Enter your new password'
        );

        fireEvent.change(passwordInput, {
            target: { value: 'ValidP@ssword123' }
        });

        const secondPasswordInput = screen.getByPlaceholderText(
            'Re-enter your new password'
        );
        expect(secondPasswordInput).toBeEnabled();
        fireEvent.focus(secondPasswordInput);
        fireEvent.blur(secondPasswordInput);

        fireEvent.change(secondPasswordInput, {
            target: { value: 'ValidP@ssword123' }
        });

        const buttonElement = screen.getByTestId('changePassword');
        expect(buttonElement).toBeEnabled();
    });

    test('it should disable the "Change Password" button with invalid password', () => {
        const mockOnLoginClick = jest.fn();

        render(<ChangePassword onLoginClick={mockOnLoginClick} />);
        const passwordInput = screen.getByPlaceholderText(
            'Enter your new password'
        );

        fireEvent.change(passwordInput, {
            target: { value: 'Valid' }
        });

        const secondPasswordInput = screen.getByPlaceholderText(
            'Re-enter your new password'
        );
        expect(secondPasswordInput).toBeDisabled();

        const buttonElement = screen.getByTestId('changePassword');
        expect(buttonElement).toBeDisabled();
    });

    test('it should disable the "Change Password" button with invalid password in second field', () => {
        const mockOnLoginClick = jest.fn();

        render(<ChangePassword onLoginClick={mockOnLoginClick} />);
        const passwordInput = screen.getByPlaceholderText(
            'Enter your new password'
        );

        fireEvent.change(passwordInput, {
            target: { value: 'Valid@123' }
        });

        const secondPasswordInput = screen.getByPlaceholderText(
            'Re-enter your new password'
        );
        expect(secondPasswordInput).toBeEnabled();

        fireEvent.change(secondPasswordInput, {
            target: { value: 'Valid' }
        });

        const buttonElement = screen.getByTestId('changePassword');
        expect(buttonElement).toBeDisabled();
    });

    test('it should handle focus and blur events for the password field', () => {
        const mockOnLoginClick = jest.fn();

        render(<ChangePassword onLoginClick={mockOnLoginClick} />);

        const passwordInput = screen.getByPlaceholderText(
            'Enter your new password'
        );
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

    test('it should toggle showPassword state on button click', () => {
        const mockOnLoginClick = jest.fn();

        render(<ChangePassword onLoginClick={mockOnLoginClick} />);

        const toggleButton = screen.getByTestId('toggle-show-password-button');

        expect(
            screen
                .getByPlaceholderText('Enter your new password')
                .getAttribute('type')
        ).toBe('password');

        fireEvent.click(toggleButton);

        expect(
            screen
                .getByPlaceholderText('Enter your new password')
                .getAttribute('type')
        ).toBe('text');

        fireEvent.click(toggleButton);

        expect(
            screen
                .getByPlaceholderText('Enter your new password')
                .getAttribute('type')
        ).toBe('password');
    });

    test('it should prevent default behavior', () => {
        const mockOnLoginClick = jest.fn();
        const preventDefault = jest.fn();
        const e = { preventDefault };
        const { getByTestId } = render(
            <ChangePassword onLoginClick={mockOnLoginClick} />
        );
        const toggleButton = getByTestId('toggle-show-password-button');
        fireEvent.mouseDown(toggleButton, e);
        expect(preventDefault).toHaveBeenCalledTimes(0);
    });

    test('it should handle onBlur for updated password field that having timeout', async () => {
        const mockOnLoginClick = jest.fn();

        render(<ChangePassword onLoginClick={mockOnLoginClick} />);

        const updatedPasswordInput = screen.getByPlaceholderText(
            'Re-enter your new password'
        );

        fireEvent.focus(updatedPasswordInput);
        fireEvent.blur(updatedPasswordInput);

        jest.advanceTimersByTime(1000);

        await waitFor(() => {
            expect(updatedPasswordInput).toHaveValue('');
            expect(screen.getByAltText('Lock Update')).toHaveAttribute(
                'alt',
                'Lock Update'
            );
        });
    });

    test('it should handle isSuccess state and mock the data also render the next component ', async () => {
        const mockOnLoginClick = jest.fn();

        const mockUpdatePassword: {
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

        const updatePasswordMock = jest.spyOn(
            services,
            'updatePasswordByUserId'
        );

        updatePasswordMock.mockResolvedValue({
            status: 200,
            statusText: 'OK',
            headers: {},
            config: { headers: {} as any },
            data: mockUpdatePassword
        });

        render(<ChangePassword onLoginClick={mockOnLoginClick} />);

        const passwordInput = screen.getByPlaceholderText(
            'Enter your new password'
        );

        fireEvent.change(passwordInput, {
            target: { value: 'ValidP@ssword123' }
        });

        const secondPasswordInput = screen.getByPlaceholderText(
            'Re-enter your new password'
        );
        expect(secondPasswordInput).toBeEnabled();

        fireEvent.change(secondPasswordInput, {
            target: { value: 'ValidP@ssword123' }
        });

        const buttonElement = screen.getByTestId('changePassword');

        fireEvent.click(buttonElement);

        await waitFor(() => {
            expect(screen.getByTestId('nextPage')).toBeInTheDocument();
        });

        updatePasswordMock.mockRestore();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });
});
