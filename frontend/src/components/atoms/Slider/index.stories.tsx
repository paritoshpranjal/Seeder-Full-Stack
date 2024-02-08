import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import Slider, { SliderProps } from '.';
import { action } from '@storybook/addon-actions';

const meta: Meta = {
    title: 'atoms/Slider',
    component: Slider
};

export default meta;

const Templete: StoryFn<SliderProps> = (args) => <Slider {...args} />;

export const Default = Templete.bind({});
Default.args = {
    maxValue: 20000,
    handleChange: action('Slider changed')
};
