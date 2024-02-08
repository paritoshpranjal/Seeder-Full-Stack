import React from 'react';
import Typography from '../../components/atoms/Typography';
import { YourContractsType } from '../interfaces';
import { theme } from '../../theme';
import { GridRenderCellParams } from '@mui/x-data-grid';
import Chip from '../../components/atoms/Chip';
import { Box, Skeleton, styled } from '@mui/material';
import { addMonths, differenceInCalendarDays } from 'date-fns';

export const SUCCESS_CARD = {
    RESET_EMAIL: 'Reset email sent',
    PASSWORD_SUCCESSFUL: 'Password reset successful',
    RESET_FIRST_PART: 'We have sent mail to ',
    RESET_SECOND_PART: ' with reset password instructions',
    PASSWORD_FOOTER: 'Click on button below to proceed to login'
};
export const MOCK_CONTRACT_DATA: YourContractsType[] = [
    {
        id: 1,
        name: 'Contract 1',
        type: 'Monthly',
        perPayment: 12000.25,
        termLength: 12,
        termRate: 12,
        paymentAmount: 126722.64,
        totalFinanced:"-",
        status:"Available",
        totalAvailable:1000,
        partialAmount:0  
    },
    {
        id: 2,
        name: 'Contract 2',
        type: 'Monthly',
        perPayment: 6000.0,
        termLength: 12,
        termRate: 12,
        paymentAmount: 21120.0,
        totalFinanced:"-",
        status:"Available",
        totalAvailable:1000,
        partialAmount:0
    },
    {
        id: 3,
        name: 'Contract 3',
        type: 'Monthly',
        perPayment: 6000,
        termLength: 12,
        termRate: 12,
        paymentAmount: 63360.0,
        totalFinanced:"-",
        status:"Available",
        totalAvailable:1000,
        partialAmount:0
    },
    {
        id: 4,
        name: 'Contract 4',
        type: 'Monthly',
        perPayment: 6000,
        termLength: 12,
        termRate: 12,
        paymentAmount: 63360.0,
        totalFinanced:"-",
        status:"Available",
        totalAvailable:1000,
        partialAmount:0
    },
    {
        id: 5,
        name: 'Contract 5',
        type: 'Monthly',
        perPayment: 6000,
        termLength: 12,
        termRate: 12,
        paymentAmount: 63360.0,
        totalFinanced:"-",
        status:"Available",
        totalAvailable:1000,
        partialAmount:0
    },
    {
        id: 6,
        name: 'Contract 6',
        type: 'Monthly',
        perPayment: 6000,
        termLength: 12,
        termRate: 12,
        paymentAmount: 63360.0,
        totalFinanced:"-",
        status:"Available",
        totalAvailable:1000,
        partialAmount:0
    }
];
export const headerTypography = {
    color: theme.palette.text.disabled
};
export const replaceNumberWithCommas = (value: number | string) => {
    return Number(value)
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const CONTRACTS_COLUMNS = [
    {
        field: 'name',
        renderHeader: () => (
            <Typography variant={'body2'} sx={headerTypography}>
                Name
            </Typography>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Typography variant={'body2'} color={theme.palette.text.primary}>
                {params.value}
            </Typography>
        ),
        sortable: false,
        flex: 1
    },
    {
        field: 'type',
        renderHeader: () => (
            <Typography variant={'body2'} sx={headerTypography}>
                Type
            </Typography>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Typography variant={'body2'} color={theme.palette.text.disabled}>
                {params.value}
            </Typography>
        ),
        headerName: 'Type',
        sortable: false,
        flex: 1
    },
    {
        field: 'perPayment',
        renderHeader: () => (
            <Typography variant={'body2'} sx={headerTypography}>
                Per payment
            </Typography>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Typography variant={'body2'} color={theme.palette.text.disabled}>
                ${replaceNumberWithCommas(params.value)}
            </Typography>
        ),
        sortable: false,
        flex: 1
    },
    {
        field: 'termLength',
        renderHeader: () => (
            <Typography variant={'body2'} sx={headerTypography}>
                Term length
            </Typography>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <Typography
                    variant={'body2'}
                    color={theme.palette.text.disabled}
                >
                    {params.value} months
                </Typography>
                <Typography
                    variant={'body2'}
                    color={theme.palette.text.disabled}
                >
                    12.0% fee
                </Typography>
            </Box>
        ),
        sortable: false,
        flex: 1
    },
    {
        field: 'paymentAmount',
        headerName: 'Payment amount',
        renderHeader: () => (
            <Typography variant={'body2'} sx={headerTypography}>
                Payment amount
            </Typography>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Typography variant={'body2'} color={theme.palette.text.disabled}>
               ${replaceNumberWithCommas(params.value)}
            </Typography>
        ),
        sortable: false,
        flex: 1
    }
];

export const newCashKick = {
    launchANewCash: 'Launch a new CashKick',
    youHave: 'You have up to ',
    available: ' available for a new cash advance',
    noCredit: '100% provided credit limit utilized',
    newCashButton: 'New Cash Kick',
    requestButton: 'Request Credit Increase'
};

export const formattedBalance = (totalBalance: number | undefined) => {
    return totalBalance?.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};
export const CREATE_NEW_CASH_KICK =
    'Place to create new cash kicks to run your business';
export const CASH_ACCELERATION = 'Cash acceleration';

export const login = {
    loginToSeeder: 'Login to Seeder ✨',
    subHeading: 'Enter your mail id and password to login',
    enterYourEmail: 'Enter your email id',
    enterYourPassword: 'Enter your password',
    forgotPassword: 'Forgot Password?',
    continue: 'Continue',
    or: 'Or',
    google: 'Google',
    stripe: 'Stripe',
    xero: 'Xero',
    doNotHave: 'Don’t have an account?',
    signUp: ' Sign Up',
    validUser: 'Valid User',
    invalidUser: 'Invalid Email or Password',
    fetchError: 'An error occurred while trying to log in.'
};

export const emailRegexPattern = /\S+@\S+\.\S+/;
export const passwordRegexPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const userDetails = {
    email: 'user@example.com',
    password: 'Abcd@1234'
};

export const BASE_URL = 'https://be-bc142.bootcamp64.tk/api/v1';

export const HELP = 'Help';
export const SETTINGS = 'Settings';
export const LOGOUT = 'Log Out';
export const EDIT_PROFILE = 'Edit Profile';
export const DEFAULT_USERNAME = 'Kane Cooper';
export const TERM_CAP = 'Term cap';
export const MANEGE_SUBSCRIPTION = 'Manage Subscriptions';

export const SIGNUP = {
    signUp: 'Sign Up ✨',
    enterYourName: 'Your Name',
    enterYourEmail: 'Email Address',
    enterYourPassword: 'Password',
    signUpButton: 'Sign Up',
    or: 'Or',
    google: 'Google',
    stripe: 'Stripe',
    xero: 'Xero',
    account: 'Already have an account?',
    login: '  Login',
    validUser: 'Valid User',
    invalidUser: 'Invalid User and Password',
    fetchError: 'An error occurred while trying to log in.'
};

export const CONNECTION_MESSAGE = 'oops! Failed to connect';
export const CONNECTION_STATUS =
    'Please contact customer support if this problem persists';
export const RETRY = 'Retry';
export const RATE = '(12.00%)';
export const CALCULATED_PERCENTAGE = (amount: number): string => {
    const percentage = (amount * 12) / 100;
    const formattedPercentage = percentage.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return formattedPercentage;
};
export const TERM = 'Term';
export const SELECTED_CONTRACTS = 'Selected contracts';
export const SLIDE = 'Slide to autoselect';
export const SUMMARY = 'Summary';
export const RESET = 'Reset';
export const SELECTED_OF = 'selected of';
export const PAYBACK_AMOUNT = 'Pay back amount';
export const RATE_PERCENTAGE = 'Rate %';
export const TOTAL_PAYOUT = 'Total Payout';
export const REVIEW_CREDIT = 'Review your credit';
export const SUBMIT_CREDIT = 'Submit your credit';
export const TWELVER_MONTHS = '12 months';
export const changePassword = {
    header: 'Change Password',
    newPassword: 'Enter your new password',
    confirmPassword: 'Re-enter your new password',
    passwordValidation: 'Password must contain at least 7 letters and 1 number',
    forgotPassword: 'Forgot Password',
    loginNow: 'Login Now',
    backgroundColor: '#18181C'
};

export const newCashKickModel = {
    title: 'Name your cash kick',
    subtitle: 'Add a name to identify your cash kick',
    label: 'Cash kick name',
    placeholder: 'Ex: marketing expenses',
    cancelButton: 'Cancel',
    createButton: 'Create cash kick',
    iconAlt: 'Cross Icon'
};

export const cashKickSuccessModal = {
    title: 'Cash kick launched successfully!',
    subtitle: 'We are reviewing your cash kick',
    yourCaskKickIsUnder: 'Your cash kick is under review',
    body: 'It will remain on pending state until we review it internally. This can take upto 5 mins to couple of hours. Once reviewed, the cash will be transferred to your account and you’ll be notified.',
    close: 'Close',
    viewCaskKicks: 'View cash kicks'
};
export const backgroundColor = '#18181C';
export const HOME = 'Home';
export const CASH = 'Cash Acceleration';
export const WATCH = 'Watch how to';
export const SEEDER = 'Seeder';

export const RESET_SCREEN_DATA = {
    RESET_PASSWORD: 'Enter Reset Code',
    RESET_CODE_INSTRUCTIONS:
        'Please enter reset code sent to your email to proceed further',
    CHANGE_PASSWORD: 'Change Password',
    PLACEHOLDER_TEXT: 'Enter reset code',
    PASSWORD_RULE: 'Password must contain at least 7 letters and 1 number',
    BUTTON1_TEXT: 'Reset Password',
    BUTTON2_TEXT: 'Change Password',
    GO_BACK: 'Go back to',
    LOGIN: 'Login'
};
export const INVALID_NAME_MESSAGE = 'Name should be of 5-20 characters';
export const INVALID_EMAIL_MESSAGE =
    'Email address should contains a valid username, "@" symbol, and a valid domain. ';
export const SHORT_PASSWORD_MESSAGE =
    'Password should contain atleast 8 characters';
export const INVALID_PASSWORD_MESSAGE =
    'Password must contain atleast one Uppercase,Lowercase,Digit,Special Character';
export const MOCK_USER = {
    id: 1,
    name: 'John',
    email: 'john@gmail.com',
    password: 'John@1234'
};

export const FORGOT_PASSWORD_DATA = {
    title: 'Forgot Password',
    subtitle:
        'No worries, we’ll send you link to your email id to reset your password',
    placeholder: 'Enter your email id',
    resetButton: 'Reset Password',
    label: 'Go back to ',
    loginButton: ' Login',
    validUser: 'Valid User',
    invalidUser: 'Invalid Email',
    resetMessage: 'Reset email sent',
    resetContent: 'We have sent mail to ',
    content: 'with reset password instructions',
    continueButton: 'Continue'
};

export const generateRandomId = (): number => {
    return Math.floor(Math.random() * 10000);
  };

export const YOUR_CONTRACTS="Your Contracts";
export const NEW_CASH_KICK="New cash kick";
export const BACK="Back";
export const homePage = {
    goodAfternoon: 'Good afternoon ✋',
    date: 'April 02, 2021',
    dueAmount: '$14,204.55',
    yourPayments: 'Your payments',
    paymentPending: 'You don’t have any payments pending',
    launchNew: 'Launch A new cash kick'
};
export const formatDate = (currentDate: Date) => {
    const newDate = new Date(currentDate);
    return `${newDate.toLocaleString('en-us', {
        month: 'short'
    })} ${newDate.getDate()}, ${newDate.getFullYear()}`;
};

export const currentDate = new Date();
const nextMonthDate = new Date(currentDate);
nextMonthDate.setMonth(currentDate.getMonth() + 1);

export const paymentCard = {
    date: `Due - ${formatDate(nextMonthDate)}`,
    dueAmount: '$14,204.55',
    outstandingAmount: 'Outstanding Amount'
};

export const paymentHeaderTypoStyles = {
    padding: '12px 20px',
    color: theme.palette.text.secondary
};

export const FirstColumnBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '12px 20px',
    gap: '8px',
    marginTop: '2.0rem',
    height: '55px',
    marginBottom: '1.7rem'
});

