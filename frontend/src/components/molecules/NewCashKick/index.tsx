import { Box, Card, styled } from '@mui/material';
import React from 'react';
import { theme } from '../../../theme';
import Typography from '../../atoms/Typography';
import { formattedBalance, newCashKick } from '../../../utils/constant';
import Button from '../../atoms/Button';

export interface NewCashKickProps {
    credit: number;
    haveBalance: boolean;
    disabled: boolean;
    onClick?: () => void;
}

const StyledHeaderTypography = styled(Typography)({
    color: theme.palette.text.primary,
    maxWidth: '259px',
    marginBottom: '.75rem'
});

const StyledBodyTypography = styled(Typography)({
    color: theme.palette.text.disabled,
    maxWidth: '276px',
    '& span': {
        color: theme.palette.text.secondary,
        fontWeight: 700
    }
});

const StyledActionButton = styled(Button)({
    width: '100%',
    maxHeight: '59px',
    borderRadius: '12px',
    padding: '20px 40px',
    marginTop: '2.25rem',
    '&.Mui-disabled': {
        color: theme.palette.grey[500],
        backgroundColor: theme.palette.primary.main,
        opacity: '56%'
    },
    ':hover': {
        backgroundColor: theme.palette.primary.main
    }
});

const StyledMainCard = styled(Card)({
    backgroundColor: theme.palette.elevation.color1,
    border: `1px solid ${theme.palette.grey[300]}`,
    width: '340px',
    minHeight: '30vh',
    borderRadius: '12px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '@media (max-width: 930px)': {
        width: '100%',
        maxWidth: '100%',
    }
});

const NewCashKickCard = ({
    credit,
    haveBalance,
    disabled,
    onClick
}: NewCashKickProps) => {
    return (
        <div>
            <StyledMainCard>
                <Box>
                    <StyledHeaderTypography variant="h2">
                        {haveBalance
                            ? newCashKick.launchANewCash
                            : newCashKick.noCredit}
                    </StyledHeaderTypography>
                    <StyledBodyTypography variant="body1">
                        <StyledBodyTypography variant="body1">
                            {haveBalance ? (
                                <>
                                    {newCashKick.youHave}
                                    {<span>${formattedBalance(credit)}</span>}
                                    {newCashKick.available}
                                </>
                            ) : (
                                <>
                                    {newCashKick.youHave}
                                    {<span>${formattedBalance(0)}</span>}
                                    {newCashKick.available}
                                </>
                            )}
                        </StyledBodyTypography>
                    </StyledBodyTypography>
                </Box>
                <StyledActionButton
                    disabled={disabled}
                    variant="contained"
                    handleClick={onClick}
                >
                    <Typography variant="button1">
                        {haveBalance
                            ? newCashKick.newCashButton
                            : newCashKick.requestButton}
                    </Typography>
                </StyledActionButton>
            </StyledMainCard>
        </div>
    );
};

export default NewCashKickCard;
