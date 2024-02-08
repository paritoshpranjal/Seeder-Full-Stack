import React from 'react';
import { Box, Stack, SxProps, styled } from '@mui/material';
import Icon from '../../../components/atoms/Icon';
import Typography from '../../atoms/Typography';
import { theme } from '../../../theme/index';

export type TypographyVariant =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'body1'
    | 'body2'
    | 'subtitle1'
    | 'subtitle2'
    | 'caption1'
    | 'caption2'
    | 'caption3'
    | 'caption4'
    | 'button2'
    | 'button1'
    | 'title';

export interface DataBlockProps {
    logoSrc: string;
    iconSrc: string;
    iconAlt: string;
    title: string;
    caption?: string;
    captionVariant?: TypographyVariant;
    captionSx?: SxProps;
    captionColor?: string;
    titleCaptionGap?: string;
}

const StyledBox = styled(Stack)({
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.spacing(20),
    height: theme.spacing(20),
    padding: theme.spacing(8),
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.spacing(3),
    border: `1px solid ${theme.palette.grey[300]}`
});

const InnerBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    alignSelf: 'stretch'
});

export const LoanDetails = (props: DataBlockProps) => {
    const {
        logoSrc,
        iconSrc,
        iconAlt,
        title,
        captionVariant,
        captionSx,
        caption,
        captionColor,
        titleCaptionGap
    } = props;

    return (
        <Stack
            // justifyContent={'space-between'}
            gap={'20px'}
            width={'100%'}
            // height={'175px'}
            minHeight="10vh"
            direction={'column'}
        >
            <StyledBox>
                <Icon src={logoSrc} alt={'icon'} />
            </StyledBox>
            <Stack gap={titleCaptionGap}>
                <InnerBox>
                    <Typography
                        variant={'body1'}
                        color={theme.palette.text.secondary}
                    >
                        {title}
                    </Typography>
                    <Icon src={iconSrc} alt={iconAlt} />
                </InnerBox>
                <Typography
                    variant={captionVariant}
                    sx={captionSx}
                    color={captionColor}
                >
                    {caption}
                </Typography>
            </Stack>
        </Stack>
    );
};
