import React from "react";
import { Box, Button } from "@mui/material";
import CustomizedSteppers from "@/app/components/stepper";
import SignInMessage from "@/app/components/SignInMessage";

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
        <CustomizedSteppers
          activeStep={step}
          sx={{ display: { xs: "none", md: "flex" } }}
        />
      </Box>
    </Box>
  );
};

export default LandingActions;
