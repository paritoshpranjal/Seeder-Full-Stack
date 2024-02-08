import { screen, render, fireEvent } from "@testing-library/react";
import { ProfileCard } from ".";
import { DEFAULT_USERNAME } from "../../../utils/constant";
import React from "react";

describe("InfoCard component", () => {
  it("should render usermenu with specified username", () => {
    const mockHandleLogout = jest.fn();
    render(
      <ProfileCard
        userName={DEFAULT_USERNAME}
        isOpen={true}
        handleClose={() => {}}
        anchorEl={undefined}
        handleLogout={mockHandleLogout}
      />
    );
    const username = screen.getByText(DEFAULT_USERNAME);
    expect(username).toBeInTheDocument();
    const logoutBtn = screen.getByAltText("logout-icon");
    fireEvent.click(logoutBtn);
    expect(mockHandleLogout).toHaveBeenCalledTimes(1);
  });
});
