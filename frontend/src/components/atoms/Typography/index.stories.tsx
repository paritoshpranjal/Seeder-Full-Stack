import { Meta, StoryFn } from '@storybook/react';
import Typography, { TypographyProps } from './index';
import React from 'react';
import { theme } from '../../../theme';

export default {
  title: 'atoms/Typography',
  component: Typography,
} as Meta;

const Template: StoryFn<TypographyProps> = (args) => <Typography {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: theme.palette.primary[100],
  children: 'This is the default typography component.',
};

export const Heading = Template.bind({});
Heading.args = {
  color: theme.palette.primary[300],
  variant: 'h3',
  children: 'This is a heading.',
};

export const Body = Template.bind({});
Body.args = {
  color: theme.palette.text.secondary,
  variant: 'body1',
  children: 'This is body text.',
};
