import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CashKickModal from '.';

describe('Cashkick Component', () => {
    test('it should render correctly typography correctly', () => {
        const mockCrossIconClick = jest.fn();
        const mockCancelIconClick = jest.fn();
        const mockCreateIconClick = jest.fn();
        render(
            <CashKickModal
                width={'640px'}
                handleCrossIconClick={mockCrossIconClick}
                handleCancelClick={mockCancelIconClick}
                handleCreateClick={mockCreateIconClick}
                isOpen={true} onNameChange={jest.fn()}            />
        );
        const titleElement = screen.getByText('Name your cash kick');
        const subTitleElement = screen.getByText(
            'Add a name to identify your cash kick'
        );
        const createButtonElement = screen.getByText('Create cash kick');

        expect(titleElement).toBeInTheDocument();
        expect(subTitleElement).toBeInTheDocument();
        expect(createButtonElement).toBeInTheDocument();
    });

    test('it should show the disable state of textfield component', () => {
        const mockCrossIconClick = jest.fn();
        const mockCancelIconClick = jest.fn();
        const mockCreateIconClick = jest.fn();
        render(
            <CashKickModal
                width={'640px'}
                handleCrossIconClick={mockCrossIconClick}
                handleCancelClick={mockCancelIconClick}
                handleCreateClick={mockCreateIconClick}
                isOpen={true} onNameChange={jest.fn()}            />
        );

        const placeholderElement = screen.getByPlaceholderText(
            'Ex: marketing expenses'
        );
        const createButtonElement = screen.getByTestId('create-button');
        expect(placeholderElement).toBeInTheDocument();
        expect(createButtonElement).toBeDisabled();

        fireEvent.change(placeholderElement, {
            target: { value: ' ' }
        });

        expect(createButtonElement).toBeDisabled();
    });

    test('it should show the enabled state of textfield component', () => {
        const mockCrossIconClick = jest.fn();
        const mockCancelIconClick = jest.fn();
        const mockCreateIconClick = jest.fn();
        render(
            <CashKickModal
                width={'640px'}
                handleCrossIconClick={mockCrossIconClick}
                handleCancelClick={mockCancelIconClick}
                handleCreateClick={mockCreateIconClick}
                isOpen={true} onNameChange={jest.fn()}            />
        );

        const placeholderElement = screen.getByPlaceholderText(
            'Ex: marketing expenses'
        );
        const createButtonElement = screen.getByTestId('create-button');
        expect(placeholderElement).toBeInTheDocument();
        expect(createButtonElement).toBeDisabled();

        fireEvent.change(placeholderElement, {
            target: { value: 'John' }
        });
    });
});
