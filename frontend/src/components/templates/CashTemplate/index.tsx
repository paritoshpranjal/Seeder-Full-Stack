import React from 'react';
import styled from '@emotion/styled';
import Header from '../../molecules/Header';
import { Box } from '@mui/material';
import { theme } from '../../../theme';
import { backgroundColor } from '../../../utils/constant';

export interface CashTemplateProps {
    heading: React.ReactNode;
    message: string;
    children: React.ReactNode;
    navItem?: React.ReactNode;
}

const Wrapper = styled(Box)({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    ' & ::-webkit-scrollbar': {
        display: 'none'
    },
    backgroundColor: backgroundColor
});

const Nav = styled(Box)({
    width: '16.3vw',
    height: '100vh'
});

const RightContainer = styled(Box)({
    width: '83.69vw',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.grey[800],
    overflowY: 'auto'
});

const Title = styled(Box)({
    width: '79.59vw',
    height: '9.24vh',
    marginTop: '40px',
    marginLeft: '28px'
});

const CashTemplate = ({
    heading,
    message,
    children,
    navItem
}: CashTemplateProps) => {
    return (
        <Wrapper>
            <Nav>
                {navItem}
            </Nav>
            <RightContainer>
                <Title>
                    <Header
                        heading={heading}
                        message={message}
                    />
                </Title>
                <Box>{children}</Box>
            </RightContainer>
        </Wrapper>
    );
};

export default CashTemplate;
