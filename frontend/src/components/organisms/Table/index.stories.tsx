import { StoryFn, Meta } from "@storybook/react";
import { Table } from ".";
import { MOCK_CONTRACT_DATA ,CONTRACTS_COLUMNS} from "../../../utils/constant";
import React from "react";

export default {
  title: "organisms/Table",
  component: Table,
} as Meta<typeof Table>;

const Template: StoryFn<typeof Table> = (args) => <Table {...args} />;

export const YourContracts = Template.bind({});
YourContracts.args = {
  width: "100%",
  columns: CONTRACTS_COLUMNS,
  rows: MOCK_CONTRACT_DATA,
};

export const YourContractsWithCheckBox = Template.bind({});
YourContractsWithCheckBox.args = {
  width: "100%",
  columns: CONTRACTS_COLUMNS,
  rows: MOCK_CONTRACT_DATA,
  checkboxSelection: true,
};
