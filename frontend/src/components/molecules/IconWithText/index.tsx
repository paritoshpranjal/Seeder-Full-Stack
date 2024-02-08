import React from 'react';
import Icon from '../../atoms/Icon';
import { Box, styled } from '@mui/material';
import Typography from '../../atoms/Typography';
import { theme } from '../../../theme';

export interface IconWithTextProps {
    src: string;
    text: string;
    alt: string;
    onClick?: () => void;
    isClicked?: boolean;
    isLogOut?: boolean;
}

const IconWithText = (props: IconWithTextProps) => {
    const NavItem = styled(Box)({
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        gap: '12px',
        '&:hover': {
            cursor: 'pointer'
        },
        backgroundColor: props.isClicked ? theme.palette.elevation.color2 : '',
        borderRadius: '12px',
        flexWrap: 'unset'
    });

    let textColor;
    if (props.isLogOut) {
        textColor = theme.palette.primary[100];
    } else if (props.isClicked) {
        textColor = theme.palette.text.primary;
    } else {
        textColor = theme.palette.text.disabled;
    }

    return (
        <NavItem onClick={props.onClick}>
            <Icon src={props.src} alt={props.alt} />
            <Typography variant="button2" color={textColor} width={'100%'}>
                {props.text}
            </Typography>
        </NavItem>
    );
};

export default IconWithText;
