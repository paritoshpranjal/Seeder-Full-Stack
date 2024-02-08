import React, { useEffect, useState } from 'react';
import { Box, Stack, styled } from '@mui/material';
import { theme } from '../../theme';
import Typography from '../../components/atoms/Typography';
import { LoanDetails } from '../../components/molecules/LoanDetailsCard';
import SideNavigation from '../../components/organisms/SideNavbar';
import CashTemplate from '../../components/templates/CashTemplate';
import {
    CASHKICK_COLUMNS,
    CASH_ACCELERATION_PAGE,
    CONNECTION_STATUS,
    CONTRACTS_COLUMNS,
    FORMAT_NUMBER,
    LOADING_COLUMNS,
    RETRY,
    homePage
} from '../../utils/constant';
import CalenderLogo from '../../../public/assets/icons/calendar.svg';
import InfoIcon from '../../../public/assets/icons/info-circle.svg';
import document from '../../../public/assets/icons/document.svg';
import sync from '../../../public/assets/icons/sync.svg';
import percent from '../../../public/assets/icons/percentage.svg';
import cheque from '../../../public/assets/images/cheque.svg';
import contract from '../../../public/assets/images/default.svg';
import NewCashKickCard from '../../components/molecules/NewCashKick';
import Icon from '../../components/atoms/Icon';
import Button from '../../components/atoms/Button';
import { Table } from '../../components/organisms/Table';
import {
    fetchCashKickContract,
    fetchCashKicks,
    fetchContracts
} from '../../services/calls';
import { ContractPropType, MyContractType } from '../../utils/interfaces';
import ContentStatus from '../../components/molecules/ContentStatus';
import Warning from '../../../public/assets/icons/warning.svg';
import { useUserContext } from '../../context';
import { useNavigate } from 'react-router-dom';

const OuterBox = styled(Stack)({
    width: '100%',
    padding: '48px',
    alignItems: 'center',
    gap: '2.13%',
    borderRadius: '12px',
    border: '1px solid var(--border-low-emp, #28272B)',
    background: theme.palette.elevation.color1
    // justifyContent: 'space-between'
});

const CashBox = styled(Box)({
    width: '29%'
});

const TableBox = styled(Box)({
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginTop: '1.25rem',
    width: '97.7%',
    padding: '32px',
    gap: '20px',
    border: '1px solid var(--border-low-emp, #28272B)',
    background: theme.palette.elevation.color1,
    borderRadius: '12px',
    height: 'auto'
});

const StyledButton = styled(Button)({
    width: '147px',
    height: '43px'
});

