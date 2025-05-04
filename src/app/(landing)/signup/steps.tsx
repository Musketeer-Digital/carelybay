import React from "react";
import ChooseRole from "./_components_/choose-role";
import ChooseService from "./_components_/choose-service";
import AddServices from "./_components_/add-services";
import AddAdditionalInfo from "./_components_/add-additional-info";

export const serviceProviderSteps = {
  1: {
    userMessageIcon: "👋",
    userMessage: "Welcome to Carelybay",
    showSignInMessage: false,
    stepContent: (nextStep?: () => void) => <ChooseRole />,
  },
  2: {
    userMessageIcon: "👋",
    userMessage: "Account setup",
    showSignInMessage: false,
    stepContent: (nextStep?: () => void) => <ChooseService />,
  },
  3: {
    userMessageIcon: "👋",
    userMessage: "Account setup",
    showSignInMessage: false,
    stepContent: (nextStep?: () => void) => <AddServices />,
  },
  4: {
    userMessageIcon: "👋",
    userMessage: "Account setup",
    showSignInMessage: false,
    stepContent: (nextStep?: () => void) => <AddAdditionalInfo />,
  },
  default: {
    userMessageIcon: "👋",
    userMessage: "Welcome to Carelybay",
    showSignInMessage: true,
    stepContent: (nextStep?: () => void) => <ChooseRole />,
  },
};
