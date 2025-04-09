"use client";
import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { useUserStore } from "@/store/userStore";
import UserNotificationMessage from "./_components_/UserNotificationMessage";
import LandingActions from "./LandingActions";
import SignupMarketingPanel from "@/app/components/signup-marketing-panel/signup-marketing-panel";
import SignInMessage from "@/app/components/SignInMessage";
import { signupSteps as steps } from "./steps";

export type SignUpInputs = {
  email: string;
  password: string;
  otp: string;
};

const MAX_STEPS = 8;
type StepKey = keyof typeof steps;

export default function SignupPages() {
  const [step, setStep] = useState<number>(1);
  const methods = useForm<SignUpInputs>();

  const setCurrentStep = useUserStore((state) => state.setCurrentStep);

  const prevStep = () => {
    setStep(step === 1 ? 0 : step - 1);
  };

  const nextStep = () => {
    setStep(step === MAX_STEPS ? 0 : step + 1);
    setCurrentStep(step + 1);
  };

  const { userMessageIcon, userMessage, showSignInMessage, stepContent } =
    steps[step as StepKey] || steps.default;

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
            icon={userMessageIcon}
            message={userMessage}
            sx={{ mb: 4 }}
          />

          {/* Step Content */}
          <FormProvider {...methods}>
            <Box sx={{ mb: 6 }}>{stepContent}</Box>
          </FormProvider>

          <SignInMessage sx={{ mb: { xs: 2, md: 5 } }} />

          {/* TODO: Remove after debugging */}
          {/* <SessionControls /> */}
          <LandingActions
            nextStep={nextStep}
            showSignInMessage={showSignInMessage}
            step={step}
          />
        </Container>
      </Box>

      <Box
        sx={{
          display: "flex",
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
