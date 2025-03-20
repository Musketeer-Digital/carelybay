import React from "react";
import SignUp from "./_components_/signup";
import VerifyEmailCode from "./_components_/verify-email-code";
import PersonalInformation from "./_components_/personal-information";
import SetLocation from "./_components_/set-location";
import ChooseRole from "./_components_/choose-role";
import ChooseService from "./_components_/choose-service";
import AddServices from "./_components_/add-services";

export const allSteps = {
  1: {
    userMessageIcon: "👋",
    userMessage: "Welcome to Carelybay",
    showSignInMessage: true,
    stepContent: <SignUp nextStep={() => {}} />,
  },
  2: {
    userMessageIcon: "👋",
    userMessage: "Email sent",
    showSignInMessage: false,
    stepContent: <VerifyEmailCode prevStep={() => {}} nextStep={() => {}} />,
  },
  3: {
    userMessageIcon: "✅",
    userMessage: "Verification completed successfully.",
    showSignInMessage: true,
    stepContent: <PersonalInformation />,
  },
  4: {
    userMessageIcon: "✅",
    userMessage: "Profile info added.",
    showSignInMessage: false,
    stepContent: <SetLocation />,
  },
  5: {
    userMessageIcon: "👋",
    userMessage: "Welcome to Carelybay",
    showSignInMessage: false,
    stepContent: <ChooseRole />,
  },
  6: {
    userMessageIcon: "👋",
    userMessage: "Account setup",
    showSignInMessage: false,
    stepContent: <ChooseService />,
  },
  7: {
    userMessageIcon: "👋",
    userMessage: "Account setup",
    showSignInMessage: false,
    stepContent: <AddServices />,
  },
  default: {
    userMessageIcon: "👋",
    userMessage: "Welcome to Carelybay",
    showSignInMessage: true,
    stepContent: <SignUp nextStep={() => {}} />,
  },
};

export const signupSteps = {
  1: {
    userMessageIcon: "👋",
    userMessage: "Welcome to Carelybay",
    showSignInMessage: true,
    stepContent: <SignUp nextStep={() => {}} />,
  },
  2: {
    userMessageIcon: "👋",
    userMessage: "Email sent",
    showSignInMessage: false,
    stepContent: <VerifyEmailCode prevStep={() => {}} nextStep={() => {}} />,
  },
  3: {
    userMessageIcon: "✅",
    userMessage: "Verification completed successfully.",
    showSignInMessage: true,
    stepContent: <PersonalInformation />,
  },
  4: {
    userMessageIcon: "✅",
    userMessage: "Profile info added.",
    showSignInMessage: false,
    stepContent: <SetLocation />,
  },
  default: {
    userMessageIcon: "👋",
    userMessage: "Welcome to Carelybay",
    showSignInMessage: true,
    stepContent: <SignUp nextStep={() => {}} />,
  },
};
