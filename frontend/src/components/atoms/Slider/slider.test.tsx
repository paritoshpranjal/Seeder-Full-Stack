import React from 'react';
import '@testing-library/jest-dom';
import Slider from '.';
import { render, fireEvent, screen } from '@testing-library/react';

describe('Slider Component', () => {
  it('should render with initial value', () => {
    const { getByTestId } = render(<Slider value={50} maxValue={100} />);
    const slider = getByTestId('slider');
    expect(slider).toBeInTheDocument();
  });

  it('should call handleChange on slider change', () => {
    const handleChange = jest.fn();
    render(
      <Slider value={50} handleChange={handleChange} maxValue={100} />
    );
    const slider = screen.getByRole('slider');
    fireEvent.change(slider, { target: { value: 75 } });
    expect(handleChange).toHaveBeenCalledTimes(1)
  });

});
