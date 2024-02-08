import React, { useEffect, useState } from 'react';
import CashTemplate from '../../components/templates/CashTemplate';
import {
    TOTAL_AMOUNT,
    congratulationCard,
    currentDate,
    dueDate,
    formatDate,
    homePage,
    paymentCard,
    paymentColumns,
    paymentData
} from '../../utils/constant';
import Typography from '../../components/atoms/Typography';
import { theme } from '../../theme';
import { Box, Stack, styled } from '@mui/material';
import NewCashKickCard from '../../components/molecules/NewCashKick';
import dataBlock from '../../../public/assets/icons/dataBlock.svg';
import circularProgress from '../../../public/assets/icons/circularProgress.svg';
import cheque from '../../../public/assets/images/cheque.svg';
import PaymentCard from '../../components/molecules/PaymentCard';
import Icon from '../../components/atoms/Icon';
import infoIcon from '../../../public/assets/icons/info-circle.svg';
import { Table } from '../../components/organisms/Table';
import {
    fetchTransaction,
    getToken,
    getUserByEmailId,
    registerUser
} from '../../services/calls';
import SideNavigation from '../../components/organisms/SideNavbar';
import { CongratulationCard } from '../../components/molecules/CongratulationCard';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context';
import { useAuth0 } from '@auth0/auth0-react';

const StyledPaymentBox = styled(Box)({
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginTop: '1.25rem',
    padding: '32px',
    gap: '20px',
    background: theme.palette.elevation.color1,
    borderRadius: '12px',
    marginLeft: '1.5rem',
    marginRight: '1.5rem',
    height: 'auto',
    '&::-webkit-scrollbar': {
        width: '8px',
        height: '8px'
    },

    '&::-webkit-scrollbar-track': {
        background: theme.palette.elevation.color2,
        height: '8px',
        borderRadius: '4px',
        padding: '4px 3px'
    },

    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.grey[700],
        borderRadius: '20px',
        height: '8px'
    }
});

