import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Avatar from "./index";
import AvatarImg from "../../../../public/assets/images/avatar.svg";
import React from "react";

describe("Avatar Component", () => {
  test("should renders the Avatar with correct style", () => {
    render(
      <Avatar
        src={AvatarImg}
        width={100}
        height={100}
        data-testid="Avatar"
        alt="image"
      />
    );
    const avatar = screen.getByTestId("Avatar");
    expect(avatar).toHaveStyle("width: 100px; height: 100px;");
  });
  test("should renders the Avatar with correct image", () => {
    render(<Avatar src={"../../../../public/assets/images/avatar.svg"} />);
    const avatarImage = screen.getByRole("img");
    expect(avatarImage).toHaveAttribute(
      "src",
      "../../../../public/assets/images/avatar.svg"
    );
  });
});