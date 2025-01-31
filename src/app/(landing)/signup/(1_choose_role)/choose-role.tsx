import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import ChooseRoleCards from "./choose-role-cards";

export default function ChooseRole() {
  return (
    <div>
      <h2>Create your Carelybay account</h2>
      <p>Choose your role</p>
      <ChooseRoleCards />
    </div>
  );
}
