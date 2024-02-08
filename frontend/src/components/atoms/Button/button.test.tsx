import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import Button, { ButtonProps } from '.';

describe('Button Component', () => {
    it('Should render the button with the provided children and variant', () => {
        const buttonProps: ButtonProps = {
            children: 'Login',
            variant: 'contained',
        };
        render(<Button {...buttonProps} />);
        const button = screen.getByText('Login');
        expect(button).toBeInTheDocument();
    });

    it('Should invoke the provided handleClick function when the button is clicked', () => {
        const handleClick = jest.fn();
        const buttonProps: ButtonProps = {
            children: 'Login',
            variant: 'contained',
            handleClick,
        };
        render(<Button {...buttonProps} />);
        const button = screen.getByText('Login');
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('Should have default styles such as boxShadow and borderRadius', () => {
        const buttonProps: ButtonProps = {
            children: 'Login',
            variant: 'contained',
        };
        render(<Button {...buttonProps} />);
        const button = screen.getByText('Login');
        expect(button).toHaveStyle('box-shadow: none;');
        expect(button).toHaveStyle('border-radius: 12px;');
    });

});
