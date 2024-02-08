import React from 'react';
import Icon from '../../atoms/Icon';
import Typography from '../../atoms/Typography';
import { theme } from '../../../theme';
import { Box, styled } from '@mui/material';

interface ContentStatusProps {
    imgSrc: string;
    connectionStatus?: string;
    message?: string;
    buttonText?: string;
}

const StyledContentBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
});

const StyledIcon = styled(Icon)({
    height: '160px',
    width: '230px',
    marginBottom: '20px'
});

const StyledButtonText = styled(Typography)({
    marginTop: '8px'
});

const ContentStatus = (props: ContentStatusProps) => {
    return (
        <StyledContentBox>
            <StyledIcon src={props.imgSrc} alt="connection-status" />

            {props.connectionStatus && (
                <Typography variant="h3" color={theme.palette.grey[400]}>
                    {props.connectionStatus}
                </Typography>
            )}

            {props.message && (
                <Typography
                    variant="caption1"
                    color={theme.palette.text.disabled}
                >
                    {props.message}
                </Typography>
            )}

            {props.buttonText && (
                <StyledButtonText
                    variant="button1"
                    color={theme.palette.primary[400]}
                >
                    {props.buttonText}
                </StyledButtonText>
            )}
        </StyledContentBox>
    );
};

export default ContentStatus;
