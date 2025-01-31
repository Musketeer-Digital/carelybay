// src/app/(landing)/signup/page.tsx
"use client";
import React from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import ChooseRole from "./(1_choose_role)/choose-role";
import ChooseService from "./(2_1_providers_choose_service)/choose-service";

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
      stepContent = <ChooseRole onStepChange={onStepChange} />;
      break;
    case 2:
      userMessage = "";
      stepContent = <ChooseService onStepChange={onStepChange} />;
      break;
    default:
      userMessage = "Welcome to Carelybay";
      stepContent = <ChooseRole onStepChange={onStepChange} />;
      break;
  }

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
    </>
  );
}
