import React from "react";
import { Typography, Link, SxProps } from "@mui/material";
import NextLink from "next/link";

interface SignInMessageProps {
  className?: string;
  sx?: SxProps;
}

const SignInMessage: React.FC<SignInMessageProps> = ({
  className,
  sx = {},
}) => {
  return (
    <Typography
      variant="h5"
      className={className}
      sx={{ textAlign: "center", ...sx }}
    >
      Already using Carelybay?&nbsp;
      <Link component={NextLink} href="/signin">
        Sign in
      </Link>
    </Typography>
  );
};

export default SignInMessage;