const button1Styles = {
    backgroundColor: theme.palette.primary[600],
    border: `1px solid ${theme.palette.primary[400]}`
};
const button2Styles = {
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[600]}`
};

const ContentStack = styled(Stack)({
    alignSelf: 'center',
    marginTop: '-60px'
});

const connectStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
};

const ContractIconStyle = {
    width: '261.724px',
    height: '140px',
    marginLeft: '50px',
    marginTop: '-99px'
};

const CheckIconStyle = {
    width: '80%',
    height: '80%',
    marginTop: '-69px'
};

const CashStack = styled(Stack)({
    alignSelf: 'center',
    marginTop: '-30px'
});

const SyncBox = styled(Box)({
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'center',
    gap: '8px'
});

const OuterSync = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginRight: '10px'
});

const SyncTypography = styled(Typography)({
    marginTop: '4px'
});

const CashAccelerationPage = () => {
    const [activeButton, setActiveButton] = useState<boolean>(true);
    const [contractValue, setContractValue] = useState<MyContractType[]>([]);
    const [cashKickValue, setCashKickValue] = useState([]);
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { currUser, handleUpdateAvailableCredit } = useUserContext();

    const navigate = useNavigate();
    const userId = currUser.id;

    const fetchCashKicksData = async () => {
        try {
            const response = await fetchCashKicks(userId);
            const updateData = response.data.map((item: any, index: number) => {
                const CashPage = {
                    id: index + 1,
                    name: item.name,
                    status: item.status,
                    maturity: new Date(item.maturity),
                    totalRecieved: item.totalReceived,
                    totalFinanced: item.totalFinanced
                };
                return CashPage;
            });
            setCashKickValue(updateData);
            const contractIds = response.data.map((item: any) => item.id);
            myContractsData(contractIds);
        } catch (error) {
            setError(true);
            console.error('Error fetching transaction data:', error);
        }
    };

    const myContractsData = async (contractIds: number[]) => {
        setLoading(true);
        const res: number[] = [];
        for (const id of contractIds) {
            try {
                const response = await fetchCashKickContract(id);

                const currentContractIds = response.data.map(
                    (item: any) => item.contractId
                );
                res.push(...currentContractIds);
            } catch {
                setError(true);
                console.error('Error fetching cashKickContract data:', error);
            }
        }
        const contractData: ContractPropType[] = [];
        for (const id of res) {
            try {
                const response = await fetchContracts(id);
                if (response.data) {
                    contractData.push(response.data);
                } else {
                    console.error(
                        `Invalid response data for ID ${id}. Expected data to exist.`
                    );
                }
            } catch (error) {
                setError(true);
                console.error('Error fetching contract data:', error);
            }
        }
        setLoading(false);
        const mapContractData = (item: any, index: number) => {
            return {
                id: index + 1,
                name: item.name,
                perPayment: item.perPayment,
                type: item.type,
                termLength: item.termLength,
                paymentAmount: item.paymentAmount
            };
        };
        const myData = contractData.map(mapContractData);
        setContractValue(myData);
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchCashKicksData();
        };
        fetchData();
    }, [activeButton]);

    const handleCaskickClick = () => {
        setActiveButton(true);
    };

    const handleContractClick = () => {
        setActiveButton(false);
    };

    return (
        <div>
            <CashTemplate
                heading={
                    <Typography
                        variant="title"
                        color={theme.palette.text.primary}
                    >
                        {CASH_ACCELERATION_PAGE.title}
                    </Typography>
                }
                message={CASH_ACCELERATION_PAGE.subtitle}
                navItem={<SideNavigation selectedItem={'Cash Acceleration'} />}
            >
                <Box marginLeft={'1.5rem'} marginTop={6}>
                    <Stack
                        direction={'row'}
                        gap={'1.5rem'}
                        justifyContent={'space-between'}
                        marginRight={'1.5rem'}
                    >
                        <OuterBox direction={'row'}>
                            <LoanDetails
                                logoSrc={CalenderLogo}
                                iconSrc={InfoIcon}
                                iconAlt="info-icon"
                                title={CASH_ACCELERATION_PAGE.termcap}
                                caption={CASH_ACCELERATION_PAGE.timePeriod}
                                captionVariant="h2"
                                captionColor={theme.palette.text.primary}
                                titleCaptionGap="12px"
                            />
                            <LoanDetails
                                logoSrc={document}
                                iconSrc={InfoIcon}
                                iconAlt="info-icon"
                                title={CASH_ACCELERATION_PAGE.credit}
                                caption={`$${FORMAT_NUMBER(
                                    currUser.availableCredit / 10000
                                )}K`}
                                captionVariant="h2"
                                captionColor={theme.palette.text.primary}
                                titleCaptionGap="12px"
                            />
                            <LoanDetails
                                logoSrc={percent}
                                iconSrc={InfoIcon}
                                iconAlt="info-icon"
                                title={CASH_ACCELERATION_PAGE.rate}
                                caption={CASH_ACCELERATION_PAGE.percent}
                                captionVariant="h2"
                                captionColor={theme.palette.text.primary}
                                titleCaptionGap="12px"
                            />
                        </OuterBox>
                        <NewCashKickCard
                            credit={currUser.availableCredit}
                            haveBalance={true}
                            disabled={false}
                            onClick={() => {
                                navigate('/new-cash-kick');
                            }}
                        />
                    </Stack>
                    <TableBox>
                        <OuterSync>
                            <Stack direction={'row'} gap={'.5rem'}>
                                <Typography
                                    variant="h2"
                                    color={theme.palette.text.primary}
                                >
                                    {CASH_ACCELERATION_PAGE.title}
                                </Typography>
                                <Icon
                                    src={InfoIcon}
                                    alt={'info-icon'}
                                    style={{
                                        width: '20px'
                                    }}
                                />
                            </Stack>
                            <SyncBox>
                                <Icon src={sync} alt={'sync-icon'} />
                                <SyncTypography
                                    variant="button1"
                                    color={theme.palette.primary[400]}
                                >
                                    {CASH_ACCELERATION_PAGE.sync}
                                </SyncTypography>
                            </SyncBox>
                        </OuterSync>
                        <Stack direction={'row'} gap={6}>
                            <StyledButton
                                variant={'outlined'}
                                style={
                                    activeButton ? button2Styles : button1Styles
                                }
                                handleClick={handleContractClick}
                            >
                                <Typography
                                    variant="button1"
                                    color={
                                        activeButton
                                            ? theme.palette.text.secondary
                                            : theme.palette.primary[400]
                                    }
                                >
                                    {CASH_ACCELERATION_PAGE.myContracts}
                                </Typography>
                            </StyledButton>
                            <StyledButton
                                variant={'outlined'}
                                style={
                                    activeButton ? button1Styles : button2Styles
                                }
                                handleClick={handleCaskickClick}
                            >
                                <Typography
                                    variant="button1"
                                    color={
                                        activeButton
                                            ? theme.palette.primary[400]
                                            : theme.palette.text.secondary
                                    }
                                >
                                    {CASH_ACCELERATION_PAGE.myCashKicks}
                                </Typography>
                            </StyledButton>
                        </Stack>
                        {activeButton === true ? (
                            <React.Fragment>
                                {cashKickValue.length > 0 &&
                                    error === false && (
                                        <Table
                                            width={'100%'}
                                            columns={CASHKICK_COLUMNS}
                                            rows={
                                                cashKickValue.length === 0
                                                    ? []
                                                    : cashKickValue
                                            }
                                        />
                                    )}
                                {cashKickValue.length === 0 &&
                                    error === false && (
                                        <>
                                            <Table
                                                width={'100%'}
                                                columns={CASHKICK_COLUMNS}
                                                rows={[]}
                                            />
                                            <CashStack direction={'column'}>
                                                <Icon
                                                    src={cheque}
                                                    alt={'cheque-icon'}
                                                    style={CheckIconStyle}
                                                />
                                                <Typography
                                                    variant="h3"
                                                    color={
                                                        theme.palette.text
                                                            .disabled
                                                    }
                                                >
                                                    {homePage.paymentPending}
                                                </Typography>
                                                <Typography
                                                    variant="button1"
                                                    color={
                                                        theme.palette
                                                            .primary[400]
                                                    }
                                                    style={connectStyle}
                                                >
                                                    {homePage.launchNew}
                                                </Typography>
                                            </CashStack>
                                        </>
                                    )}
                                {(cashKickValue.length > 0 ||
                                    cashKickValue.length === 0) &&
                                    error === true && (
                                        <>
                                            <Table
                                                width={'100%'}
                                                columns={CASHKICK_COLUMNS}
                                                rows={[]}
                                            />
                                            <ContentStack direction={'column'}>
                                                <ContentStatus
                                                    imgSrc={Warning}
                                                    connectionStatus={
                                                        CASH_ACCELERATION_PAGE.failedStatus
                                                    }
                                                    message={CONNECTION_STATUS}
                                                    buttonText={RETRY}
                                                />
                                            </ContentStack>
                                        </>
                                    )}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                {loading === false && error === false && (
                                    <Table
                                        width={'100%'}
                                        columns={CONTRACTS_COLUMNS}
                                        rows={
                                            contractValue.length === 0
                                                ? []
                                                : contractValue
                                        }
                                    />
                                )}
                                {contractValue.length === 0 &&
                                    error === false &&
                                    loading === false && (
                                        <Stack
                                            direction={'column'}
                                            alignSelf={'center'}
                                            justifyContent={'center'}
                                            gap={2}
                                        >
                                            <Icon
                                                src={contract}
                                                alt={''}
                                                style={ContractIconStyle}
                                            />
                                            <Typography
                                                variant="h3"
                                                width={'347px'}
                                                style={{
                                                    textAlign: 'center'
                                                }}
                                                color={
                                                    theme.palette.text.disabled
                                                }
                                            >
                                                {
                                                    CASH_ACCELERATION_PAGE.defaultContracts
                                                }
                                            </Typography>
                                            <Typography
                                                variant="button1"
                                                color={
                                                    theme.palette.primary[400]
                                                }
                                                style={connectStyle}
                                            >
                                                {CASH_ACCELERATION_PAGE.connect}
                                            </Typography>
                                        </Stack>
                                    )}
                                {error === true && loading === false && (
                                    <React.Fragment>
                                        <Table
                                            width={'100%'}
                                            columns={CASHKICK_COLUMNS}
                                            rows={[]}
                                        />
                                        <ContentStack direction={'column'}>
                                            <ContentStatus
                                                imgSrc={Warning}
                                                connectionStatus={
                                                    CASH_ACCELERATION_PAGE.failedStatus
                                                }
                                                message={CONNECTION_STATUS}
                                                buttonText={RETRY}
                                            />
                                        </ContentStack>
                                    </React.Fragment>
                                )}
                                {loading === true && error === false && (
                                    <Table
                                        width={'100%'}
                                        columns={LOADING_COLUMNS}
                                        rows={cashKickValue}
                                    />
                                )}
                            </React.Fragment>
                        )}
                    </TableBox>
                </Box>
            </CashTemplate>
        </div>
    );
};
export default CashAccelerationPage;
