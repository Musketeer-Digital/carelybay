import type { Meta, StoryObj } from "@storybook/react";

import Stepper from "./stepper";

const meta = {
  component: Stepper,
} satisfies Meta<typeof Stepper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeStep: 0,
  },
};
