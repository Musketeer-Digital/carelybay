import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react";
import CustomConfirmationModal from "./CustomConfirmationModal";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/app/theme";

const meta: Meta<typeof CustomConfirmationModal> = {
  title: "Components/CustomConfirmationModal",
  component: CustomConfirmationModal,
  decorators: [
    (Story: StoryFn) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    confirmText: { control: "text" },
    cancelText: { control: "text" },
  },
};

export default meta;

type CustomConfirmationModalStoryProps = React.ComponentProps<
  typeof CustomConfirmationModal
>;

export const Default: StoryFn<CustomConfirmationModalStoryProps> = (args) => {
  const [open, setOpen] = useState(true);

  return (
    <CustomConfirmationModal
      {...args}
      open={open}
      onClose={() => {
        alert("Cancel clicked");
        setOpen(false);
      }}
      onConfirm={() => {
        alert("Confirm clicked");
        setOpen(false);
      }}
    />
  );
};

Default.args = {
  title: "Delete this item?",
  description:
    "This action cannot be undone. Are you sure you want to delete this item?",
  confirmText: "Yes, Delete",
  cancelText: "No",
};