export const calculateNumberOfDays = (targetDate: string) => {
    const inputDate = new Date(targetDate);
    const currentDate = new Date();
    return Math.ceil(
        (inputDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
    );
};



export const paymentColumns = [
    {
        field: 'dueDate',
        flex: 1,
        sortable: false,
        renderHeader: () => (
            <Typography variant={'body2'} sx={headerTypography}>
                Due Date
            </Typography>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <FirstColumnBox>
                <Typography variant="body2" color={theme.palette.text.primary}>
                    {formatDate(params.value)}
                </Typography>
                <Typography
                    variant="caption"
                    color={theme.palette.text.secondary}
                >{`${calculateNumberOfDays(
                    params.value
                )} day(s) from now`}</Typography>
            </FirstColumnBox>
        )
    },
    {
        field: 'status',
        flex: 1,
        sortable: false,
        renderHeader: () => (
            <Typography variant={'body2'} sx={headerTypography}>
                Status
            </Typography>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <div style={{ padding: '12px 20px', marginLeft: '-1.0rem' }}>
                <Chip
                    variant={'body2'}
                    text={params.value}
                    bgcolor={theme.palette.elevation.color2}
                    borderRadius={'1'}
                    color={theme.palette.text.secondary}
                />
            </div>
        )
    },
    {
        field: 'expectedAmount',
        flex: 1,
        sortable: false,
        renderHeader: () => (
            <Typography variant={'body2'} sx={headerTypography}>
                Expected amount
            </Typography>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Typography variant={'body2'} sx={headerTypography}>
                {`-$${replaceNumberWithCommas(params.value)}`}
            </Typography>
        )
    },
    {
        field: 'outstanding',
        flex: 1,
        sortable: false,
        renderHeader: () => (
            <Typography variant={'body2'} sx={headerTypography}>
                Outstanding
            </Typography>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Typography variant={'body2'} sx={headerTypography}>
                {`$${replaceNumberWithCommas(params.value)}`}
            </Typography>
        )
    }
];

export const paymentData = (date: string, amount: number, userId: number) => {
    const dateObj = new Date(date);
    const signingDate = dateObj;
    let paymentDates: any = [];

    const amountPerMonth = (amount / 12).toFixed(2);
    for (let i = 1; i < 13; i++) {
        const nextPaymentDate = addMonths(signingDate, i);
        const formattedDate = nextPaymentDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        amount = amount - parseInt(amountPerMonth);

        const daysFromToday = differenceInCalendarDays(
            nextPaymentDate,
            new Date()
        );
        const dummyData = {
            id: daysFromToday,
            userID: userId,
            dueDate: {
                date: formattedDate,
                noOfDays: daysFromToday
            },
            status: 'Upcoming',
            expectedAmount: amountPerMonth,
            outstandingAmount: i === 12 ? 0 : amount.toFixed(2)
        };
        if (daysFromToday > 0) paymentDates = [...paymentDates, dummyData];
    }

    return paymentDates;
};

export const dueDate = (paymentDate: string): number => {
    const currentDate: Date = new Date();
    const targetDate: Date = new Date(paymentDate);

    const timeDifference: number = targetDate.getTime() - currentDate.getTime();
    const daysDifference: number = Math.ceil(
        timeDifference / (1000 * 60 * 60 * 24)
    );

    return Math.abs(daysDifference);
};

export const congratulationCard = {
    buttonName: 'Learn More',
    headingSentence: 'Congratulations you are ready to start!',
    description:
        'You are approved for funding. We are ready to advance you upto ',
    amount: '$8.8M'
};

export const USER={
    id: 0,
    name: "Kane Cooper",
    email: "kanee44cooper@gmail.com",
    password:"Kane@1234",
    availableCredit: 880000,
};
export const CASH_ACCELERATION_PAGE = {
    title: 'Cash accleration',
    subtitle: 'Place to create new cash kicks to run your business',
    termcap: 'Term cap',
    timePeriod: '12 months',
    credit: 'Available credit',
    rate: 'Max interest rate',
    percent: '12.00%',
    defaultContracts:
        'Connect your preferred payments or subscriptions platform to import contracts',
    defaultContent: 'subscriptions platform to import contracts',
    connect: 'Connect Now',
    failedStatus: 'oops! Failed to connect',
    myContracts: "My Contracts",
    myCashKicks: "My Cash Kicks",
    sync: 'Sync Now'
};

export const CASHKICK_COLUMNS = [
    {
        field: 'name',
        renderHeader: () => (
            <Typography variant={'body2'} sx={headerTypography}>
                Name
            </Typography>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Typography variant={'body2'} color={theme.palette.text.primary}>
                {params.value}
            </Typography>
        ),
        sortable: false,
        flex: 1
    },
    {
        field: 'status',
        renderHeader: () => (
            <Typography variant={'body2'} sx={headerTypography}>
                Status
            </Typography>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Chip
                variant={'body2'}
                text={params.value}
                bgcolor={theme.palette.elevation.color2}
                borderRadius={'4px'}
                color={theme.palette.text.secondary}
            />
        ),
        sortable: false,
        flex: 1
    },
    {
        field: 'maturity',
        renderHeader: () => (
            <Typography variant={'body2'} sx={headerTypography}>
                Maturity
            </Typography>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Typography variant="body2" color={theme.palette.text.disabled}>
                {formatDate(params.value)}
            </Typography>
        ),
        headerName: 'Maturity',
        sortable: false,
        flex: 1
    },
    {
        field: 'totalRecieved',
        renderHeader: () => (
            <Typography variant={'body2'} sx={headerTypography}>
                Total Recieved
            </Typography>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <Typography
                    variant={'body2'}
                    color={theme.palette.text.disabled}
                >
                    ${replaceNumberWithCommas(params.value)}
                </Typography>
                <Typography
                    variant={'body2'}
                    color={theme.palette.text.disabled}
                >
                    12.0% fee
                </Typography>
            </Box>
        ),
        sortable: false,
        flex: 1
    },
    {
        field: 'totalFinanced',
        renderHeader: () => (
            <Typography variant={'body2'} sx={headerTypography}>
                Total Financed
            </Typography>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Typography variant={'body2'} color={theme.palette.text.disabled}>
                ${replaceNumberWithCommas(params.value)}
            </Typography>
        ),
        sortable: false,
        flex: 1
    }
];

export const LOADING_COLUMNS = [
    {
        field: 'name',
        renderHeader: () => (
            <Typography variant={'body2'} sx={headerTypography}>
                Name
            </Typography>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Skeleton animation="wave" width="50%" height={40} />
        ),
        sortable: false,
        flex: 1
    },
    {
        field: 'type',
        renderHeader: () => (
            <Typography variant={'body2'} sx={headerTypography}>
                Type
            </Typography>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Skeleton animation="wave" width="50%" height={40} />
        ),
        headerName: 'Type',
        sortable: false,
        flex: 1
    },
    {
        field: 'perPayment',
        renderHeader: () => (
            <Typography variant={'body2'} sx={headerTypography}>
                Per payment
            </Typography>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Skeleton animation="wave" width="50%" height={40} />
        ),
        sortable: false,
        flex: 1
    },
    {
        field: 'termLength',
        renderHeader: () => (
            <Typography variant={'body2'} sx={headerTypography}>
                Term length
            </Typography>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Skeleton animation="wave" width="50%" height={40} />
        ),
        sortable: false,
        flex: 1
    },
    {
        field: 'paymentAmount',
        renderHeader: () => (
            <Typography variant={'body2'} sx={headerTypography}>
                Payment amount
            </Typography>
        ),
        renderCell: (params: GridRenderCellParams) => (
            <Skeleton animation="wave" width="50%" height={40} />
        ),
        sortable: false,
        flex: 1
    }
];

export const FORMAT_NUMBER = (value: number): string => {
    if (value % 1 !== 0) {
      return value.toFixed(2);
    } else {
      return value.toString();
    }
};

export const TOTAL_AMOUNT=880000;
