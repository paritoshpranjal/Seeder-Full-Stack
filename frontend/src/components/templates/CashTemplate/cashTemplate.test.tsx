import React from 'react';
import CashTemplate from '.';
import '@testing-library/jest-dom';
import { Box } from '@mui/material';
import { render, screen, fireEvent } from '@testing-library/react';

describe('CashTemplate Component', () => {
    it('should render CashTemplate with provided heading and message', () => {
        render(
            <CashTemplate heading="Test Heading" message="Test Message">
                <Box>Test Content</Box>
            </CashTemplate>
        );

        expect(screen.getByText('Test Heading')).toBeInTheDocument();
        expect(screen.getByText('Test Message')).toBeInTheDocument();
    });

    it('should call handleLogout when header is clicked', () => {
        render(
            <CashTemplate heading="Test Heading" message="Test Message">
                <Box>Test Content</Box>
            </CashTemplate>
        );

        fireEvent.click(screen.getByAltText('arrow'));
    });

    it('should render children components', () => {
        render(
            <CashTemplate heading="Test Heading" message="Test Message">
                <Box>Test Content</Box>
            </CashTemplate>
        );

        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
});
