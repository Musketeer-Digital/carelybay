// src/app/(landing)/signup/page.tsx
"use client";
import React from "react";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import CustomizedSteppers from "@/app/components/stepper";
import ChooseRole from "./(1_choose_role)/choose-role";
import ChooseService from "./(2_1_providers_choose_service)/choose-service";

const MAX_STEPS = 2;

export default function SignupPages() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);

  let userMessage = "";

  let stepContent;

  const onStepChange = (newStep: number) => {
    setStep(newStep);
  };

  switch (step) {
    case 1:
      userMessage = "Welcome to Carelybay";
      stepContent = <ChooseRole />;
      break;
    case 2:
      userMessage = "";
      stepContent = <ChooseService />;
      break;
    default:
      userMessage = "Welcome to Carelybay";
      stepContent = <ChooseRole />;
      break;
  }

  const nextStep = () => {
    setStep(step === MAX_STEPS ? 0 : step + 1);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
        {/* "Welcome to Carelybay", "Email sent", etc */}
        {userMessage && (
          <img
            src="https://placehold.co/24x24"
            alt="Message image"
            width={24}
            height={24}
          />
        )}
        <p>{userMessage}</p>
      </Box>
      {stepContent}
      <Button variant="primary" onClick={nextStep}>
        Continue
      </Button>
      <CustomizedSteppers step={step} />
    </>
  );
}
