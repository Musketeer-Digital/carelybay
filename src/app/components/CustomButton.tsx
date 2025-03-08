"use client";

import React from "react";
import { Button, CircularProgress, ButtonProps } from "@mui/material";
import Link from "next/link";

interface CustomButtonProps extends ButtonProps {
  href?: string;
  loading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  href,
  loading = false,
  startIcon,
  endIcon,
  disabled,
  size,
  variant,
  sx = {},
  ...props
}) => {
  const buttonContent = (
    <Button
      {...props}
      variant={variant ? variant : "primary"}
      disabled={loading || disabled}
      size={size ? size : "medium"}
      startIcon={!loading ? startIcon : null}
      endIcon={endIcon}
      sx={{
        textTransform: "none",
        borderRadius: 2,
        px: 3,
        py: 1.2,
        ...sx,
      }}
    >
      {loading ? <CircularProgress size={24} color="inherit" /> : children}
    </Button>
  );

  return href ? (
    <Link href={href} passHref legacyBehavior>
      {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
};

export default CustomButton;
