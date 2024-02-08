import React, { useState } from 'react';
import TextField from '../../atoms/TextField';
import Button from '../../atoms/Button';
import Typography from '../../atoms/Typography';
import {
    Box,
    Divider,
    IconButton,
    InputAdornment,
    Stack,
    styled
} from '@mui/material';
import Icon from '../../atoms/Icon';
import lockIcon from '../../../../public/assets/icons/lock.svg';
import checkedLockIcon from '../../../../public/assets/icons/checkedLock.svg';
import notificationIcon from '../../../../public/assets/icons/notification.svg';
import checkedNotificationIcon from '../../../../public/assets/icons/checkedNotification.svg';
import visibilityOffIcon from '../../../../public/assets/icons/visibilityOff.svg';
import visibilityOnIcon from '../../../../public/assets/icons/visibilityOn.svg';
import google from '../../../../public/assets/icons/google.svg';
import stripe from '../../../../public/assets/icons/stripe.svg';
import xero from '../../../../public/assets/icons/xero.svg';
import {
    backgroundColor,
    emailRegexPattern,
    login,
    passwordRegexPattern
} from '../../../utils/constant/index';
import { theme } from '../../../theme';
import {
    getAllUsersDetail,
    getToken,
    getUserByEmailId
} from '../../../services/calls';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../context';

export interface PasswordShowState {
    showPassword: boolean;
}

interface LoginProps {
    onForgotClick?: () => void;
    onSignupClick?: () => void;
    onGoogleLoginClick?: () => void;
}

export const StyledContinueButton = styled(Button)({
    height: '59px',
    marginTop: '1.25rem',
    backgroundColor: theme.palette.primary.main,
    ':hover': {
        backgroundColor: theme.palette.primary.main
    },
    ':disabled': {
        color: theme.palette.grey[500],
        backgroundColor: theme.palette.primary.main,
        opacity: '56%'
    }
});

export const StyledErrorBox = styled(Box)({
    marginTop: '2rem'
});

export const StyledForgotTypography = styled(Typography)({
    color: theme.palette.primary[400]
});

export const StyledForgotButton = styled(Button)({
    ':hover': {
        backgroundColor: backgroundColor
    },
    marginTop: '1.5rem',
    cursor: 'pointer'
});

export const StyledDivider = styled(Divider)({
    color: theme.palette.text.primary,
    marginTop: '2.75rem',
    marginBottom: '2.75rem',
    '&.MuiDivider-root': {
        '&::before': {
            borderTop: `thin solid ${theme.palette.grey[600]}`
        },
        '&::after': {
            borderTop: `thin solid ${theme.palette.grey[600]}`
        }
    }
});

export const StyledSocialTypography = styled(Typography)({
    color: theme.palette.text.secondary
});

export const StyledSocialButton = styled(Button)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '96px',
    gap: '.5rem',
    padding: '20px 40px',
    borderRadius: '12px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#201F24',
    borderColor: '#201F24',
    '& .MuiButton-startIcon': {
        margin: 0
    }
});

export const StyledFooterTypography = styled(Typography)({
    color: theme.palette.text.disabled,
    '& span': {
        color: theme.palette.primary.main
    },
    cursor: 'pointer',
    marginTop: '2.75rem'
});

export const MainBox = styled(Box)({
    width: '100%',
    height: '100%'
});

