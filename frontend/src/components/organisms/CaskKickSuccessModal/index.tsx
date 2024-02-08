import React from 'react';
import Button from '../../atoms/Button';
import Typography from '../../atoms/Typography';
import Icon from '../../atoms/Icon';
import { theme } from '../../../theme';
import crossIcon from '../../../../public/assets/icons/crossIcon.svg';
import reviewIcon from '../../../../public/assets/images/reviewIcon.gif';
import { Box, Modal, Stack, styled } from '@mui/material';
import {
    cashKickSuccessModal,
    newCashKickModel
} from '../../../utils/constant';

export interface CashKickSuccessModalProps {
    isOpen: boolean;
    width: string;
    handleCrossIconClick: () => void;
    handleCloseButtonClick: () => void;
    handleViewButtonClick: () => void;
}

const CenteredModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const StyledTitleTypography = styled(Typography)({
    color: theme.palette.text.primary
});

const StyledSubtitleTypography = styled(Typography)({
    color: theme.palette.text.disabled
});

const StyledHeaderStack = styled(Stack)({
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4rem'
});

const StyledProgressIconBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    alignContent: 'flex-start'
});

const StyledProgressIcon = styled(Icon)({
    width: '172px',
    maxHeight: '172px'
});

const StyledBodyTypography = styled(Typography)({
    color: theme.palette.text.disabled,
    textAlign: 'center'
});
const StyledBodyBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: '2rem',
    gap: '0.5rem',
    marginBottom: '4.5rem'
});

const StyledCloseButton = styled(Button)({
    width: '122px',
    minHeight: '60px',
    backgroundColor: theme.palette.elevation.color2,
    borderColor: theme.palette.elevation.color2,
    '&:hover': {
        backgroundColor: theme.palette.elevation.color2,
        borderColor: theme.palette.elevation.color2
    }
});

const StyledViewCashButton = styled(Button)({
    width: '198px',
    minHeight: '60px',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.main
    }
});

const StyledButtonStack = styled(Stack)({
    justifyContent: 'flex-end',
    gap: '0.5rem',
    alignSelf: 'stretch'
});

const StyledMainBox = styled(Box)({
    minHeight: '584px',
    borderRadius: '12px',
    backgroundColor: theme.palette.grey[100],
    padding: '24px'
});
const CashKickSuccessModal = ({
    width,
    handleCrossIconClick,
    handleCloseButtonClick,
    handleViewButtonClick,
    isOpen
}: CashKickSuccessModalProps) => {
    return (
        <CenteredModal open={isOpen}>
        <StyledMainBox width={width}>
            <StyledHeaderStack direction={'row'}>
                <Stack direction={'column'}>
                    <StyledTitleTypography variant="h1">
                        {cashKickSuccessModal.title}
                    </StyledTitleTypography>
                    <StyledSubtitleTypography variant="h3">
                        {cashKickSuccessModal.subtitle}
                    </StyledSubtitleTypography>
                </Stack>
                <Icon
                    src={crossIcon}
                    alt={newCashKickModel.iconAlt}
                    onClick={handleCrossIconClick}
                />
            </StyledHeaderStack>
            <StyledProgressIconBox>
                <StyledProgressIcon src={reviewIcon} alt={'review-icon'} />
            </StyledProgressIconBox>
            <StyledBodyBox>
                <StyledTitleTypography variant="h2">
                    {cashKickSuccessModal.yourCaskKickIsUnder}
                </StyledTitleTypography>
                <StyledBodyTypography variant="body1">
                    {cashKickSuccessModal.body}
                </StyledBodyTypography>
            </StyledBodyBox>
            <StyledButtonStack direction={'row'}>
                <StyledCloseButton
                    variant={'outlined'}
                    handleClick={handleCloseButtonClick}
                >
                    <Typography
                        variant="button1"
                        color={theme.palette.text.secondary}
                    >
                        {cashKickSuccessModal.close}
                    </Typography>
                </StyledCloseButton>
                <StyledViewCashButton
                    variant={'outlined'}
                    handleClick={handleViewButtonClick}
                    data-testid={'create-button'}
                >
                    <Typography
                        variant="button1"
                        color={theme.palette.grey[500]}
                    >
                        {cashKickSuccessModal.viewCaskKicks}
                    </Typography>
                </StyledViewCashButton>
            </StyledButtonStack>
        </StyledMainBox>
        </CenteredModal>
    );
};

export default CashKickSuccessModal;
