import React from "react";
import CustomButton from "./CustomButton";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/app/theme";
import { StoryFn } from "@storybook/react";

export default {
  title: "Components/CustomButton",
  component: CustomButton,
  decorators: [
    (Story: StoryFn) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export const Primary = {
  args: {
    children: "Primary Button",
    variant: "contained",
  },
};

export const WithHref = {
  args: {
    children: "Go to Profile",
    href: "/profile",
    variant: "outlined",
  },
};

export const Loading = {
  args: {
    children: "Submitting...",
    loading: true,
    variant: "contained",
  },
};

export const Disabled = {
  args: {
    children: "Disabled Button",
    disabled: true,
    variant: "contained",
  },
};

export const Small = {
  args: {
    children: "Small Button",
    size: "small",
    variant: "contained",
  },
};
