import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import Checkbox from '.';
import { action } from '@storybook/addon-actions';

export default {
    title: 'atoms/Checkbox',
    component: Checkbox
} as Meta;

const Template: StoryFn<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
    onChange: action('Checkbox Click')
};

export const IntermediateIcon = Template.bind({});
IntermediateIcon.args = {
    indeterminate: true
};
