import type { Meta, StoryObj } from "@storybook/react";

import CardDisplay from "./card-display";

const meta = {
  component: CardDisplay,
} satisfies Meta<typeof CardDisplay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    cards: [{ id: 1, image: "image", title: "title" }],
  },
};
