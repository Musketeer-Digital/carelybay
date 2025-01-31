import React from "react";
import { Button } from "@mui/material";
import ChooseServiceCards from "./choose-service-cards";

export default function ChooseService() {
  return (
    <div>
      <h2>Choose Your Service</h2>
      <p>Pick your service for the signup process.</p>
      <ChooseServiceCards />
    </div>
  );
}
