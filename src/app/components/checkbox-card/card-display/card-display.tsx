import React from "react";
import { Box } from "@mui/material";
import CheckboxCard, { DisplayCardInfo } from "../checkbox-card";

export default function CardDisplay({
  cards = [],
}: {
  cards: DisplayCardInfo[];
}) {
  const [selectedCardIndex, setSelectedCardIndex] = React.useState(0);
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: 2,
        mb: 4,

        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      {cards.map((card, index) => (
        <CheckboxCard
          key={card.id}
          cardData={card}
          selectedCardIndex={selectedCardIndex}
          onCardSelect={setSelectedCardIndex}
          index={index}
        />
      ))}
    </Box>
  );
}
