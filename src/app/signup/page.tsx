"use client";
import React from "react";
import { Box, Container } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import UserNotificationMessage from "./_components_/UserNotificationMessage";
import SignupMarketingPanel from "@/components/signup-marketing-panel/signup-marketing-panel";
import SignInMessage from "@/components/SignInMessage";
import SignUp from "./_components_/signup";
// import SessionControls from "@/components/session-controls";

export type SignUpInputs = {
  email: string;
  password: string;
  otp: string[];
};

export default function SignupPages() {
  const methods = useForm<SignUpInputs>();

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
            icon={"👋"}
            message={"Welcome to Carelybay"}
            sx={{ mb: 4 }}
          />

          {/* Step Content */}
          <FormProvider {...methods}>
            <Box sx={{ mb: 6 }}>
              <SignUp />
            </Box>
          </FormProvider>

          <SignInMessage sx={{ mb: { xs: 2, md: 5 } }} />

          {/* TODO: Remove after debugging */}
          {/* <SessionControls /> */}
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