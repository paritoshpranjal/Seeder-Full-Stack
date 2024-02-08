import type { Meta, StoryObj } from "@storybook/react";
import Chip from '.';
import {theme} from '../../../theme'
const meta: Meta<typeof Chip> = {
  title: "Atoms/Chip",
  component: Chip,
};
export default meta;
type Story = StoryObj<typeof Chip>;

export const ChipAtom: Story = {
  args: {
    variant: 'body2',
    text: 'Available',
    bgcolor: theme.palette.elevation.color2,
    borderRadius: '4px',
    color: theme.palette.text.secondary,
  },
};
