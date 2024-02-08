import React from 'react'
import { render, screen } from '@testing-library/react'
import "@testing-library/jest-dom";
import Chip,{ChipProps} from '.'

describe('MuiChip', () => {
  it('should render chip with label text', () => {
    const props: ChipProps = {
      variant: 'body2',
      text: 'chip component',
      bgcolor: '#ccc',
      borderRadius: '4px',
      color: 'primary',
    }
    render(<Chip {...props} />)
    const chipLabel = screen.getByText('chip component')
    expect(chipLabel).toBeInTheDocument()
  })
})
