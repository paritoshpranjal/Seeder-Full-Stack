import Typography from '../../atoms/Typography';
import InfoCircle from '../../../../public/assets/icons/infoCircle.svg';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';
import Slider from '../../atoms/Slider';
import React, { useEffect, useState } from 'react';
import { Box, Divider, styled } from '@mui/material';
import { theme } from '../../../theme';
import {
    CALCULATED_PERCENTAGE,
    PAYBACK_AMOUNT,
    RATE,
    RATE_PERCENTAGE,
    RESET,
    REVIEW_CREDIT,
    SELECTED_CONTRACTS,
    SELECTED_OF,
    SLIDE,
    SUBMIT_CREDIT,
    SUMMARY,
    TERM,
    TOTAL_PAYOUT,
    TWELVER_MONTHS,
    formattedBalance
} from '../../../utils/constant';

interface SummaryCardProps {
    summaryType: string;
    selectedContracts: number;
    onReset?: () => void;
    onSliderChanged: (value: number) => void;
    maximumAmount: number;
    selectedAmount: number;
    handleReviewButton?: () => void;
    openCashKickModel?: () => void;
}

const SummaryBox = styled(Box)({
    display: 'flex',
    width: '25vw',
    padding: '32px',
    flexDirection: 'column',
    gap: '20px',
    borderRadius: '12px',
    border: `1px solid ${theme.palette.grey[300]}`,
    backgroundColor: theme.palette.elevation.color1
});

const HeaderBox = styled(Box)({
    display: 'flex',
    gap: '8px'
});

const MetadataBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between'
});

const ReviewBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
});

const TotalPayoutBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
});

const AmountBox = styled(Box)({
    display: 'flex',
    gap: '4px'
});

const StyledDivider = styled(Divider)({
    background: theme.palette.grey[600]
});

const StyledReviewButton = styled(Button)({
    background: theme.palette.primary.main,
    height: '59px',
    backgroundColor: theme.palette.primary.main,
    ':hover': {
        backgroundColor: theme.palette.primary.main
    },
    ':disabled': {
        color: theme.palette.grey[500],
        backgroundColor: theme.palette.primary.main,
        opacity: '56%'
    }
});

const StyledResetButton = styled(Button)({
    background: theme.palette.elevation.color2,
    ' :disabled': {
        color: theme.palette.grey[600],
        backgroundColor: theme.palette.elevation.color2,
        opacity: '56%'
    },
    ':hover': {
        backgroundColor: theme.palette.elevation.color2
    }
});

const SummaryCard = (props: SummaryCardProps) => {
    

    const handleAmountChange = (_: Event, value: number | number[]) => {
        if (typeof value === 'number') {
           
            props.onSliderChanged(value);
        }
    };

    const renderMetadata = (subHeading: string, content: React.ReactNode) => (
        <MetadataBox>
            <Typography variant="body1" color={theme.palette.text.disabled}>
                {subHeading}
            </Typography>
            {content}
        </MetadataBox>
    );
   
    return (
        <SummaryBox>
            <HeaderBox>
                <Typography variant="h2" color={theme.palette.text.primary}>
                    {SUMMARY}
                </Typography>
                <Icon src={InfoCircle} alt="summary" />
            </HeaderBox>
            <TotalPayoutBox>
                {renderMetadata(
                    TERM,
                    <Typography
                        variant="body1"
                        color={theme.palette.text.primary}
                    >
                        {TWELVER_MONTHS}
                    </Typography>
                )}
                {renderMetadata(
                    SELECTED_CONTRACTS,
                    <Typography
                        variant="body1"
                        color={theme.palette.text.primary}
                    >
                        {props.selectedContracts}
                    </Typography>
                )}
            </TotalPayoutBox>
            {props.summaryType === 'review' && (
                <ReviewBox>
                    {renderMetadata(
                        SLIDE,
                        <StyledResetButton
                            variant="text"
                            handleClick={props.onReset}
                            disabled={!props.selectedAmount}
                        >
                            <Typography
                                variant="button1"
                                color={
                                    props.selectedAmount
                                        ? theme.palette.text.secondary
                                        : theme.palette.text.disabled
                                }
                            >
                                {RESET}
                            </Typography>
                        </StyledResetButton>
                    )}
                    <Slider
                        maxValue={props.maximumAmount}
                        value={props.selectedAmount}
                        handleChange={handleAmountChange}
                    />
                    <AmountBox>
                        <Typography
                            variant="body1"
                            color={theme.palette.primary[400]}
                        >
                            ${formattedBalance(props.selectedAmount)}
                        </Typography>
                        <Typography
                            variant="body1"
                            color={theme.palette.text.disabled}
                        >
                            {SELECTED_OF}
                        </Typography>
                        <Typography
                            variant="body1"
                            color={theme.palette.text.primary}
                        >
                            ${formattedBalance(props.maximumAmount)}
                        </Typography>
                    </AmountBox>
                </ReviewBox>
            )}
            <TotalPayoutBox>
                {renderMetadata(
                    PAYBACK_AMOUNT,
                    <Typography
                        variant="body1"
                        color={theme.palette.text.primary}
                    >
                        ${formattedBalance(props.selectedAmount)}
                    </Typography>
                )}
                {renderMetadata(
                    RATE_PERCENTAGE,
                    <Box sx={{ display: 'flex', gap: '4px' }}>
                        <Typography
                            variant="body1"
                            color={theme.palette.text.disabled}
                        >
                            {RATE}
                        </Typography>
                        <Typography
                            variant="body1"
                            color={theme.palette.text.primary}
                        >
                            ${CALCULATED_PERCENTAGE(props.selectedAmount)}
                        </Typography>
                    </Box>
                )}
            </TotalPayoutBox>
            <StyledDivider />
            {renderMetadata(
                TOTAL_PAYOUT,
                <Typography variant="h2" color={theme.palette.text.primary}>
                    $
                    {formattedBalance(
                        props.selectedAmount + (props.selectedAmount * 12) / 100
                    )}
                </Typography>
            )}
            <StyledReviewButton
                variant="text"
                disabled={!props.selectedAmount || (props.selectedAmount + (props.selectedAmount * 12) / 100)>props.maximumAmount}
                handleClick={
                    props.summaryType === 'review'
                        ? props.handleReviewButton
                        : props.openCashKickModel
                }
            >
                <Typography variant="button1" color={theme.palette.grey[400]}>
                    {props.summaryType === 'review'
                        ? REVIEW_CREDIT
                        : SUBMIT_CREDIT}
                </Typography>
            </StyledReviewButton>
        </SummaryBox>
    );
};

export default SummaryCard;
