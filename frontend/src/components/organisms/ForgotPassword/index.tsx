import React, { useEffect, useState } from 'react';
import TextField from '../../atoms/TextField';
import Typography from '../../atoms/Typography';
import { Box, InputAdornment, Stack, styled } from '@mui/material';
import Icon from '../../atoms/Icon';
import notificationIcon from '../../../../public/assets/icons/notification.svg';
import checkedNotificationIcon from '../../../../public/assets/icons/checkedNotification.svg';
import tick from '../../../../public/assets/icons/tickCircle.svg';
import {
    FORGOT_PASSWORD_DATA,
    emailRegexPattern
} from '../../../utils/constant/index';
import { theme } from '../../../theme';
import { getAllUsersDetail, getUserByEmailId } from '../../../services/calls';
import { User } from '../../../utils/interfaces';
import { StyledContinueButton } from '../Login';

interface ForgotProps {
    onLoginClick?: () => void;
    onContinueClick?: () => void;
}

export const StyledErrorBox = styled(Box)({
    marginTop: '2rem'
});

const OuterBox = styled(Box)({
    width: '100%',
    height: '100%',
    maxWidth: theme.spacing(108.5)
});

const ResetBox = styled(Box)({
    borderRadius: theme.spacing(3),
    border: `1px solid ${theme.palette.grey[300]}`,
    background: theme.palette.elevation.color1,
    display: 'flex',
    width: '100%',
    padding: theme.spacing(6),
    alignItems: 'flex-start',
    gap: theme.spacing(3)
});

const InnerBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.spacing(0.5)
});

const StyledLogin = styled(Typography)({
    paddingTop: '5px',
    cursor: 'pointer'
});

const ForgotPassword = ({ onLoginClick, onContinueClick }: ForgotProps) => {
    const [email, setEmail] = useState('');
    const [userData, setUserData] = useState<User[]>([]);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [status, setStatus] = useState<string>('');
    const [isFocusedEmail, setIsFocusedEmail] = useState<boolean>(false);

    const isMailValid = (email: string) => {
        return emailRegexPattern.test(email);
    };

    const handleEmail = (e: any) => {
        const emailValue = e.target.value;
        if (!isMailValid(emailValue)) {
            setEmail(emailValue);
            setIsButtonDisabled(true);
        } else {
            setEmail(emailValue);
            setIsButtonDisabled(!isMailValid(emailValue));
        }
    };

    const handleForgotButton = () => {
        getUserByEmailId(email)
            ?.then(async (response) => {
                setStatus(FORGOT_PASSWORD_DATA.validUser);
                localStorage.setItem('userData', JSON.stringify(response.data));
            })
            .catch(async (error) => {
                setStatus(FORGOT_PASSWORD_DATA.invalidUser);
            });
    };
    return (
        <OuterBox>
            <Stack direction={'column'} spacing={'.25rem'}>
                <Typography variant="h1" color={theme.palette.text.primary}>
                    {FORGOT_PASSWORD_DATA.title}
                </Typography>
                <Typography variant="h3" color={theme.palette.text.disabled}>
                    {FORGOT_PASSWORD_DATA.subtitle}
                </Typography>
            </Stack>

            <Stack spacing={'1.25rem'} marginTop={'2.5rem'}>
                {status !== FORGOT_PASSWORD_DATA.validUser ? (
                    <>
                        <TextField
                            type="email"
                            placeholder={FORGOT_PASSWORD_DATA.placeholder}
                            onFocus={() => setIsFocusedEmail(true)}
                            onBlur={() => setIsFocusedEmail(false)}
                            onChange={handleEmail}
                            value={email}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Icon
                                            src={
                                                isFocusedEmail
                                                    ? checkedNotificationIcon
                                                    : notificationIcon
                                            }
                                            alt="Notification Icon"
                                        />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <StyledContinueButton
                            variant="outlined"
                            fullWidth
                            handleClick={handleForgotButton}
                            disabled={isButtonDisabled}
                            data-testid="ResetButton"
                        >
                            <Typography
                                variant="button1"
                                color={theme.palette.grey[500]}
                            >
                                {FORGOT_PASSWORD_DATA.resetButton}
                            </Typography>
                        </StyledContinueButton>

                        <StyledErrorBox>
                            <Typography color={'red'}>{status}</Typography>
                        </StyledErrorBox>

                        <Stack direction="row" spacing="8px">
                            <Typography
                                variant="h3"
                                color={theme.palette.text.disabled}
                            >
                                {FORGOT_PASSWORD_DATA.label}
                            </Typography>
                            <StyledLogin
                                variant="button1"
                                color={theme.palette.primary[400]}
                                onClick={onLoginClick}
                            >
                                {FORGOT_PASSWORD_DATA.loginButton}
                            </StyledLogin>
                        </Stack>
                    </>
                ) : (
                    <>
                        <ResetBox>
                            <Icon src={tick} alt="tick-icon" />
                            <InnerBox>
                                <Typography
                                    variant="h3"
                                    color={theme.palette.text.primary}
                                >
                                    {FORGOT_PASSWORD_DATA.resetMessage}
                                </Typography>
                                <Stack
                                    direction={'row'}
                                    spacing={theme.spacing(0.5)}
                                >
                                    <Typography
                                        variant="body2"
                                        color={theme.palette.text.disabled}
                                    >
                                        {FORGOT_PASSWORD_DATA.resetContent}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color={theme.palette.primary[400]}
                                    >
                                        {email}
                                    </Typography>
                                </Stack>
                                <Typography
                                    variant="body2"
                                    color={theme.palette.text.disabled}
                                >
                                    {FORGOT_PASSWORD_DATA.content}
                                </Typography>
                            </InnerBox>
                        </ResetBox>

                        <StyledContinueButton
                            variant="outlined"
                            fullWidth
                            handleClick={onContinueClick}
                            data-testid="ContinueButton"
                        >
                            <Typography
                                variant="button1"
                                color={theme.palette.grey[500]}
                            >
                                {FORGOT_PASSWORD_DATA.continueButton}
                            </Typography>
                        </StyledContinueButton>
                    </>
                )}
            </Stack>
        </OuterBox>
    );
};

export default ForgotPassword;
