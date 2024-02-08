import React, { useEffect, useState } from 'react';
import TextField from '../../atoms/TextField';
import Typography from '../../atoms/Typography';
import { IconButton, InputAdornment, Stack } from '@mui/material';
import Icon from '../../atoms/Icon';
import lockIcon from '../../../../public/assets/icons/lock.svg';
import checkedLockIcon from '../../../../public/assets/icons/checkedLock.svg';
import smile from '../../../../public/assets/icons/smile.svg';
import checkedsmile from '../../../../public/assets/icons/checkedsmile.svg';
import notificationIcon from '../../../../public/assets/icons/notification.svg';
import checkedNotificationIcon from '../../../../public/assets/icons/checkedNotification.svg';
import visibilityOffIcon from '../../../../public/assets/icons/visibilityOff.svg';
import visibilityOnIcon from '../../../../public/assets/icons/visibilityOn.svg';
import google from '../../../../public/assets/icons/google.svg';
import stripe from '../../../../public/assets/icons/stripe.svg';
import xero from '../../../../public/assets/icons/xero.svg';
import {
    INVALID_EMAIL_MESSAGE,
    INVALID_NAME_MESSAGE,
    INVALID_PASSWORD_MESSAGE,
    SIGNUP,
    TOTAL_AMOUNT,
    emailRegexPattern,
    passwordRegexPattern
} from '../../../utils/constant/index';
import { theme } from '../../../theme';
import {
    MainBox,
    PasswordShowState,
    StyledContinueButton,
    StyledDivider,
    StyledFooterTypography,
    StyledSocialButton,
    StyledSocialTypography
} from '../Login';
import styled from '@emotion/styled';
import {
    getToken,
    getUserByEmailId,
    registerUser
} from '../../../services/calls';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../context';

export interface NewUser {
    name?: string;
    email?: string;
    password?: string;
}
interface SignUpProps {
    onLoginClick?: () => void;
    onGoogleLoginClick?: () => void;
}
const StyledContiner = styled.div`
    padding-top: 40px;
    margin-top: 2rem;
`;

