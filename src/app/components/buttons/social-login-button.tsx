import { Box, Button, ButtonProps, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
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
  callbackUrl = "/dashboard",
  displayText,
  ...buttonProps
}: SocialLoginButtonProps) {
  return (
    <Button
      fullWidth
      onClick={() => signIn(provider, { callbackUrl })}
      sx={{
        border: "1px solid #000000",
        color: "#000000",
        textTransform: "none",
        fontWeight: "bold",
        "&:hover": {
          border: "1px solid #000000",
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      }}
      {...buttonProps}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
          gap: 1,
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
      </Box>
    </Button>
  );
}
