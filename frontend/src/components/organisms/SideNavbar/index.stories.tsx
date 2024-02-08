import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import SideNavigation from '.';
import { MemoryRouter } from 'react-router-dom';

export default {
    title: 'organisms/SideNavigation',
    component: SideNavigation
} as Meta;

const Template: StoryFn<typeof SideNavigation> = (args) => (
    <MemoryRouter>
        <SideNavigation {...args} />
    </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {};
