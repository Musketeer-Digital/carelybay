import React from "react";
import { Button } from "@mui/material";

export default function ChooseService({
  onStepChange,
}: {
  onStepChange: (newStep: number) => void;
}) {
  const nextStep = () => {
    onStepChange(3);
  };

  return (
    <div>
      <h2>Choose Your Service</h2>
      <p>Pick your service for the signup process.</p>
      <Button onClick={nextStep}>Continue</Button>
    </div>
  );
}
