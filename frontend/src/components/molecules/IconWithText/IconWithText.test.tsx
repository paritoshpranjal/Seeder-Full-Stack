import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IconWithText, { IconWithTextProps } from '.';

describe('IconWithText Component', () => {
    const defaultProps: IconWithTextProps = {
        src: 'icon-src',
        text: 'Example Text',
        alt: 'Icon Alt',
        onClick: jest.fn(),
        isClicked: false
    };

    it('should render with default props', () => {
        const { getByText, getByAltText } = render(
            <IconWithText {...defaultProps} isClicked={true} />
        );
        const textElement = getByText('Example Text');
        const iconElement = getByAltText('Icon Alt');

        expect(textElement).toBeInTheDocument();
        expect(iconElement).toBeInTheDocument();
    });

    it('should call onClick prop when clicked', () => {
        render(<IconWithText {...defaultProps} isLogOut={true} />);
        const navItem = screen.getByText('Example Text');
        fireEvent.click(navItem);

        expect(defaultProps.onClick).toHaveBeenCalled();
    });
});
