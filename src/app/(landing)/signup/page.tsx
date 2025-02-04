// src/app/(landing)/signup/page.tsx
"use client";
import React from "react";
import { Box, Button, Typography, Link, Stack, Container } from "@mui/material";
import NextLink from "next/link";
import CustomizedSteppers from "@/app/components/stepper";
import ChooseRole from "./(1_choose_role)/choose-role";
import ChooseService from "./(2_1_providers_choose_service)/choose-service";
import SignUp from "./(3_signup)/signup";
import LandingActions from "./LandingActions";
import Image from "next/image";

const MAX_STEPS = 3;

export default function SignupPages() {
  const [step, setStep] = React.useState(1);

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
      userMessage = "Welcome to Carelybay";
      showSignInMessage = true;
      stepContent = <ChooseRole />;
      break;
    case 2:
      userMessage = "";
      showSignInMessage = false;
      stepContent = <ChooseService prevStep={prevStep} />;
      break;
    case 3:
      userMessage = "Welcome to Carelybay";
      showSignInMessage = true;
      stepContent = <SignUp />;
      break;
    default:
      userMessage = "Welcome to Carelybay";
      showSignInMessage = true;
      stepContent = <ChooseRole />;
      break;
  }

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1em",
          height: "48px",
          marginBottom: 4,
        }}
      >
        {/* User Notification Message */}
        <Image
          src="https://placehold.co/24x24"
          alt="Message image"
          width={24}
          height={24}
        />
        <Typography variant="body1">Welcome to Carelybay</Typography>
      </Box>
      {/* Step Content */}
      {stepContent}
      <LandingActions
        nextStep={nextStep}
        showSignInMessage={showSignInMessage}
        step={step}
      />
    </Container>
  );
}
