import React from 'react';
import {
    Box,
    Divider,
    Menu,
    PopoverVirtualElement,
    Stack,
    styled
} from '@mui/material';
import { theme } from '../../../theme';
import Avatar from '../../atoms/Avatar';
import AvatarLogo from '../../../../public/assets/images/avatar.svg';
import SettingsIcon from '../../../../public/assets/images/setting.svg';
import IconWithText from '../IconWithText';
import LogoutIcon from '../../../../public/assets/images/logout.svg';
import {
    EDIT_PROFILE,
    HELP,
    LOGOUT,
    MANEGE_SUBSCRIPTION,
    SETTINGS
} from '../../../utils/constant';
import Typography from '../../../../src/components/atoms/Typography';
import { useUserContext } from '../../../context';

interface UserMenuProps {
    handleLogout: () => void;
    userName: string;
    isOpen: boolean;
    handleClose: () => void;
    anchorEl:
        | Element
        | (() => Element)
        | PopoverVirtualElement
        | (() => PopoverVirtualElement)
        | null
        | undefined;
}
const StyledMenu = styled(Menu)({
    '& .MuiList-root': {
        paddingTop: 0,
        paddingBottom: 0
    },
    '.MuiPaper-root': {
        boxShadow: 'none',
        backgroundColor: theme.palette.grey[100],
        borderRadius: '12px'
    }
});

const StyledOuterStack = styled(Stack)({
    width: '18.3vw',
    backgroundColor: theme.palette.grey[100],
    border: `1px solid ${theme.palette.grey[300]}`,
    borderRadius: '12px',
    padding: '0.8vw',
    height: '40vh'
});

const StyledBox = styled(Box)(({ isDisabled }: { isDisabled: boolean }) => ({
    padding: '1.17vw',
    height: '100%',
    ':hover': {
        cursor: `${!isDisabled && 'pointer'}`
    }
}));

const StyledRowStack = styled(Stack)({
    flexDirection: 'row',
    gap: '12px',
    alignItems: 'center'
});

const StyledDivider = styled(Divider)`
    background: ${theme.palette.grey[600]};
    margin-left: 1.17vw;
    margin-right: 1.17vw;
`;

export const ProfileCard = (props: UserMenuProps) => {
    const { userName, isOpen, handleClose, handleLogout, anchorEl } = props;
    
    return (
        <StyledMenu
            open={isOpen}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <StyledOuterStack>
                <StyledBox isDisabled={true}>
                    <StyledRowStack>
                        <Avatar
                            src={AvatarLogo}
                            variant="square"
                            width={40}
                            height={40}
                        />
                        <Stack gap="2px">
                            <Typography variant="h3">{userName}</Typography>
                            <Typography
                                variant="caption1"
                                color={theme.palette.primary[400]}
                            >
                                {EDIT_PROFILE}
                            </Typography>
                        </Stack>
                    </StyledRowStack>
                </StyledBox>
                <StyledDivider />
                <StyledBox isDisabled={true}>
                    <Typography
                        variant="button2"
                        color={theme.palette.text.disabled}
                    >
                        {MANEGE_SUBSCRIPTION}
                    </Typography>
                </StyledBox>
                <StyledBox isDisabled={true}>
                    <Typography
                        variant="button2"
                        color={theme.palette.text.disabled}
                    >
                        {HELP}
                    </Typography>
                </StyledBox>
                <StyledDivider />
                <StyledBox isDisabled={true}>
                    <IconWithText
                        src={SettingsIcon}
                        text={SETTINGS}
                        alt="settings-icon"
                    />
                </StyledBox>
                <StyledBox isDisabled={false} onClick={handleLogout}>
                    <IconWithText
                        alt="logout-icon"
                        src={LogoutIcon}
                        text={LOGOUT}
                        isLogOut
                    />
                </StyledBox>
            </StyledOuterStack>
        </StyledMenu>
    );
};
