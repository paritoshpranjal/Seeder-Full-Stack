import { Box, Card, Stack, styled } from '@mui/material';
import React from 'react';
import { theme } from '../../../theme';
import Typography from '../../atoms/Typography';
import { formattedBalance } from '../../../utils/constant';
import Icon from '../../atoms/Icon';
import infoIcon from '../../../../public/assets/icons/info-circle.svg';

export interface PaymentCardProps {
    dueDate?: string;
    dueDateState: boolean;
    iconSrc: string;
    iconAlt: string;
    footerText: string;
    amount: number;
}

const StyledHeaderTypography = styled(Typography)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.elevation.color1,
    backgroundColor: theme.palette.accent.pink,
    borderRadius: '4px',
    padding: '4px 8px',
    maxWidth: '123px',
    alignSelf: 'flex-end'
});

const StyledIconBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '2.5rem'
});

const CustomCard = styled(Card)({
    minHeight: '30vh',
    borderRadius: '12px',
    padding: '32px',
    gap: '8px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.elevation.color1,
    width: '100%'
});

const PaymentCard = ({
    dueDate,
    dueDateState,
    iconSrc,
    iconAlt,
    footerText,
    amount
}: PaymentCardProps) => {
    return (
        <CustomCard>
            {dueDateState ? (
                <StyledHeaderTypography variant="body2">
                    {dueDate}
                </StyledHeaderTypography>
            ) : (
                <Box data-testid='box-id' sx={{ minHeight: '13px' }} />
            )}

            <StyledIconBox>
                <Icon
                    src={iconSrc}
                    alt={iconAlt}
                    style={{
                        width: '80px'
                    }}
                />
                <Stack direction={'row'} gap={'.5rem'}>
                    <Typography
                        variant="body1"
                        color={theme.palette.text.secondary}
                    >
                        {footerText}
                    </Typography>
                    <Icon
                        src={infoIcon}
                        alt={'info-icon'}
                        style={{
                            width: '16px'
                        }}
                    />
                </Stack>
            </StyledIconBox>
            <Typography variant="h2">${formattedBalance(amount)}</Typography>
        </CustomCard>
    );
};

export default PaymentCard;
