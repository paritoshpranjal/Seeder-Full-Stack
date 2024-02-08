import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Checkbox from '.';

describe('Checkbox Component', () => {
    test('should render checkbox component', () => {
        render(<Checkbox />);
        const checkboxElement = screen.getByRole('checkbox');
        expect(checkboxElement).toBeInTheDocument();
    });
    test('should toggle between checked and unchecked on click', () => {
        render(<Checkbox />);
        const checkboxElement = screen.getByRole('checkbox');
        fireEvent.click(checkboxElement);
        expect(checkboxElement).toBeChecked();
        fireEvent.click(checkboxElement);
        expect(checkboxElement).not.toBeChecked();
    });
});
