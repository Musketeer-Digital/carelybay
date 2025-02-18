"use client";
import React from "react";
import { Box, Typography, Container } from "@mui/material";
import ChooseRole from "./(1_choose_role)/choose-role";
import ChooseService from "./(2_1_providers_choose_service)/choose-service";
import SignUp from "./(3_signup)/signup";
import LandingActions from "./LandingActions";

const MAX_STEPS = 3;

export default function SignupPages() {
  const [step, setStep] = React.useState(1);

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
      stepContent = <ChooseRole />;
      break;
    case 2:
      userMessageIcon = "";
      userMessage = "";
      showSignInMessage = false;
      stepContent = <ChooseService prevStep={prevStep} />;
      break;
    case 3:
      userMessageIcon = "👋";
      userMessage = "Welcome to Carelybay";
      showSignInMessage = true;
      stepContent = <SignUp />;
      break;
    default:
      userMessageIcon = "👋";
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
        }}
      >
        {/* User Notification Message */}
        {userMessageIcon && userMessage && (
          <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
            <Box
              sx={{
                width: "48px",
                height: "48px",
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
      {stepContent}
      <LandingActions
        nextStep={nextStep}
        showSignInMessage={showSignInMessage}
        step={step}
      />
    </Container>
  );
}
