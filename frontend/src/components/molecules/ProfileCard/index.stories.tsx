import { StoryFn, Meta } from "@storybook/react";
import { DEFAULT_USERNAME } from "../../../utils/constant";
import React from "react";
import { ProfileCard } from ".";

export default {
  title: "molecules/InfoCard",
  component: ProfileCard ,
} as Meta<typeof ProfileCard >;

const Template: StoryFn<typeof ProfileCard > = (args) => <ProfileCard  {...args} />;

export const Primary = Template.bind({})
Primary.args = {
  isOpen:true,
  userName:DEFAULT_USERNAME
}