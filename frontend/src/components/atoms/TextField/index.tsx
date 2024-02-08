import React from 'react';
import {
    TextField as MUITextField,
    TextFieldProps as MUITextFieldProps,
    styled
} from '@mui/material';
import { theme } from '../../../theme';

const CustomField = styled(MUITextField)({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: theme.palette.grey[600]
        },
        '&:hover fieldset': {
            borderColor: theme.palette.grey[600]
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary[400]
        }
    },
    '& .MuiOutlinedInput-input': {
        ...theme.typography.body1,
        color: theme.palette.text.secondary,
        padding: '0.5rem',
        height: '1rem'
    },
    '& .MuiInputBase-root': {
        borderRadius: '12px',
        height: '56px',
        background: `${theme.palette.grey[100]}`,
        color: `${theme.palette.text.secondary}`,
        padding: `${theme.spacing(3)} ${theme.spacing(4)}`
    },
    '& .MuiFormHelperText-root': {
        marginLeft: 0
    }
});
const TextField: React.FC<MUITextFieldProps> = (props: MUITextFieldProps) => {
    return <CustomField fullWidth autoComplete="off" {...props} />;
};

export default TextField;
