// src/app/(landing)/signup/page.tsx
"use client";
import React from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import ChooseRole from "./(1_choose_role)/choose-role";
import ChooseService from "./(2_1_providers_choose_service)/choose-service";

export default function SignupPages() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = searchParams.get("step");
  let userMessage = "";

  let stepContent;
  switch (step) {
    case "1":
      userMessage = "Welcome to Carelybay";
      stepContent = <ChooseRole />;
      break;
    case "2":
      userMessage = "";
      stepContent = <ChooseService />;
      break;
    default:
      userMessage = "Welcome to Carelybay";
      stepContent = <ChooseRole />;
      break;
  }

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
        {/* "Welcome to Carelybay", "Email sent", etc */}
        {userMessage && <img src="https://placehold.co/24x24" alt="Message image" width={24} height={24} />}
        <p>{ userMessage }</p>
      </Box>
      {stepContent}
    </Box>
  );
}
