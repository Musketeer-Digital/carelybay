import React from "react";
import { Box, Card, CardContent, CardActionArea } from "@mui/material";
import CardImage from "./card-image";
import CardTitle from "./card-title";

export interface DisplayCardInfo {
  id: number;
  image: React.ReactNode;
  title: string;
}

export default function CardDisplay({ cards }: { cards: DisplayCardInfo[] }) {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
        gap: 2,
        mb: 4,
      }}
    >
      {cards.map((card, index) => (
        <Card key={card.id} sx={{ boxShadow: "none", border: "1px" }}>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? "" : undefined}
            sx={{
              height: "100%",
              "&[data-active], &:hover": {
                backgroundColor: "action.selected",
              },
              borderRadius: 4,
              border: "1px",
              borderColor: "#D9D9D9",
              borderStyle: "solid",
              padding: 1,
            }}
          >
            <CardContent sx={{ height: "100%" }}>
              <CardImage
                image={card.image}
                isSelected={selectedCard === index}
              />
              <CardTitle title={card.title} />
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
