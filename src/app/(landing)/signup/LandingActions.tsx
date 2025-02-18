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
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <Button
        variant="primary"
        onClick={nextStep}
        sx={{
          width: {
            xs: "100%",
            sm: 200,
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
            sx={{ textAlign: "center", marginBottom: { xs: 2, md: 5 } }}
          >
            Already using Carelybay?&nbsp;
            <Link component={NextLink} href="/signin">
              Sign in
            </Link>
          </Typography>
        )}
        <CustomizedSteppers
          activeStep={step}
          sx={{ display: { xs: "none", md: "flex" } }}
        />
      </Box>
    </Box>
  );
};

export default LandingActions;
