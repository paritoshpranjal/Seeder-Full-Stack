import { Box, Stack, styled } from '@mui/material';
import React from 'react';
import { backgroundColor } from '../../../utils/constant';
import Icon from '../../atoms/Icon';

export interface LoginTemplateProps {
    imageSrc: string;
    bodyNode: React.ReactNode;
}

const StyledIcon = styled(Icon)({
    display: 'flex',
    width: '40%',
    height: '100vh'
});

const StyledDiv = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30vw;
    margin-left: 15.63rem;
    @media (max-width: 1800px) {
        margin-left: 8rem;
    }
`;

const StyledMainBox = styled(Box)({
    width: '100%',
    height: '100%',
    backgroundColor: backgroundColor
});

const LoginTemplate = ({ imageSrc, bodyNode }: LoginTemplateProps) => {
    return (
        <StyledMainBox>
            <Stack direction="row" alignItems={"center"}>
                <StyledIcon
                    src={imageSrc}
                    alt="login-panel image"
                    data-testid="login-panel"
                />
                <StyledDiv>{bodyNode}</StyledDiv>
            </Stack>
        </StyledMainBox>
    );
};

export default LoginTemplate;
