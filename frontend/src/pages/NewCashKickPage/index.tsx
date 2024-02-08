import React, { useEffect, useState } from 'react';
import CashTemplate from '../../components/templates/CashTemplate';
import Typography from '../../components/atoms/Typography';
import { theme } from '../../theme';
import { Box, styled } from '@mui/material';
import Button from '../../components/atoms/Button';
import LeftArrow from '../../../public/assets/icons/leftArrow.svg';
import InfoCircle from '../../../public/assets/icons/infoCircle.svg';
import Icon from '../../components/atoms/Icon';
import { Table } from '../../components/organisms/Table';
import {
    BACK,
    CONTRACTS_COLUMNS,
    NEW_CASH_KICK,
    SELECTED_CONTRACTS,
    TOTAL_AMOUNT,
    YOUR_CONTRACTS,
    generateRandomId
} from '../../utils/constant';
import SummaryCard from '../../components/organisms/SummaryCard';
import {
    createCashkickContract,
    createNewCashkick,
    getAllContracts,
    postPayment,
    updateAvailableCreditOfUser
} from '../../services/calls';
import {
    CashKickContractsPropsType,
    CashKickType,
    YourContractsType
} from '../../utils/interfaces';
import { GridRowSelectionModel } from '@mui/x-data-grid';
import CashKickModal from '../../components/organisms/CashKickModal';
import SideNavigation from '../../components/organisms/SideNavbar';
import { useUserContext } from '../../context';
import CashKickSuccessModal from '../../components/organisms/CaskKickSuccessModal';
import { useNavigate } from 'react-router-dom';

const AllContractsContainer = styled(Box)({
    padding: '32px',
    disply: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
    border: `1px solid ${theme.palette.grey[300]}`,
    background: theme.palette.elevation.color1,
    width: '54vw',
});

const NewCashKickBody = styled(Box)({
    marginLeft: '28px',
    marginRight: '28px',
    alignItems: 'center'
});

const StyledBackButton = styled(Button)({
    border: `1px solid ${theme.palette.grey[300]}`,
    background: theme.palette.elevation.color1,
    width: '87px',
    height: '31px'
});

