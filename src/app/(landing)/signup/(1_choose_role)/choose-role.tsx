import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import ChooseRoleCards from "./choose-role-cards";

export default function ChooseRole() {
  const nextStep = () => {
    window.location.search = "step=2";
  };

  return (
    <div>
      <h2>Create your Carelybay account</h2>
        <p>Choose your role</p>
        <ChooseRoleCards />
        <Button onClick={nextStep}>Continue</Button>
    </div>
  );
}