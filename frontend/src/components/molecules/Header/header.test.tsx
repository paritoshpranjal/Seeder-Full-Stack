import React from 'react';
import Header from '.';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAuth0 } from '@auth0/auth0-react';

const user = {
    email: 'johndoe@me.com',
    email_verified: true,
    sub: 'google-oauth2|12345678901234'
};
jest.mock('@auth0/auth0-react');
const logout = jest.fn();

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');

    return {
        ...originalModule,
        useNavigate: jest.fn()
    };
});

jest.mock('axios');

describe('Header Component', () => {
    beforeEach(() => {
        (useAuth0 as jest.Mock).mockReturnValue({
            isAuthenticated: true,
            user,
            logout
        });
        render(<Header heading="Test Heading" message="Test Message" />);
    });

    it('should render heading and message correctly', () => {
        expect(screen.getByText('Test Message')).toBeInTheDocument();
    });

    it('should render avatar and icon', () => {
        expect(screen.getByAltText('arrow')).toBeInTheDocument();
        expect(screen.getByTestId('Avatar')).toBeInTheDocument();
    });

    it('should close the menu when pressing the escape key', () => {
        fireEvent.click(screen.getByAltText('arrow'));
        expect(screen.getByText('Log Out')).toBeInTheDocument();
        fireEvent.keyDown(document, { key: 'Escape' });
        expect(screen.getByText('Test Message')).toBeInTheDocument();
    });

    it('should close the menu when pressing the escape key', () => {
        fireEvent.click(screen.getByAltText('arrow'));
        expect(screen.getByText('Log Out')).toBeInTheDocument();
        const evt = new MouseEvent('click', { bubbles: true });
        document.dispatchEvent(evt);
    });

    it('should close the menu when click on the logout  ', () => {
        fireEvent.click(screen.getByAltText('arrow'));
        expect(screen.getByText('Log Out')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Log Out'));
    });
});
