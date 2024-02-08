import React from 'react';
import SummaryCard from '.';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

describe('SummaryCard component', () => {
    it('should render SummaryCard with default props', () => {
        const { getByText, getByTestId } = render(
            <SummaryCard
                summaryType="review"
                selectedContracts={1}
                onSliderChanged={jest.fn()}
                maximumAmount={1000}
                selectedAmount={500}
            />
        );

        expect(getByText('Summary')).toBeInTheDocument();
        expect(getByText('Slide to autoselect')).toBeInTheDocument();
        expect(getByTestId('slider')).toBeInTheDocument();
    });

    it('should handle Slider change and update selectedAmount', () => {
        const onSliderChangedMock = jest.fn();
        const { getByRole } = render(
            <SummaryCard
                summaryType="review"
                selectedContracts={1}
                onSliderChanged={onSliderChangedMock}
                maximumAmount={1000}
                selectedAmount={500}
            />
        );

        fireEvent.change(getByRole('slider'), { target: { value: 750 } });
        expect(onSliderChangedMock).toHaveBeenCalledWith(750);
    });

    it('should disable the Reset button when selectedAmount is 0', () => {
        const { getByRole } = render(
            <SummaryCard
                summaryType="review"
                selectedContracts={1}
                onSliderChanged={jest.fn()}
                maximumAmount={1000}
                selectedAmount={0}
            />
        );
        const resetButton = getByRole('button', { name: 'Review your credit' });
        expect(resetButton).toBeDisabled();
    });

    it('should render Submit your credit button when summaryType is submit', () => {
        const { getByText } = render(
            <SummaryCard
                summaryType="submit"
                selectedContracts={1}
                onSliderChanged={jest.fn()}
                maximumAmount={10000}
                selectedAmount={3000}
            />
        );
        expect(getByText('Submit your credit')).toBeEnabled();
    });
});
