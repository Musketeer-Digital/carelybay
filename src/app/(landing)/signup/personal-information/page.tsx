"use client";
import React from "react";
import { Box, Container } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import UserNotificationMessage from "../_components_/UserNotificationMessage";
import SignupMarketingPanel from "@/app/components/signup-marketing-panel/signup-marketing-panel";
import SignInMessage from "@/app/components/SignInMessage";
import PersonalInformation, {
  PersonalInformationInputs,
} from "../_components_/personal-information";

export default function PersonalInformationPage() {
  const methods = useForm<PersonalInformationInputs>();

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
            icon="✅"
            message="Verification completed successfully."
            sx={{ mb: 4 }}
          />

          <FormProvider {...methods}>
            <Box sx={{ mb: 6 }}>
              <PersonalInformation />
            </Box>
          </FormProvider>

          <SignInMessage sx={{ mb: { xs: 2, md: 5 } }} />
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
