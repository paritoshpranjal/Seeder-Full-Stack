import { screen, render } from "@testing-library/react";
import { Table } from ".";
import React from "react";
import '@testing-library/jest-dom';
import { MOCK_CONTRACT_DATA, CONTRACTS_COLUMNS } from "../../../utils/constant";

describe("Table component test cases", () => {
  it("should render Table component with all rows data as expected", () => {
    render(
      <Table
        width={"100%"}
        columns={CONTRACTS_COLUMNS}
        rows={MOCK_CONTRACT_DATA}
      />
    );
    MOCK_CONTRACT_DATA.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });
});
