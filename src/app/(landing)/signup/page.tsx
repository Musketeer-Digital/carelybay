// src/app/(landing)/signup/page.tsx
"use client";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CustomizedSteppers from "@/app/components/stepper";
import ChooseRole from "./(1_choose_role)/choose-role";
import ChooseService from "./(2_1_providers_choose_service)/choose-service";
import SignUp from "./(3_signup)/signup";

const MAX_STEPS = 3;

export default function SignupPages() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);

  let userMessage = "";
  let showSignInMessage = true;
  let stepContent;

  const onStepChange = (newStep: number) => {
    setStep(newStep);
  };

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
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
        {/* "Welcome to Carelybay", "Email sent", etc */}
        {userMessage && (
          <img
            src="https://placehold.co/24x24"
            alt="Message image"
            width={24}
            height={24}
          />
        )}
        <Typography>{userMessage}</Typography>
      </Box>
      {stepContent}
      <Button
        variant="primary"
        onClick={nextStep}
        sx={{ width: "200px", height: "48px", alignSelf: "end" }}
      >
        Continue
      </Button>
      <Box sx={{ marginTop: "auto" }}>
        {showSignInMessage && (
          <Typography
            fontWeight={"400"}
            fontSize={"18px"}
            lineHeight={"27px"}
            sx={{ textAlign: "center" }}
          >
            Already using Careleybay?{" "}
            <Link href="/signin" style={{ fontWeight: "600" }}>
              Sign in
            </Link>
          </Typography>
        )}
        <CustomizedSteppers step={step} />
      </Box>
    </Box>
  );
}