const HomePage = () => {
    const [transaction, setTransaction] = useState<any>({
        id: 0,
        paymentDate: '',
        transactionAmount: 0
    });
    const { currUser, handleUpdateCurrUser } = useUserContext();
    const [value, setValue] = useState([]);
    const [userId, setUserId] = useState<number>(currUser.id);
    const navigate = useNavigate();
    const [greeting, setGreeting] = useState<string>('');
    const [initialRender, setInitialRender] = useState(true);
    const outstandingAmount = TOTAL_AMOUNT - currUser.availableCredit;
    const { user, isAuthenticated } = useAuth0();

    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) {
            setGreeting('Good Morning');
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Night');
        }
    }, [transaction, value, userId]);


    useEffect(() => {
        if (isAuthenticated && user && user.name) {
            const newUser = {
                name: user?.name,
                email: user?.email,
                password: 'Password@123',
                availableCredit: TOTAL_AMOUNT
            };

            getUserByEmailId(user?.email)
                ?.then(async (response) => {
                    const user = {
                        email: response.data.email,
                        password: 'Password@123'
                    };
                    await getToken(user).then((res: any) =>
                        localStorage.setItem('token', res.data)
                    );
                    handleUpdateCurrUser(
                        response.data.id,
                        response.data.name,
                        response.data.email,
                        response.data.password,
                        response.data.availableCredit
                    );
                    localStorage.setItem(
                        'userData',
                        JSON.stringify(response.data)
                    );
                    fetchTransactionData(response.data.id);
                })
                .catch(async (err) => {
                    const data = await registerUser(newUser);
                    const user = {
                        email: newUser?.email,
                        password: 'Password@123'
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
                    fetchTransactionData(data.id);
                });
                
        }
        const storedUser = localStorage.getItem('userData');
        setUserId(storedUser ? JSON.parse(storedUser).id : 0);
       
    }, [isAuthenticated, user,userId,transaction,value]);
    
    const fetchTransactionData = async (userId: number) => {
        try {
            const response = await fetchTransaction(userId);
            setTransaction(response.data);
            const data = paymentData(
                response.data[0].dueDate,
                outstandingAmount,
                userId
            );
            const updateData = data.map((item: any, index: number) => {
                const homePage = {
                    id: index + 1,
                    dueDate: new Date(item.dueDate.date),
                    status: item.status,
                    expectedAmount: item.expectedAmount,
                    outstanding: item.outstandingAmount
                };
                return homePage;
            });
            setValue(updateData);
        } catch (error) {
            console.error('Error fetching transaction data:', error);
        }
    };

    useEffect(()=>{
        if(!isAuthenticated){
            fetchTransactionData(currUser.id)
        }
    },[])

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
          
          if (!isAuthenticated && currUser.id===0) {
            console.log("login")
            window.location.href = '/login';}
        }, 500);
        return () => clearTimeout(redirectTimeout);
      }, [isAuthenticated, currUser]);

    return (
        <div>
            <CashTemplate
                heading={
                    <Typography
                        variant="title"
                        color={theme.palette.text.primary}
                    >
                        {greeting} ✋
                    </Typography>
                }
                message={formatDate(currentDate).toString()}
                navItem={<SideNavigation selectedItem={'Home'} />}
            >
                <Stack
                    direction={'row'}
                    gap={'1.5rem'}
                    justifyContent={'space-between'}
                    alignSelf={'stretch'}
                    marginRight={'1.5rem'}
                    marginLeft={'1.5rem'}
                >
                    {value.length === 0 ? (
                        <CongratulationCard
                            buttonName={congratulationCard.buttonName}
                            headingSentence={congratulationCard.headingSentence}
                            description={congratulationCard.description}
                            amount={congratulationCard.amount}
                            height={'30vh'}
                        />
                    ) : (
                        <>
                            <PaymentCard
                                dueDateState={true}
                                iconSrc={dataBlock}
                                iconAlt={'data-block'}
                                footerText={paymentCard.date}
                                amount={outstandingAmount / 12}
                                dueDate={`Due in ${dueDate(
                                    paymentCard.date
                                )} day(s)`}
                            />
                            <PaymentCard
                                dueDateState={false}
                                iconSrc={circularProgress}
                                iconAlt={'circular-progress'}
                                footerText={paymentCard.outstandingAmount}
                                amount={outstandingAmount}
                            />
                        </>
                    )}

                    <NewCashKickCard
                        credit={currUser.availableCredit}
                        haveBalance={true}
                        disabled={false}
                        onClick={() => navigate('/new-cash-kick')}
                    />
                </Stack>
                <StyledPaymentBox>
                    <Stack direction={'row'} gap={'.5rem'}>
                        <Typography
                            variant="h2"
                            color={theme.palette.text.primary}
                        >
                            {homePage.yourPayments}
                        </Typography>
                        <Icon
                            src={infoIcon}
                            alt={'info-icon'}
                            style={{
                                width: '20px'
                            }}
                        />
                    </Stack>
                    <Table
                        width={'100%'}
                        columns={paymentColumns}
                        rows={value.length === 0 ? [] : value}
                    />
                    {value.length === 0 && (
                        <Stack
                            direction={'column'}
                            alignSelf={'center'}
                            marginTop={'-8rem'}
                        >
                            <Icon
                                src={cheque}
                                alt={''}
                                style={{
                                    width: '80%',
                                    height: '70%'
                                }}
                            />
                            <Typography
                                variant="h3"
                                color={theme.palette.text.disabled}
                            >
                                {homePage.paymentPending}
                            </Typography>
                            <Typography
                                variant="button1"
                                color={theme.palette.primary[400]}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {homePage.launchNew}
                            </Typography>
                        </Stack>
                    )}
                </StyledPaymentBox>
            </CashTemplate>
        </div>
    );
};

export default HomePage;