const SignUp = ({ onGoogleLoginClick }: SignUpProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [passwordShowState, setPasswordShowState] =
        useState<PasswordShowState>({
            showPassword: false
        });
    const [isFocusedName, setIsFocusedName] = useState<boolean>(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState<boolean>(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState<boolean>(false);
    const [emailHelperText, setEmailHelperText] = useState<string>('');
    const [passwordHelperText, setPasswordHelperText] = useState<string>('');
    const [nameHelperText, setNameHelperText] = useState<string>('');
    const [validateUser, setValidateUser] = useState<boolean>(true);
    const navigate = useNavigate();
    const { loginWithRedirect, user, isAuthenticated } = useAuth0();
    const { currUser, handleUpdateCurrUser } = useUserContext();
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

    const isNameValid = (name: string) => {
        return name !== '' && name.length >= 5 && name.length <= 20;
    };
    const isEmailValid = (email: string) => {
        return emailRegexPattern.test(email);
    };

    const isPasswordValid = (password: string) => {
        return passwordRegexPattern.test(password);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        setName(name);
        if (!isNameValid(name)) {
            setIsButtonDisabled(true);
            setNameHelperText(INVALID_NAME_MESSAGE);
        } else {
            setIsButtonDisabled(
                !(
                    isEmailValid(email) &&
                    isPasswordValid(password) &&
                    isNameValid(name)
                )
            );
            setNameHelperText('');
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = e.target.value;
        if (!isEmailValid(emailValue)) {
            setEmail(emailValue);
            setIsButtonDisabled(true);
            setEmailHelperText(INVALID_EMAIL_MESSAGE);
        } else {
            setEmail(emailValue);
            setIsButtonDisabled(
                !(
                    isEmailValid(emailValue) &&
                    isPasswordValid(password) &&
                    isNameValid(name)
                )
            );
            setEmailHelperText('');
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = e.target.value;
        if (!isPasswordValid(passwordValue)) {
            setPassword(passwordValue);
            setIsButtonDisabled(true);
            setPasswordHelperText(INVALID_PASSWORD_MESSAGE);
        } else {
            setPassword(passwordValue);
            setIsButtonDisabled(
                !(
                    isEmailValid(email) &&
                    isPasswordValid(passwordValue) &&
                    isNameValid(name)
                )
            );
            setPasswordHelperText('');
        }
    };

    const saveUserData = () => {
        const newUser = {
            name: name,
            email: email,
            password: password
        };
        getUserByEmailId(email)
            ?.then(async (response) => {
                setValidateUser(false);
            })
            .catch(async (error) => {
                setValidateUser(true);
                const data = await registerUser(newUser);
                const user = {
                    email: email,
                    password: password
                };
                await getToken(user).then((res: any) =>
                    localStorage.setItem('token', res.data)
                );
                handleUpdateCurrUser(
                    data.id,
                    data.name,
                    data.email,
                    data.password,
                    data.availableCredit
                );
                localStorage.setItem('userData', JSON.stringify(data));
                navigate('/home');
            });
    };

    
    const handleGoogleLogin = () => {
        loginWithRedirect({
            appState: {
                returnTo: '/home'
            },
            authorizationParams: {
                connection: 'google-oauth2'
            }
        });
    };

    const handleLoginClick = () => {
        navigate('/login');
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
                    {SIGNUP.signUp}
                </Typography>
            </Stack>
            <Stack spacing={'2.25rem'} marginTop={'2.5rem'}>
                <TextField
                    type="name"
                    placeholder={SIGNUP.enterYourName}
                    onFocus={() => setIsFocusedName(true)}
                    onBlur={() => setIsFocusedName(false)}
                    onChange={handleNameChange}
                    value={name}
                    error={!!nameHelperText}
                    helperText={nameHelperText}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Icon
                                    src={isFocusedName ? checkedsmile : smile}
                                    alt="smile Icon"
                                />
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    type="email"
                    placeholder={SIGNUP.enterYourEmail}
                    onFocus={() => setIsFocusedEmail(true)}
                    onBlur={() => setIsFocusedEmail(false)}
                    onChange={handleEmailChange}
                    error={!!emailHelperText}
                    helperText={emailHelperText}
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
                    placeholder={SIGNUP.enterYourPassword}
                    onFocus={() => setIsFocusedPassword(true)}
                    onBlur={() => setIsFocusedPassword(false)}
                    onChange={handlePasswordChange}
                    value={password}
                    error={!!passwordHelperText}
                    helperText={passwordHelperText}
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

            <StyledContiner>
                {!validateUser && (
                    <Typography
                        variant="caption1"
                        color={theme.palette.text.secondary}
                        style={{ alignSelf: 'center' }}
                    >
                        User Already Exists
                    </Typography>
                )}
                <StyledContinueButton
                    variant="outlined"
                    fullWidth
                    disabled={isButtonDisabled}
                    data-testid="SignupButton"
                    handleClick={saveUserData}
                >
                    <Typography
                        variant="button1"
                        color={theme.palette.grey[500]}
                    >
                        {SIGNUP.signUpButton}
                    </Typography>
                </StyledContinueButton>
            </StyledContiner>

            <StyledDivider>
                <StyledSocialTypography variant="body1">
                    {SIGNUP.or}
                </StyledSocialTypography>
            </StyledDivider>

            <Stack direction={'row'} spacing={'1.25rem'} marginTop={'2rem'}>
                <StyledSocialButton
                    variant="outlined"
                    startIcon={<Icon src={google} alt={'Google'} />}
                    handleClick={handleGoogleLogin}
                >
                    <StyledSocialTypography variant="button1">
                        {SIGNUP.google}
                    </StyledSocialTypography>
                </StyledSocialButton>
                <StyledSocialButton
                    variant="outlined"
                    startIcon={<Icon src={stripe} alt={'Stripe'} />}
                >
                    <StyledSocialTypography variant="button1">
                        {SIGNUP.stripe}
                    </StyledSocialTypography>
                </StyledSocialButton>
                <StyledSocialButton
                    variant="outlined"
                    startIcon={<Icon src={xero} alt={'Xero'} />}
                >
                    <StyledSocialTypography variant="button1">
                        {SIGNUP.xero}
                    </StyledSocialTypography>
                </StyledSocialButton>
            </Stack>

            <StyledFooterTypography variant="h3" onClick={handleLoginClick}>
                {SIGNUP.account}
                {<span>{SIGNUP.login}</span>}
            </StyledFooterTypography>
        </MainBox>
    );
};

export default SignUp;
