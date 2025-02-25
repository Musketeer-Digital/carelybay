"use client";
import React, { useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import SignUp from "./_components_/signup";
import VerifyEmailCode from "./_components_/verify-email-code";
import PersonalInformation from "./_components_/personal-information";
import { useForm, FormProvider } from "react-hook-form";
import SignInMessage from "@/app/components/SignInMessage";

const MAX_STEPS = 3;

export type SignUpInputs = {
  email: string;
  password: string;
  otp: string;
};

export default function SignupPages() {
  const [step, setStep] = useState(1);
  const methods = useForm<SignUpInputs>();

  let userMessageIcon = "";
  let userMessage = "";
  let showSignInMessage = true;
  let stepContent;

  const prevStep = () => {
    setStep(step === 1 ? MAX_STEPS : step - 1);
  };

  const nextStep = () => {
    setStep(step === MAX_STEPS ? 0 : step + 1);
  };

  switch (step) {
    case 1:
      userMessageIcon = "👋";
      userMessage = "Welcome to Carelybay";
      showSignInMessage = true;
      stepContent = <SignUp nextStep={nextStep} />;
      break;
    case 2:
      userMessageIcon = "👋";
      userMessage = "Email sent";
      showSignInMessage = false;
      stepContent = <VerifyEmailCode prevStep={prevStep} nextStep={nextStep} />;
      break;
    case 3:
      userMessageIcon = "✅";
      userMessage = "Verification completed successfully.";
      showSignInMessage = true;
      stepContent = <PersonalInformation />;
      break;
    default:
      userMessageIcon = "👋";
      userMessage = "Welcome to Carelybay";
      showSignInMessage = true;
      stepContent = <SignUp nextStep={nextStep} />;
      break;
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1em",
          height: "48px",
        }}
      >
        {/* User Notification Message */}
        {userMessageIcon && userMessage && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                backgroundColor: "rgba(243, 243, 243, 1)",
                borderRadius: "50%",
                alignContent: "center",
                textAlign: "center",
              }}
            >
              <Typography sx={{ fontSize: "24px" }}>
                {userMessageIcon}
              </Typography>
            </Box>
            <Typography variant="body1">{userMessage}</Typography>
          </Box>
        )}
      </Box>

      {/* Step Content */}
      <FormProvider {...methods}>{stepContent}</FormProvider>
      {/* Step Content */}

      <SignInMessage sx={{ marginBottom: { xs: 2, md: 5 } }} />

      {/* TODO: Remove after debugging */}
      {/* <SessionControls /> */}
      {/* <LandingActions
        nextStep={nextStep}
        showSignInMessage={showSignInMessage}
        step={step}
      /> */}
    </Container>
  );
}
