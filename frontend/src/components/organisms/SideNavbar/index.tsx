import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import styled from '@emotion/styled';
import IconWithText from '../../molecules/IconWithText';
import Logo from '../../../../public/assets/icons/Logo.svg';
import Flash from '../../../../public/assets/icons/flash.svg';
import Home from '../../../../public/assets/icons/home.svg';
import SelectedHome from '../../../../public/assets/icons/SelectedHome.svg';
import Coin from '../../../../public/assets/icons/coin.svg';
import SelectedCoin from '../../../../public/assets/icons/SelectedCoin.svg';
import { theme } from '../../../theme';
import { HOME, SEEDER, WATCH, CASH } from '../../../utils/constant';
import { useNavigate } from 'react-router-dom';

const SideNavigation = (props: { selectedItem: string }) => {
    const [selectedItem, setSelectedItem] = useState(props.selectedItem);
    const navigate = useNavigate();

    function handleItemClick(itemText: React.SetStateAction<string>) {
        setSelectedItem(itemText);
    }

    const handleLogin = () => {
        navigate('/home');
    };

    const handleCashAcceleration = () => {
        navigate('/cash-acceleration');
    };

    const MainGrid = styled(Grid)({
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 20px 20px',
        gap: '40px',
        background: theme.palette.elevation.color1,
        borderRight: `1px solid ${theme.palette.grey[900]}`,
        borderRadius: '0px',
        height: '100vh',
        width: '90%',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    });

    const FrameGrid = styled(Grid)({
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        width: '100%',
        height: '100%'
    });

    return (
        <MainGrid container>
            <Grid item flex="1">
                <Grid container gap={10} direction={'column'}>
                    <Grid item color="white">
                        <Grid item>
                            <IconWithText
                                src={Logo}
                                text={SEEDER}
                                alt="Seeder icon"
                            />
                        </Grid>
                    </Grid>
                    <Grid item flex="1">
                        <FrameGrid
                            container
                            color={theme.palette.text.disabled}
                        >
                            <Grid item onClick={handleLogin}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        cursor: 'pointer',
                                        padding: '16px',
                                        marginBottom: '12px',
                                        width: '100%',
                                        height: '100%',
                                        background:
                                            selectedItem === 'Home'
                                                ? `${theme.palette.elevation.color2}`
                                                : '',
                                        borderRadius: '12px'
                                    }}
                                    onClick={() => handleItemClick('Home')}
                                    data-testid="HomeSideNav"
                                >
                                    <IconWithText
                                        src={
                                            selectedItem === 'Home'
                                                ? SelectedHome
                                                : Home
                                        }
                                        alt="Home icon"
                                        text={HOME}
                                        isClicked={selectedItem === 'Home'}
                                    />
                                </Box>
                            </Grid>
                            <Grid item onClick={handleCashAcceleration}>
                                <Box
                                    sx={{
                                        cursor: 'pointer',
                                        padding: '16px',
                                        gap: '12px',
                                        width: '100%',
                                        height: '100%',
                                        background:
                                            selectedItem === 'Cash Acceleration'
                                                ? `${theme.palette.elevation.color2}`
                                                : '',
                                        borderRadius: '12px',
                                    }}
                                    onClick={() =>
                                        handleItemClick('Cash Acceleration')
                                    }
                                    data-testid="CashAcceleration"
                                >
                                    <IconWithText
                                        src={
                                            selectedItem === 'Cash Acceleration'
                                                ? SelectedCoin
                                                : Coin
                                        }
                                        alt="Coin icon"
                                        text={CASH}
                                        isClicked={
                                            selectedItem === 'Cash Acceleration'
                                        }
                                    />
                                </Box>
                            </Grid>
                        </FrameGrid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item color={theme.palette.text.disabled}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        width: '180px',
                        height: '100%',
                        borderRadius: '12px'
                    }}
                >
                    <IconWithText src={Flash} alt="Flash icon" text={WATCH} />
                </Box>
            </Grid>
        </MainGrid>
    );
};

export default SideNavigation;
