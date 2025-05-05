import React from "react";
import type { Meta, StoryFn } from "@storybook/react";
import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import { theme } from "@/app/theme";
import ProfileHeader from "./ProfileHeader";

const meta: Meta<typeof ProfileHeader> = {
  title: "Components/ProfileHeader",
  component: ProfileHeader,
  decorators: [
    (Story: StoryFn) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="sm" sx={{ paddingY: 5 }}>
          <Story />
        </Container>
      </ThemeProvider>
    ),
  ],
};

export default meta;

export const Default: StoryFn = () => <ProfileHeader />;
