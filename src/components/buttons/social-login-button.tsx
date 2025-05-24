import { Box, Button, ButtonProps, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
// import { signIn } from "@/lib/auth";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import SocialIcon from "../icons/social-icon";

interface SocialLoginButtonProps extends Omit<ButtonProps, "onClick"> {
  provider: "google" | "facebook";
  callbackUrl?: string;
  displayText: string;
}

const providerIcons = {
  google: <GoogleIcon />,
  facebook: <FacebookIcon />,
};

export default function SocialLoginButton({
  provider,
  callbackUrl,
  displayText,
  ...buttonProps
}: SocialLoginButtonProps) {
  return (
    <Button
      {...buttonProps}
      fullWidth
      onClick={() => signIn(provider, { redirectTo: "/" })}
      sx={{
        border: "1px solid rgba(77, 73, 87, 0.6)",
        color: "#000000",
        textTransform: "none",
        fontWeight: "bold",
        cursor: "pointer",

        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "center",
        gap: 1,

        "&:hover": {
          border: "1px solid rgba(77, 73, 87, 0.6)",
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      }}
    >
      <Box sx={{ width: 24, height: 24, position: "absolute", left: 16 }}>
        <SocialIcon provider={provider} />
      </Box>
      <Typography
        component="span"
        sx={{ alignSelf: "center", fontWeight: 600 }}
      >
        {displayText}
      </Typography>
    </Button>
  );
}
