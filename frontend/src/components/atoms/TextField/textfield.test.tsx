import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextField from '.';

describe('TextField Component', () => {
    test('should render text field', () => {
        render(<TextField />);
        const textFieldElement = screen.getByRole('textbox');
        expect(textFieldElement).toBeInTheDocument();
    });
});
