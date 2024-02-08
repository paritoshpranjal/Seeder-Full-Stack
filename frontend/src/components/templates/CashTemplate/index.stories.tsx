import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CashTemplate, { CashTemplateProps } from '.';
import { Table } from '../../organisms/Table';
import { CONTRACTS_COLUMNS, MOCK_CONTRACT_DATA } from '../../../utils/constant';
import SideNavigation from '../../organisms/SideNavbar';
import { Memory } from '@mui/icons-material';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta = {
    title: 'templates/CashTemplate',
    component: CashTemplate
};
export default meta;

const Templete: StoryFn<CashTemplateProps> = (args) => (
    <MemoryRouter>
        <CashTemplate {...args} />
    </MemoryRouter>
);
export const Default = Templete.bind({});
Default.args = {
    heading: 'Cash accleration',
    message: 'place to create new cash kicks to run your business',
    children: (
        <Table
            width="100%"
            columns={CONTRACTS_COLUMNS}
            rows={MOCK_CONTRACT_DATA}
            checkboxSelection={true}
        />
    ),
    navItem: <SideNavigation selectedItem="home" />
};
