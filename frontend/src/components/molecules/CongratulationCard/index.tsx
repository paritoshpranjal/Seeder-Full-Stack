import React from 'react';
import { Box, styled } from '@mui/material';
import Typography from '../../atoms/Typography';
import congratsImage from '../../../../public/assets/images/image.svg';
import { theme } from '../../../theme';
import Button from '../../atoms/Button';

interface CongratulationCardProps {
    height?: string;
    buttonName: string;
    headingSentence: string;
    description: string;
    amount: string;
}

const StyledTypography = styled(Typography)({
    fontSize: '16',
    fontWeight: '500',
    color: theme.palette.text.primary,
    maxWidth: '265px'
});

const StyledButton = styled(Button)({
    border: '1px solid white',
    height: '59px',
    width: '163px',
    ':hover': {
        border: '1px solid white'
    },
    '&: span': {
        fontWeight: 'bold'
    }
});

const StyledContentBox = styled(Box)({
    paddingLeft: '2rem',
    paddingTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    height: '100%',
    paddingBottom: '1rem'
});

const MainBox = styled(Box)({
    width: '61.24vw',
    backgroundImage: `url(${congratsImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '12px'
});

export const CongratulationCard: React.FC<CongratulationCardProps> = ({
    height,
    buttonName,
    headingSentence,
    description,
    amount
}) => {
    return (
        <MainBox minHeight={height}>
            <StyledContentBox>
                <Box>
                    <Typography
                        variant={'h2'}
                        color={theme.palette.text.primary}
                        maxWidth={'265px'}
                    >
                        {headingSentence}
                    </Typography>
                    <StyledTypography variant={'h3'}>
                        {description}
                        <b>{amount}</b>
                    </StyledTypography>
                </Box>

                <StyledButton variant={'outlined'}>
                    <Typography
                        variant="button1"
                        color={theme.palette.text.primary}
                    >
                        {buttonName}
                    </Typography>
                </StyledButton>
            </StyledContentBox>
        </MainBox>
    );
};
