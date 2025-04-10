import React from "react";
import SignUp from "./_components_/signup";
import VerifyEmailCode from "./_components_/verify-email-code";
import PersonalInformation from "./_components_/personal-information";
import SetLocation from "./_components_/set-location";
import ChooseRole from "./_components_/choose-role";
import ChooseService from "./_components_/choose-service";
import AddServices from "./_components_/add-services";
import AddAdditionalInfo from "./_components_/add-additional-info";

export const allSteps = {
  1: {
    userMessageIcon: "👋",
    userMessage: "Welcome to Carelybay",
    showSignInMessage: true,
    stepContent: (nextStep?: () => void) => <SignUp nextStep={nextStep} />,
  },
  2: {
    userMessageIcon: "👋",
    userMessage: "Email sent",
    showSignInMessage: false,
    stepContent: (nextStep?: () => void) => (
      <VerifyEmailCode nextStep={nextStep} />
    ),
  },
  3: {
    userMessageIcon: "✅",
    userMessage: "Verification completed successfully.",
    showSignInMessage: true,
    stepContent: (nextStep?: () => void) => (
      <PersonalInformation nextStep={nextStep} />
    ),
  },
  4: {
    userMessageIcon: "✅",
    userMessage: "Profile info added.",
    showSignInMessage: false,
    stepContent: (nextStep?: () => void) => <SetLocation nextStep={nextStep} />,
  },
  5: {
    userMessageIcon: "👋",
    userMessage: "Welcome to Carelybay",
    showSignInMessage: false,
    stepContent: (nextStep?: () => void) => <ChooseRole />,
  },
  6: {
    userMessageIcon: "👋",
    userMessage: "Account setup",
    showSignInMessage: false,
    stepContent: (nextStep?: () => void) => <ChooseService />,
  },
  7: {
    userMessageIcon: "👋",
    userMessage: "Account setup",
    showSignInMessage: false,
    stepContent: (nextStep?: () => void) => <AddServices />,
  },
  8: {
    userMessageIcon: "👋",
    userMessage: "Account setup",
    showSignInMessage: false,
    stepContent: (nextStep?: () => void) => <AddAdditionalInfo />,
  },
  default: {
    userMessageIcon: "👋",
    userMessage: "Welcome to Carelybay",
    showSignInMessage: true,
    stepContent: (nextStep?: () => void) => <SignUp nextStep={nextStep} />,
  },
};

export const signupSteps = {
  1: {
    userMessageIcon: "👋",
    userMessage: "Welcome to Carelybay",
    showSignInMessage: true,
    stepContent: (nextStep?: () => void) => <SignUp nextStep={nextStep} />,
  },
  2: {
    userMessageIcon: "👋",
    userMessage: "Email sent",
    showSignInMessage: false,
    stepContent: (nextStep?: () => void) => (
      <VerifyEmailCode prevStep={() => {}} nextStep={nextStep} />
    ),
  },
  3: {
    userMessageIcon: "✅",
    userMessage: "Verification completed successfully.",
    showSignInMessage: true,
    stepContent: (nextStep?: () => void) => <PersonalInformation />,
  },
  4: {
    userMessageIcon: "✅",
    userMessage: "Profile info added.",
    showSignInMessage: false,
    stepContent: (nextStep?: () => void) => <SetLocation />,
  },
  default: {
    userMessageIcon: "👋",
    userMessage: "Welcome to Carelybay",
    showSignInMessage: true,
    stepContent: (nextStep?: () => void) => <SignUp nextStep={nextStep} />,
  },
};

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
