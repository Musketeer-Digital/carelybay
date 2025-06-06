import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react";
import CustomDialog from "./CustomDialog";
import { ThemeProvider, CssBaseline, Button } from "@mui/material";
import { theme } from "@/app/theme";
import CustomButton from "./CustomButton";

const meta: Meta<typeof CustomDialog> = {
  title: "Components/CustomDialog",
  component: CustomDialog,
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
    maxWidth: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    fullWidth: { control: "boolean" },
  },
};

export default meta;

type CustomDialogProps = React.ComponentProps<typeof CustomDialog>;

export const Default: StoryFn<CustomDialogProps> = (args) => {
  const [open, setOpen] = useState(true);

  return (
    <CustomDialog
      {...args}
      open={open}
      onClose={() => {
        alert("Dialog closed");
        setOpen(false);
      }}
      footerButtons={
        <>
          <CustomButton variant="outlined" onClick={() => setOpen(false)}>
            Cancel
          </CustomButton>
          <CustomButton variant="primary" onClick={() => alert("Confirmed!")}>
            Confirm
          </CustomButton>
        </>
      }
    >
      This is some sample dialog content. You can put anything here like forms,
      text, or other components.
    </CustomDialog>
  );
};

Default.args = {
  title: "Custom Dialog Title",
  maxWidth: "sm",
  fullWidth: true,
};
