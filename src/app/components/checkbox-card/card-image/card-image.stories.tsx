import type { Meta, StoryObj } from "@storybook/react";

import CardImage from "./card-image";
import Image from "next/image";

const meta = {
  component: CardImage,
} satisfies Meta<typeof CardImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: (
      <Image
        src="https://placeholder.co/24x24"
        width="24"
        height="24"
        alt="placeholder-image"
      />
    ),
    isSelected: true,
  },
};