const ContractsHeading = styled(Box)({
    display: 'flex',
    gap: '8px',
    alignItems: 'start',
    marginBottom: '20px'
});
const ContractsContainer = styled(Box)({
    display: 'flex',
    gap: '15px',
    alignItems: 'start',
    marginTop: '50px'
});
const NewCashKickPage = () => {
    const [contracts, setContracts] = useState<YourContractsType[]>([]);
    const [selectedContracts, setSelectedContracts] = useState<
        YourContractsType[]
    >([]);
    const [sliderAmount, setSliderAmount] = useState<number>(0);
    const [areContractsSelected, setAreContractsSelected] =
        useState<boolean>(false);
    const [openCashKickModel, setOpenCashKickModel] = useState<boolean>(false);
    const [openSuccessModel, setOpenSuccessModel] = useState<boolean>(false);
    const [newCashkickName, setNewCashkickName] = useState<string>('');
    const { currUser, handleUpdateAvailableCredit } = useUserContext();
    const navigate = useNavigate();

    const userId = currUser.id;
    const totalAmount = currUser.availableCredit;
    const outstandingAmount = TOTAL_AMOUNT - currUser.availableCredit;

    useEffect(() => {
        const getContracts = async () => {
            await getAllContracts().then((res) => {
                setContracts(res.data);
            });
        };
        getContracts();
    }, []);

    useEffect(() => {
        const totalPaymentAmount = selectedContracts.reduce(
          (total, contract) => total + (contract.partialAmount > 0 ? contract.partialAmount : contract.paymentAmount),
          0
        );
        setSliderAmount(totalPaymentAmount);
      }, [selectedContracts]);

    const getAllSelectedContracts = (
        newValue: number,
        sortedContracts: YourContractsType[]
    ): YourContractsType[] => {
        let totalPayment = 0;
        const selectedContracts: YourContractsType[] = [];

        for (const contract of sortedContracts) {
            if (totalPayment + contract.paymentAmount <= newValue) {
                selectedContracts.push(contract);
                totalPayment += contract.paymentAmount;
            } else {
                const remainingAmount = newValue - totalPayment;
                const updatedContract = {
                    ...contract,
                    partialAmount: remainingAmount
                };
                selectedContracts.push(updatedContract);
                break;
            }
        }
        return selectedContracts;
    };
    const handleSelectedRows = (selectedIds: GridRowSelectionModel) => {
        const selectedContracts = contracts.filter((contract) =>
            selectedIds.includes(contract.id)
        );

        const totalPaymentAmount = selectedContracts.reduce(
            (total, contract) => total + contract.paymentAmount,
            0
        );
        if (totalPaymentAmount <= totalAmount) {
            setSelectedContracts(selectedContracts);
            setSliderAmount(totalPaymentAmount);
        } else {
            const validSelectedAmount = Math.min(
                totalAmount,
                totalPaymentAmount
            );
            const allSelectedContracts = getAllSelectedContracts(
                validSelectedAmount,
                selectedContracts
            );

            setSelectedContracts(allSelectedContracts);
            setSliderAmount(totalAmount);
        }
    };

    const handleSliderChange = (value: number) => {
        const validSelectedAmount = Math.min(value, totalAmount);
        setSliderAmount(validSelectedAmount);
        const selectedContracts = getAllSelectedContracts(value, contracts);
        setSelectedContracts(selectedContracts);
    };

    const handleResetButton = () => {
        setSelectedContracts([]);
        setSliderAmount(0);
    };

    const handleReviewButton = () => {
        setAreContractsSelected(true);
    };

    const handleNewCashkickName = (newCashkickName: string) => {
        setNewCashkickName(newCashkickName);
    };

    const handleCashKickModal = () => {
        setNewCashkickName('');
        setOpenCashKickModel(false);
        setOpenSuccessModel(false);
    };

    const handleCreateCashkick = async () => {
        await createCashkick();
        setOpenCashKickModel(false);
        setOpenSuccessModel(true);
    };

    const handleBackClick = () => {
        if (areContractsSelected) {
            setAreContractsSelected(false);
        } else {
            navigate(-1);
        }
    };

    const createCashkick = async () => {
        try {
            const newCashkickData: CashKickType = {
                name: newCashkickName,
                status: 'pending',
                maturity: new Date(),
                totalFinanced: sliderAmount + sliderAmount * 0.12,
                totalReceived: sliderAmount,
                userId: userId
            };

            const response = await createNewCashkick(newCashkickData);
            const caskickContractsData: CashKickContractsPropsType[] =
                selectedContracts.map((contract: YourContractsType) => {
                    return {
                        userId: userId,
                        cashkickId: response.data.id,
                        contractId: contract.id
                    };
                });
            await createCashkickContract(caskickContractsData);

            const updatedCreditBalance =
                totalAmount - (sliderAmount + sliderAmount * 0.12);
            handleUpdateAvailableCredit(updatedCreditBalance);
            const newPaymentData = {
                userId: userId,
                dueDate: new Date(),
                status: 'Upcoming',
                expectedAmount: outstandingAmount / 12,
                outstandingAmount: outstandingAmount
            };
            await updateAvailableCreditOfUser(userId, {
                ...currUser,
                availableCredit: updatedCreditBalance
            });
            await postPayment(newPaymentData);
        } catch (error) {
            console.log(error);
        }
    };
    const renderAllContracts = () => {
        return (
            <ContractsContainer>
                <AllContractsContainer>
                    <ContractsHeading>
                        <Typography
                            variant="h2"
                            color={theme.palette.text.primary}
                        >
                            {YOUR_CONTRACTS}
                        </Typography>
                        <Icon src={InfoCircle} alt="contracts" />
                    </ContractsHeading>
                    <Table
                        width={'100%'}
                        columns={CONTRACTS_COLUMNS}
                        rows={contracts}
                        checkboxSelection={true}
                        getRowId={(row) => row.id}
                        onRowSelectionModelChange={(selectedIds) => {
                            handleSelectedRows(selectedIds);
                        }}
                        rowSelectionModel={selectedContracts.map(
                            (contract) => contract.id
                        )}
                        disableRowSelectionOnClick
                    />
                </AllContractsContainer>
                <SummaryCard
                    summaryType={'review'}
                    selectedContracts={selectedContracts.length}
                    onSliderChanged={(value: number) => {
                        handleSliderChange(value);
                    }}
                    maximumAmount={totalAmount}
                    selectedAmount={sliderAmount}
                    onReset={handleResetButton}
                    handleReviewButton={handleReviewButton}
                />
            </ContractsContainer>
        );
    };
    const renderSelectedContracts = () => {
        return (
            <ContractsContainer>
                <AllContractsContainer>
                    <ContractsHeading>
                        <Typography
                            variant="h2"
                            color={theme.palette.text.primary}
                        >
                            {SELECTED_CONTRACTS}
                        </Typography>
                        <Icon src={InfoCircle} alt="contracts" />
                    </ContractsHeading>
                    <Table
                        width={'100%'}
                        columns={CONTRACTS_COLUMNS}
                        rows={selectedContracts}
                        disableRowSelectionOnClick
                    />
                </AllContractsContainer>
                <Box>
                    <SummaryCard
                        summaryType={'submit'}
                        selectedContracts={selectedContracts.length}
                        onSliderChanged={(value: number) => {
                            handleSliderChange(value);
                        }}
                        maximumAmount={totalAmount}
                        selectedAmount={sliderAmount}
                        openCashKickModel={() => {
                            setOpenCashKickModel(true);
                        }}
                    />
                </Box>
            </ContractsContainer>
        );
    };
    return (
        <CashTemplate
            heading={
                <Typography variant="title" color={theme.palette.text.primary}>
                    {NEW_CASH_KICK}
                </Typography>
            }
            message={'Let’s setup a new cash kick to power your Saas'}
            navItem={<SideNavigation selectedItem={'Home'} />}
        >
            <NewCashKickBody>
                <StyledBackButton
                    startIcon={<Icon src={LeftArrow} alt="go-back" />}
                    variant="text"
                    handleClick={handleBackClick}
                >
                    <Typography
                        variant="button1"
                        color={theme.palette.text.primary}
                    >
                        {BACK}
                    </Typography>
                </StyledBackButton>
                {!areContractsSelected
                    ? renderAllContracts()
                    : renderSelectedContracts()}
                <CashKickModal
                    width={'40vw'}
                    isOpen={openCashKickModel}
                    onNameChange={handleNewCashkickName}
                    handleCrossIconClick={handleCashKickModal}
                    handleCancelClick={handleCashKickModal}
                    handleCreateClick={handleCreateCashkick}
                />
                <CashKickSuccessModal
                    width={'40vw'}
                    isOpen={openSuccessModel}
                    handleCrossIconClick={handleCashKickModal}
                    handleCloseButtonClick={() => {
                        navigate('/home');
                    }}
                    handleViewButtonClick={() => {
                        navigate('/cash-acceleration');
                    }}
                />
            </NewCashKickBody>
        </CashTemplate>
    );
};

export default NewCashKickPage;
