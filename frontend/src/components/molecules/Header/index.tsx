import React, { useEffect } from 'react';
import Typography from '../../atoms/Typography';
import Avatar from '../../atoms/Avatar';
import Icon from '../../atoms/Icon';
import Profile from '../../../../public/assets/images/avatar.svg';
import Arrow from '../../../../public/assets/icons/arrow.svg';
import { theme } from '../../../theme';
import { Box, styled } from '@mui/material';
import { ProfileCard } from '../ProfileCard';
import { useAuth0 } from '@auth0/auth0-react';
import { useUserContext } from '../../../context';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    heading?: React.ReactNode;
    message?: string;
}

const StyledHeader = styled(Box)({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
});

const StyledContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
});

const StyledActions = styled(Box)({
    display: 'flex',
    gap: '8px',
    alignItems: 'center',
    '&:hover': { cursor: 'pointer' }
});

const Header = (props: HeaderProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const { logout, isAuthenticated } = useAuth0();
    const { currUser } = useUserContext();
    const navigate = useNavigate();

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.clear();
        logout({ logoutParams: { returnTo: window.location.origin } });
        navigate('/login');
    };

    useEffect(() => {});

    return (
        <>
            <StyledHeader>
                <StyledContent>
                    {props.heading}
                    <Typography
                        variant="h3"
                        color={theme.palette.text.disabled}
                    >
                        {props.message}
                    </Typography>
                </StyledContent>
                <StyledActions onClick={handleClick}>
                    <Avatar src={Profile} alt="profile" variant="square" />
                    <Icon src={Arrow} alt="arrow" />
                </StyledActions>
            </StyledHeader>
            <ProfileCard
                handleLogout={handleLogout}
                userName={currUser.name}
                isOpen={open}
                handleClose={handleClose}
                anchorEl={anchorEl}
            />
            ;
        </>
    );
};

export default Header;
