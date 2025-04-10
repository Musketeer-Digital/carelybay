"use client";
import React from "react";
import { Box, Container } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useUserStore } from "@/store/userStore";
import UserNotificationMessage from "../_components_/UserNotificationMessage";
import SignupMarketingPanel from "@/app/components/signup-marketing-panel/signup-marketing-panel";
import SignInMessage from "@/app/components/SignInMessage";
import VerifyEmailCode from "./verify-email-code";

export type VerificationInputs = {
  email: string;
  otp: string[];
};

export default function VerifyPage() {
  const methods = useForm<VerificationInputs>();
  const userInfo = useUserStore((state) => state.userInfo);

  // Set default email value from store if available
  React.useEffect(() => {
    if (userInfo?.email) {
      methods.setValue("email", userInfo.email);
    }
  }, [userInfo, methods]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
        flex: 1,
        height: "100%",
        gap: 4,
      }}
      disableGutters={true}
      maxWidth={false}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          flex: 6,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <UserNotificationMessage
            icon="🔒"
            message="Verify your email to continue"
            sx={{ mb: 4 }}
          />

          <FormProvider {...methods}>
            <Box sx={{ mb: 6 }}>
              <VerifyEmailCode />
            </Box>
          </FormProvider>

          <SignInMessage sx={{ mb: { xs: 2, md: 5 } }} />
        </Container>
      </Box>

      <Box
        sx={{
          display: {
            xs: "none",
            lg: "flex",
          },
          flexDirection: "column",
          flex: 2,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SignupMarketingPanel />
      </Box>
    </Container>
  );
}
