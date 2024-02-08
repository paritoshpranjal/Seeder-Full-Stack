import { screen, render } from "@testing-library/react";
import { LoanDetails } from ".";
import CalenderLogo from "../../../../public/assets/icons/calendar.svg";
import InfoIcon from "../../../../public/assets/icons/info-circle.svg";
import { TERM_CAP } from "../../../utils/constant";
import "@testing-library/jest-dom";
import React from "react";

describe("DataBlock component", () => {
  it("should renders datablock as expected", () => {
    render(
      <LoanDetails
        logoSrc={CalenderLogo}
        iconSrc={InfoIcon}
        iconAlt="info-icon"
        title={TERM_CAP}
        caption="12 months"
        captionVariant="h2"
      />
    );
    const title = screen.getByText(TERM_CAP);
    expect(title).toBeInTheDocument();
  });
});