const Login = ({
    onForgotClick,
    onSignupClick,
    onGoogleLoginClick
}: LoginProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [passwordShowState, setPasswordShowState] =
        useState<PasswordShowState>({
            showPassword: false
        });
    const [status, setStatus] = useState('');
    const [isFocusedEmail, setIsFocusedEmail] = useState<boolean>(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState<boolean>(false);
    const { loginWithRedirect } = useAuth0();
    const navigate = useNavigate();
    const { handleUpdateCurrUser } = useUserContext();

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

    const isEmailValid = (email: string) => {
        return emailRegexPattern.test(email);
    };

    const isPasswordValid = (password: string) => {
        return passwordRegexPattern.test(password);
    };

    const handleEmailChange = (e: any) => {
        const emailValue = e.target.value;
        if (!isEmailValid(emailValue)) {
            setEmail(emailValue);
            setIsButtonDisabled(true);
        } else {
            setEmail(emailValue);
            setIsButtonDisabled(
                !(isEmailValid(emailValue) && isPasswordValid(password))
            );
        }
    };

    const handlePasswordChange = (e: any) => {
        const passwordValue = e.target.value;
        if (!isPasswordValid(passwordValue)) {
            setPassword(passwordValue);
            setIsButtonDisabled(true);
        } else {
            setPassword(passwordValue);
            setIsButtonDisabled(
                !(isEmailValid(email) && isPasswordValid(passwordValue))
            );
        }
    };

    const handleLoginButton = async () => {
        const credentials = {
            email: email,
            password: password
        };
        await getToken({ ...credentials })
            .then(async (res: any) => {
                localStorage.setItem('token', res.data);
                await getUserByEmailId(credentials.email)?.then((userRes) => {
                    const userDetails = userRes.data;
                    localStorage.setItem(
                        'userData',
                        JSON.stringify(userDetails)
                    );
                    handleUpdateCurrUser(
                        userDetails.id,
                        userDetails.name,
                        userDetails.email,
                        userDetails.password,
                        userDetails.availableCredit
                    );
                });
                navigate('/home');
            })
            .catch(() => {
                setStatus(login.invalidUser);
            });
    };

    const handleGoogleSignUp = () => {
        loginWithRedirect({
            appState: {
                returnTo: '/home'
            },
            authorizationParams: {
                connection: 'google-oauth2'
            }
        });
    };

    const handleSignUpClick = () => {
        navigate('/');
    };

    const handleForgotClick = () => {
        navigate('/forgot');
    };
    return (
        <MainBox>
            <Stack direction={'column'} spacing={'.25rem'}>
                <Typography
                    variant="h1"
                    color={theme.palette.text.primary}
                    fontWeight={700}
                    fontSize={'36px'}
                >
                    {login.loginToSeeder}
                </Typography>
                <Typography variant="h3" color={theme.palette.text.disabled}>
                    {login.subHeading}
                </Typography>
            </Stack>

            <Stack spacing={'2.25rem'} marginTop={'2.5rem'}>
                <TextField
                    type="email"
                    placeholder={login.enterYourEmail}
                    onFocus={() => setIsFocusedEmail(true)}
                    onBlur={() => setIsFocusedEmail(false)}
                    onChange={handleEmailChange}
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
                <TextField
                    type={passwordShowState.showPassword ? 'text' : 'password'}
                    placeholder={login.enterYourPassword}
                    onFocus={() => setIsFocusedPassword(true)}
                    onBlur={() => setIsFocusedPassword(false)}
                    onChange={handlePasswordChange}
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
                                    onMouseDown={handleMouseDownPassword}
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
            </Stack>
            <StyledForgotButton variant={'text'}>
                <StyledForgotTypography
                    variant="button1"
                    onClick={handleForgotClick}
                >
                    {login.forgotPassword}
                </StyledForgotTypography>
            </StyledForgotButton>

            <StyledContinueButton
                variant="outlined"
                fullWidth
                handleClick={handleLoginButton}
                disabled={isButtonDisabled}
                data-testid="ContinueButton"
            >
                <Typography variant="button1" color={theme.palette.grey[500]}>
                    {login.continue}
                </Typography>
            </StyledContinueButton>

            <StyledErrorBox>
                <Typography color={'red'}>{status}</Typography>
            </StyledErrorBox>

            <StyledDivider>
                <StyledSocialTypography variant="body1">
                    {login.or}
                </StyledSocialTypography>
            </StyledDivider>

            <Stack direction={'row'} spacing={'1.25rem'} marginTop={'2rem'}>
                <StyledSocialButton
                    variant="outlined"
                    startIcon={<Icon src={google} alt={'Google'} />}
                    handleClick={handleGoogleSignUp}
                >
                    <StyledSocialTypography variant="button1">
                        {login.google}
                    </StyledSocialTypography>
                </StyledSocialButton>
                <StyledSocialButton
                    variant="outlined"
                    startIcon={<Icon src={stripe} alt={'Stripe'} />}
                >
                    <StyledSocialTypography variant="button1">
                        {login.stripe}
                    </StyledSocialTypography>
                </StyledSocialButton>
                <StyledSocialButton
                    variant="outlined"
                    startIcon={<Icon src={xero} alt={'Xero'} />}
                >
                    <StyledSocialTypography variant="button1">
                        {login.xero}
                    </StyledSocialTypography>
                </StyledSocialButton>
            </Stack>

            <StyledFooterTypography variant={'h3'} onClick={handleSignUpClick}>
                {login.doNotHave}
                {<span>{login.signUp}</span>}
            </StyledFooterTypography>
        </MainBox>
    );
};

export default Login;
