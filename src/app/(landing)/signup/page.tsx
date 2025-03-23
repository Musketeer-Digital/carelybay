"use client";
import React, { useState } from "react";
import { Box, Typography, Container } from "@mui/material";
import SignUp from "./_components_/signup";
import VerifyEmailCode from "./_components_/verify-email-code";
import SignInMessage from "@/app/components/SignInMessage";
import PersonalInformation from "./_components_/personal-information";
import { FormProvider, useForm } from "react-hook-form";
import UserNotificationMessage from "./_components_/UserNotificationMessage";
import LandingActions from "./LandingActions";
import SetLocation from "./_components_/set-location";
import { useUserStore } from "@/store/userStore";
import ChooseRole from "./_components_/choose-role";
import ChooseService from "./_components_/choose-service";
import AddServices from "./_components_/add-services";
import AddAdditionalInfo from "./_components_/add-additional-info";

const MAX_STEPS = 8;

export type SignUpInputs = {
  email: string;
  password: string;
  otp: string;
};

export default function SignupPages() {
  const [step, setStep] = useState(1);
  const methods = useForm<SignUpInputs>();

  const setCurrentStep = useUserStore((state) => state.setCurrentStep);

  let userMessageIcon = "";
  let userMessage = "";
  let showSignInMessage = true;
  let stepContent;

  const prevStep = () => {
    setStep(step === 1 ? MAX_STEPS : step - 1);
  };

  const nextStep = () => {
    setStep(step === MAX_STEPS ? 0 : step + 1);
    setCurrentStep(step + 1);
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
    case 4:
      userMessageIcon = "✅";
      userMessage = "Profile info added.";
      showSignInMessage = false;
      stepContent = <SetLocation />;
      break;
    case 5:
      userMessageIcon = "👋";
      userMessage = "Welcome to Carelybay";
      showSignInMessage = false;
      stepContent = <ChooseRole />;
      break;
    case 6:
      userMessageIcon = "👋";
      userMessage = "Account setup";
      showSignInMessage = false;
      stepContent = <ChooseService />;
      break;
    case 7:
      userMessageIcon = "👋";
      userMessage = "Account setup";
      showSignInMessage = false;
      stepContent = <AddServices />;
      break;
    case 8:
      userMessageIcon = "👋";
      userMessage = "Account setup";
      showSignInMessage = false;
      stepContent = <AddAdditionalInfo />;
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
        marginTop: { xs: 12 },
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
  );
}
