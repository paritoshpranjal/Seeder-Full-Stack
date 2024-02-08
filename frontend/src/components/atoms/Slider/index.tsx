import styled from '@emotion/styled';
import React from 'react';
import { Slider as MuiSlider } from '@mui/material';
import { theme } from '../../../theme';

export interface SliderProps {
    value?: number;
    handleChange?: (
        event: Event,
        value: number | number[],
        activeThumb: number
    ) => void;
    maxValue: number;
}

const CustomSlider = styled(MuiSlider)({
    width: '100%',
    color: `${theme.palette.primary.main}`,
    height: '0.6rem',
    borderRadius: '0.6rem',
    cursor: 'default',
    '& .MuiSlider-thumb': {
        color: `${theme.palette.primary.main}`,
        border: '0.288rem solid' + `${theme.palette.primary[400]}`,
        width: '1.538rem',
        height: '1.538rem',
        borderRadius: '0.6rem',
        cursor: 'pointer',
        boxShadow: 'none'
    },
    '& .MuiSlider-rail': {
        color: `${theme.palette.grey[200]}`,
        backgroundColor: `${theme.palette.grey[500]}`,
        borderRadius: '0.6rem',
        cursor: 'default'
    },
    '& .MuiSlider-mark': {
        backgroundColor: 'transparent'
    },
    '& .MuiSlider-track': {
        cursor: 'pointer'
    }
});

const Slider = ({ value, handleChange, maxValue }: SliderProps) => {
    return (
        <CustomSlider
            value={value}
            onChange={handleChange}
            max={maxValue}
            data-testid="slider"
        />
    );
};

export default Slider;
