import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CashKickSuccessModal from '.';

describe('CashKick Success Modal Component', () => {
    test('it should render correctly typography correctly', () => {
        const mockCrossIconClick = jest.fn();
        const mockCloseButtonClick = jest.fn();
        const mockViewButtonClick = jest.fn();
        render(
            <CashKickSuccessModal
                width={'640px'}
                handleCrossIconClick={mockCrossIconClick}
                handleCloseButtonClick={mockCloseButtonClick}
                handleViewButtonClick={mockViewButtonClick}
                isOpen={true}
            />
        );
        const titleElement = screen.getByText(
            'Cash kick launched successfully!'
        );
        const subTitleElement = screen.getByText(
            'We are reviewing your cash kick'
        );

        const bodyElement = screen.getByText('Your cash kick is under review');
        const closeButtonElement = screen.getByText('Close');
        const viewButtonElement = screen.getByText('View cash kicks');

        expect(titleElement).toBeInTheDocument();
        expect(subTitleElement).toBeInTheDocument();
        expect(bodyElement).toBeInTheDocument();
        expect(closeButtonElement).toBeInTheDocument();
        expect(viewButtonElement).toBeInTheDocument();
    });

    test('it should mock the button component', () => {
        const mockCrossIconClick = jest.fn();
        const mockCloseButtonClick = jest.fn();
        const mockViewButtonClick = jest.fn();
        render(
            <CashKickSuccessModal
                width={'640px'}
                handleCrossIconClick={mockCrossIconClick}
                handleCloseButtonClick={mockCloseButtonClick}
                handleViewButtonClick={mockViewButtonClick}
                isOpen={true}
            />
        );

        const closeButtonElement = screen.getByText('Close');
        const viewButtonElement = screen.getByText('View cash kicks');
        expect(closeButtonElement).toBeInTheDocument();
        expect(viewButtonElement).toBeInTheDocument();
        fireEvent.click(closeButtonElement);
        fireEvent.click(viewButtonElement);
        expect(mockCloseButtonClick).toHaveBeenCalled();
        expect(mockViewButtonClick).toHaveBeenCalled();
    });
});
