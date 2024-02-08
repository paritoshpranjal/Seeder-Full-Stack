import React from 'react';
import Typography from '../../atoms/Typography';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Icon, styled } from '@mui/material';
import { theme } from '../../../theme';
import { SUCCESS_CARD } from '../../../utils/constant';

export interface SuccessCardProps {
    width: string;
    email?: string;
    displayEmail: boolean;
}

const CustomStyledIcon = styled(Icon)({
    width: '32px',
    height: '32px'
});

const CustomStyledCheckIcon = styled(CheckCircleOutlineIcon)({
    width: '32px',
    height: '32px'
});

const CustomStyledTypography = styled(Typography)({
    maxWidth: '289px',
    color: theme.palette.text.disabled,
    '& span': {
        color: theme.palette.primary[400]
    }
});

const CustomStyledTypographyBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '0.12rem'
});

const MainBox = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.palette.elevation.color1,
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: '12px',
    padding: '24px',
    gap: '12px',
    height: '100%',
});

const SuccessCard = ({ width, email, displayEmail }: SuccessCardProps) => {
    return (
        <div>
            <MainBox width={width}>
                <CustomStyledIcon>
                    <CustomStyledCheckIcon color="primary" />
                </CustomStyledIcon>
                <CustomStyledTypographyBox>
                    <Typography variant="h3" color={theme.palette.text.primary}>
                        {displayEmail
                            ? SUCCESS_CARD.RESET_EMAIL
                            : SUCCESS_CARD.PASSWORD_SUCCESSFUL}
                    </Typography>
                    <CustomStyledTypography variant="body2">
                        {displayEmail ? (
                            <>
                                {SUCCESS_CARD.RESET_FIRST_PART}
                                {<span>{email}</span>}
                                {SUCCESS_CARD.RESET_SECOND_PART}
                            </>
                        ) : (
                            SUCCESS_CARD.PASSWORD_FOOTER
                        )}
                    </CustomStyledTypography>
                </CustomStyledTypographyBox>
            </MainBox>
        </div>
    );
};

export default SuccessCard;
