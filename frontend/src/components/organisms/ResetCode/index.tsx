import React from 'react';
import { Grid, InputAdornment, Link, Stack, styled } from '@mui/material';
import Icon from '../../atoms/Icon';
import Typography from '../../atoms/Typography';
import TextField from '../../atoms/TextField';
import Button from '../../atoms/Button';
import { theme } from '../../../../src/theme';
import moreicon from '../../../../public/assets/icons/more.svg';
import { RESET_SCREEN_DATA, backgroundColor } from '../../../utils/constant';
import { useNavigate } from 'react-router-dom';

export interface ResetCodeProps{
  handleButtonClick?: () => void;
}

const {
    RESET_PASSWORD,
    RESET_CODE_INSTRUCTIONS,
    BUTTON1_TEXT,
    PLACEHOLDER_TEXT,
    GO_BACK,
    LOGIN
} = RESET_SCREEN_DATA;

const StyledButton = styled(Button)({
  height: 65,
  borderRadius: theme.spacing(3),
  textTransform: 'none',
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.dark,
  },
  '&.Mui-disabled': {
    color: theme.palette.text.disabled,
    backgroundColor: theme.palette.primary[600],
  },
  width: '100%',
});

const ResetPassword = ({handleButtonClick}:ResetCodeProps) => {
    const [inputValue, setInputValue] = React.useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const isButtonDisabled = !/^\d{8}$/.test(inputValue);

    return (
        <Grid
            container
            display={'flex'}
            direction={'column'}
            maxWidth={theme.spacing(150)}
            bgcolor={backgroundColor}
            padding={theme.spacing(2)}
        >
            <Grid item>
                <Stack spacing={theme.spacing(2)}>
                    <Typography
                        variant="title"
                        color={theme.palette.text.primary}
                        data-testid="resetcode"
                    >
                        {RESET_PASSWORD}
                    </Typography>
                    <Typography
                        variant="h3"
                        color={theme.palette.text.disabled}
                        data-testid="enterresetcode"
                    >
                        {RESET_CODE_INSTRUCTIONS}
                    </Typography>
                </Stack>
            </Grid>

            <Grid item paddingTop={theme.spacing(8)}>
                <Grid item>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Icon
                                        src={moreicon}
                                        alt="Notification Icon"
                                    />
                                </InputAdornment>
                            )
                        }}
                        data-testid="input-field"
                        value={inputValue}
                        placeholder={PLACEHOLDER_TEXT}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setInputValue(event.target.value);
                        }}
                        style={{
                            height: '56px',
                            background: '#262529',
                            border: '1px solid #413F4D',
                            borderRadius: '12px'
                        }}
                    />
                </Grid>
                <Grid item sx={{ flex: 1 }} paddingTop={theme.spacing(8)}>
                    <StyledButton
                        disabled={isButtonDisabled}
                        data-testid="button"
                        variant={'text'}
                        handleClick={handleButtonClick}
                    >
                        <Typography color={theme.palette.text.primary}>
                            {BUTTON1_TEXT}
                        </Typography>
                    </StyledButton>
                </Grid>
            </Grid>
            <Grid item paddingTop={theme.spacing(8)}>
                <Grid container spacing={2} alignItems={'center'}>
                    <Grid item>
                        <Typography color={theme.palette.text.disabled}>
                            {GO_BACK}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Link
                            href="#"
                            underline="none"
                            data-testid="login"
                            onClick={handleLogin}
                        >
                            <Typography
                                variant="subtitle1"
                                color={theme.palette.primary[400]}
                            >
                                {LOGIN}
                            </Typography>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ResetPassword;
