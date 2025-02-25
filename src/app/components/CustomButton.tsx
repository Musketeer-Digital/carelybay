"use client";

import { Button } from "@mui/material";
import { ReactNode } from "react";

interface CustomButtonProps {
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  color?:
    | "primary"
    | "secondary"
    | "inherit"
    | "success"
    | "error"
    | "info"
    | "warning";
  [key: string]: any;
}

const CustomButton = ({
  icon,
  children,
  className = "",
  type = "button",
  color = "primary",
  ...props
}: CustomButtonProps) => {
  return (
    <Button
      color={color}
      className={`flex items-center gap-2 ${className}`}
      sx={{
        color: color === "primary" ? "white !important" : "inherit",
        "&:hover": {
          color: color === "primary" ? "white !important" : "inherit",
        },
      }}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>} {children}
    </Button>
  );
};

export default CustomButton;
