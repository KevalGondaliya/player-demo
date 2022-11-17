import React from "react";
import { Button as MButton } from "@mui/material";
import { ButtonSizeType, ButtonVariantType } from "../../types";

interface ButtonProp {
  size?: ButtonSizeType;
  variant?: ButtonVariantType;
  startIcon?: React.ReactNode;
  handleOnClick?: () => void;
}

export default function Button({
  size = ButtonSizeType.Small,
  variant = ButtonVariantType.Outlined,
  startIcon,
  handleOnClick,
}: ButtonProp) {
  return (
    <MButton
      size={size}
      variant={variant}
      onClick={handleOnClick}
      startIcon={startIcon}
    />
  );
}
