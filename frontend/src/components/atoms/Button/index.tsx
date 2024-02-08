import React from 'react';
import MuiButton from '@mui/material/Button';
import { ButtonProps as MuiButtonProps, styled } from '@mui/material';

export interface ButtonProps extends MuiButtonProps {
    children: React.ReactNode;
    variant: 'outlined' | 'contained' | 'text';
    handleClick?: () => void;
}

const Button = ({ children, handleClick, ...props }: ButtonProps) => {

    const StyledButton = styled(MuiButton)({
        boxShadow: 'none',
        borderRadius: '12px',
        textTransform: 'none',
        '&:hover': {
            boxShadow: 'none',
        }
    });

    return (
        <StyledButton {...props} onClick={handleClick} disableRipple>
            {children}
        </StyledButton>
    );
};

export default Button;
