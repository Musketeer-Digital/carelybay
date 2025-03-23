import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import Header from "./Header";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/app/theme";

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story: StoryFn) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;

export const Default: StoryFn = (args) => <Header {...args} />;
