import React from 'react'
import MuiChip from '@mui/material/Chip'
import Typography from '../Typography'

export interface ChipProps {
  variant: 'body2'
  text: string
  bgcolor: string
  borderRadius: string
  color: string
}

const Chip = (props: ChipProps) => {
  const { variant, text, bgcolor, borderRadius, color } = props

  const chipStyle = {
    backgroundColor: bgcolor,
    borderRadius: borderRadius,
  }

  return (
    <MuiChip
      style={chipStyle}
      label={
        <Typography color={color} variant={variant}>
          {text}
        </Typography>
      }
    />
  )
}

export default Chip
