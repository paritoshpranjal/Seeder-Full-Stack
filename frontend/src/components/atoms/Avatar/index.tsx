import { Avatar as MuiAvatar } from "@mui/material";
import React from "react";

interface AvatarProps {
  src: string;
  alt?: string;
  variant?: "circular" | "rounded" | "square";
  width?: number;
  height?: number;
}

const Avatar = ({ src, alt, variant, width, height }: AvatarProps) => {
  const avatarStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <MuiAvatar
      src={src}
      alt={alt}
      variant={variant}
      data-testid="Avatar"
      style={avatarStyle}
    />
  );
};

export default Avatar;