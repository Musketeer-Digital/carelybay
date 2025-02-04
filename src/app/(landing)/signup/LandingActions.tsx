import React from "react";
import { Box, Button, Typography, Link } from "@mui/material";
import NextLink from "next/link";
import CustomizedSteppers from "@/app/components/stepper";

interface LandingActionsProps {
  nextStep: () => void;
  showSignInMessage: boolean;
  step: number;
}

const LandingActions: React.FC<LandingActionsProps> = ({
  nextStep,
  showSignInMessage,
  step,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Button
        variant="primary"
        onClick={nextStep}
        sx={{
          width: {
            xs: "100%",
            sm: 200,
            md: "100%",
            lg: 200,
          },
          height: "48px",
          alignSelf: "end",
          mb: 4,
        }}
      >
        Continue
      </Button>
      <Box sx={{ marginTop: "auto" }}>
        {showSignInMessage && (
          <Typography
            variant="h5"
            sx={{ textAlign: "center", marginBottom: 5 }}
          >
            Already using Carelybay?&nbsp;
            <Link component={NextLink} href="/signin">
              Sign in
            </Link>
          </Typography>
        )}
        <CustomizedSteppers activeStep={step} />
      </Box>
    </Box>
  );
};

export default LandingActions;
