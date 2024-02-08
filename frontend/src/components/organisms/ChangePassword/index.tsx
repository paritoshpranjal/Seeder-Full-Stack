import { Box, IconButton, InputAdornment, Stack, styled } from '@mui/material';
import React, { useState } from 'react';
import Typography from '../../atoms/Typography';
import { theme } from '../../../theme';
import { changePassword, passwordRegexPattern } from '../../../utils/constant';
import TextField from '../../atoms/TextField';
import Icon from '../../atoms/Icon';
import lockIcon from '../../../../public/assets/icons/lock.svg';
import checkedLockIcon from '../../../../public/assets/icons/checkedLock.svg';
import visibilityOffIcon from '../../../../public/assets/icons/visibilityOff.svg';
import visibilityOnIcon from '../../../../public/assets/icons/visibilityOn.svg';
import Button from '../../atoms/Button';
import { updatePasswordByUserId } from '../../../services/calls';
import SuccessCard from '../../molecules/SuccessCard';
import { useUserContext } from '../../../context';

export interface ChangePasswordProps {
    onLoginClick?: () => void;
}

interface PasswordShowState {
    showPassword: boolean;
}

const StyledHeaderTypography = styled(Typography)({
    color: theme.palette.text.primary
});

const StyledFooterTypography = styled(Typography)({
    color: theme.palette.text.disabled,
    marginTop: '1rem'
});

const StyledButtonTypography = styled(Typography)({
    color: theme.palette.grey[500]
});

const StyledButton = styled(Button)({
    width: '100%',
    height: '59px',
    marginTop: '1.5rem',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.main
    },
    '&:disabled': {
        color: theme.palette.grey[500],
        backgroundColor: theme.palette.primary.main,
        opacity: '56%'
    }
});

const MainBox = styled(Box)({
    width: '100%',
    height: '100%'
});

const ChangePassword = ({ onLoginClick }: ChangePasswordProps) => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [isSuccess, setIsSuccess] = useState<boolean>(true);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [passwordShowState, setPasswordShowState] =
        useState<PasswordShowState>({
            showPassword: false
        });
    const [isFocusedUpdatedPassword, setIsFocusedUpdatedPassword] =
        useState<boolean>(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState<boolean>(false);
    const { currUser } = useUserContext();

    const toggleShowPassword = () => {
        setPasswordShowState((prevState) => ({
            ...prevState,
            showPassword: !prevState.showPassword
        }));
    };

    const handleMouseDownPassword = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
    };

    const userDataString = localStorage.getItem('userData');

    const isPasswordValid = (password: string) => {
        return passwordRegexPattern.test(password);
    };

    const validatePassword = () => {
        return confirmPassword !== password;
    };

    const handleFirstPasswordField = (e: any) => {
        const passwordValue = e.target.value;
        if (!isPasswordValid(passwordValue)) {
            setPassword(passwordValue);
            setIsButtonDisabled(true);
        } else {
            setPassword(passwordValue);
            setIsButtonDisabled(
                !isPasswordValid(passwordValue) ||
                    !isPasswordValid(confirmPassword)
            );
        }
    };

    const handleSecondPasswordField = (e: any) => {
        const passwordValue = e.target.value;
        if (!isPasswordValid(passwordValue)) {
            setConfirmPassword(passwordValue);
            setIsButtonDisabled(true);
        } else {
            setConfirmPassword(passwordValue);
            setIsButtonDisabled(
                !isPasswordValid(passwordValue) || !isPasswordValid(password)
            );
        }
    };

    const handleButtonClick = async () => {
        try {
            if (userDataString !== null) {
                const userId = JSON.parse(userDataString);
                const response = await updatePasswordByUserId(
                    userId.id,
                    confirmPassword
                );

                if (response.status === 200) {
                    setIsSuccess(false);
                }
            }
        } catch (error) {}
    };

    return (
        <MainBox>
            {isSuccess ? (
                <>
                    <StyledHeaderTypography variant="title">
                        {changePassword.header}
                    </StyledHeaderTypography>
                    <Stack
                        direction={'column'}
                        gap={'1.25rem'}
                        marginTop={'2.5rem'}
                    >
                        <TextField
                            type={
                                passwordShowState.showPassword
                                    ? 'text'
                                    : 'password'
                            }
                            placeholder={changePassword.newPassword}
                            onFocus={() => setIsFocusedPassword(true)}
                            onBlur={() => setIsFocusedPassword(false)}
                            onChange={handleFirstPasswordField}
                            value={password}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon
                                            src={
                                                isFocusedPassword
                                                    ? checkedLockIcon
                                                    : lockIcon
                                            }
                                            alt="Lock Icon"
                                        />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={toggleShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                            data-testid="toggle-show-password-button"
                                        >
                                            {passwordShowState.showPassword ? (
                                                <Icon
                                                    src={visibilityOffIcon}
                                                    alt="Visibility Off Icon"
                                                />
                                            ) : (
                                                <Icon
                                                    src={visibilityOnIcon}
                                                    alt="Visibility On Icon"
                                                />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <TextField
                            type={'password'}
                            placeholder={changePassword.confirmPassword}
                            onFocus={() => setIsFocusedUpdatedPassword(true)}
                            onBlur={() =>
                                setTimeout(
                                    () => setIsFocusedUpdatedPassword(false),
                                    1000
                                )
                            }
                            disabled={!isPasswordValid(password)}
                            onChange={handleSecondPasswordField}
                            value={confirmPassword}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon
                                            src={
                                                isFocusedUpdatedPassword
                                                    ? checkedLockIcon
                                                    : lockIcon
                                            }
                                            alt="Lock Update"
                                        />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Stack>
                    <StyledFooterTypography variant="body2">
                        {changePassword.passwordValidation}
                    </StyledFooterTypography>
                    <StyledButton
                        variant="outlined"
                        disabled={validatePassword() || isButtonDisabled}
                        handleClick={handleButtonClick}
                        data-testid="changePassword"
                    >
                        <StyledButtonTypography variant="button1">
                            {changePassword.header}
                        </StyledButtonTypography>
                    </StyledButton>
                </>
            ) : (
                <div data-testid="errorMessage">
                    <StyledHeaderTypography
                        variant="title"
                        data-testid="nextPage"
                    >
                        {changePassword.forgotPassword}
                    </StyledHeaderTypography>
                    <Stack spacing={'1.5rem'} marginTop={'2.5rem'}>
                        <SuccessCard width={'100%'} displayEmail={false} />
                        <StyledButton
                            variant="outlined"
                            handleClick={onLoginClick}
                        >
                            <StyledButtonTypography variant="button1">
                                {changePassword.loginNow}
                            </StyledButtonTypography>
                        </StyledButton>
                    </Stack>
                </div>
            )}
        </MainBox>
    );
};

export default ChangePassword;
