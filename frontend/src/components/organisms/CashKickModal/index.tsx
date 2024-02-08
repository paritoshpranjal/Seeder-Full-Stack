import { Box, Stack, styled, Modal } from '@mui/material';
import React, { useState } from 'react';
import { theme } from '../../../theme';
import Typography from '../../atoms/Typography';
import { newCashKickModel } from '../../../utils/constant';
import TextField from '../../atoms/TextField';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import crossIcon from '../../../../public/assets/icons/crossIcon.svg';

export interface CashKickModalProps {
    width: string;
    isOpen: boolean;
    handleCrossIconClick: () => void;
    handleCancelClick: () => void;
    handleCreateClick: () => void;
    onNameChange: (newName: string) => void;
}

const StyledTitleTypography = styled(Typography)({
    color: theme.palette.text.primary
});

const StyledSubtitleTypography = styled(Typography)({
    color: theme.palette.text.disabled
});

const StyledLabel = styled(Typography)({
    color: theme.palette.text.disabled
});

const StyledCancelButton = styled(Button)({
    width: '133px',
    minHeight: '60px',
    backgroundColor: theme.palette.elevation.color2,
    borderColor: theme.palette.elevation.color2,
    '&:hover': {
        backgroundColor: theme.palette.elevation.color2,
        borderColor: theme.palette.elevation.color2
    }
});

const StyledCreateButton = styled(Button)({
    width: '208px',
    minHeight: '60px',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.main
    },
    ':disabled': {
        color: theme.palette.grey[500],
        backgroundColor: theme.palette.primary.main,
        opacity: '56%'
    }
});

const StyledHeaderStack = styled(Stack)({
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem'
});

const StyledTextFieldStack = styled(Stack)({
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: '0.5rem',
    marginBottom: '3.5rem'
});

const StyledButtonStack = styled(Stack)({
    justifyContent: 'flex-end',
    gap: '0.5rem',
    alignSelf: 'stretch'
});

const StyledTextField = styled(TextField)({
    '& .MuiInputBase-root': {
        background: theme.palette.grey[200]
    }
});

const StyleBox = styled(Box)({
    minHeight: '363px',
    borderRadius: '12px',
    backgroundColor: theme.palette.grey[100],
    padding: '24px'
});

const CenteredModal = styled(Modal)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(4px)'
});

const CashKickModal = ({
    width,
    handleCrossIconClick: onCrossIconClick,
    handleCancelClick: onCancelClick,
    handleCreateClick: onCreateClick,
    onNameChange,
    isOpen
}: CashKickModalProps) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleTextFieldChange = (e: any) => {
        const nameValue = e.target.value.trim();
        if (nameValue !== '') {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
        onNameChange(nameValue);
    };

    return (
        <CenteredModal open={isOpen}>
            <StyleBox width={width}>
                <StyledHeaderStack direction={'row'}>
                    <Stack direction={'column'}>
                        <StyledTitleTypography variant="h1">
                            {newCashKickModel.title}
                        </StyledTitleTypography>
                        <StyledSubtitleTypography variant="h3">
                            {newCashKickModel.subtitle}
                        </StyledSubtitleTypography>
                    </Stack>
                    <Icon
                        src={crossIcon}
                        alt={newCashKickModel.iconAlt}
                        onClick={onCrossIconClick}
                    />
                </StyledHeaderStack>
                <StyledTextFieldStack direction={'column'}>
                    <StyledLabel>{newCashKickModel.label}</StyledLabel>
                    <StyledTextField
                        variant="outlined"
                        placeholder={newCashKickModel.placeholder}
                        onChange={handleTextFieldChange}
                    />
                </StyledTextFieldStack>
                <StyledButtonStack direction={'row'}>
                    <StyledCancelButton
                        variant={'outlined'}
                        handleClick={onCancelClick}
                    >
                        <Typography
                            variant="button1"
                            color={theme.palette.text.secondary}
                        >
                            {newCashKickModel.cancelButton}
                        </Typography>
                    </StyledCancelButton>
                    <StyledCreateButton
                        variant={'outlined'}
                        handleClick={onCreateClick}
                        disabled={isButtonDisabled}
                        data-testid={'create-button'}
                    >
                        <Typography
                            variant="button1"
                            color={theme.palette.grey[500]}
                        >
                            {newCashKickModel.createButton}
                        </Typography>
                    </StyledCreateButton>
                </StyledButtonStack>
            </StyleBox>
        </CenteredModal>
    );
};

export default CashKickModal;
