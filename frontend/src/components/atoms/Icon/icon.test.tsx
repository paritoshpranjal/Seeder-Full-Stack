import React from 'react';
import '@testing-library/jest-dom';
import Google from '../../../../public/assets/icons/google.svg';
import Icon, { IconProps }  from '.';
import { render, fireEvent, screen } from '@testing-library/react';

describe('Icon Component', () => {
    it('should render Icon properly with styles', () => {
        const iconProps: IconProps = {
            src: Google,
            alt: 'Google Icon',
            style: { width: '50px', height: '50px' }
        };
        render(<Icon {...iconProps} />);
        const icon = screen.getByAltText('Google Icon');
        expect(icon).toBeInTheDocument();
        expect(icon.style.width).toBe('50px');
        expect(icon.style.height).toBe('50px');
    });

    it('should invoke the onClick handler when the Icon is clicked', () => {
        const handleClick = jest.fn();
        const iconProps: IconProps = {
            src: Google,
            alt: 'Google Icon',
            onClick: handleClick
        };
        const { getByAltText } = render(<Icon {...iconProps} />);
        const image = getByAltText('Google Icon') as HTMLImageElement;
        fireEvent.click(image);
        expect(handleClick).toHaveBeenCalledTimes(1)
    });
});
