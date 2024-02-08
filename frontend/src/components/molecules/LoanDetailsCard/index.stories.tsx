import { StoryFn, Meta } from "@storybook/react";
import CalenderLogo from "../../../../public/assets/icons/calendar.svg";
import InfoIcon from "../../../../public/assets/icons/info-circle.svg";
import { TERM_CAP } from "../../../utils/constant";
import { theme } from "../../../theme/index";
import { LoanDetails } from ".";
import React from "react";

export default {
  title: "molecules/LoanDetails ",
  component: LoanDetails ,
} as Meta<typeof LoanDetails >;

const Template: StoryFn<typeof LoanDetails > = (args) => <LoanDetails {...args} />;
export const TeamCap = Template.bind({});

TeamCap.args = {
  logoSrc: CalenderLogo,
  iconSrc: InfoIcon,
  iconAlt: "info-icon",
  title: TERM_CAP,
  caption: "12 months",
  captionVariant: "h2",
  captionColor: theme.palette.text.primary,
  titleCaptionGap: "8px",
};
