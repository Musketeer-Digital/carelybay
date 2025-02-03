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
        display: "flex",
        gap: 2,
        mb: 4,
      }}
    >
      {cards.map((card, index) => (
        <Card key={card.id} sx={{ boxShadow: "none", border: "1px", flex: 1 }}>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? "" : undefined}
            sx={{
              height: 120,
              "&[data-active], &:hover": {
                backgroundColor: "action.selected",
              },
              borderRadius: 4,
              border: "1px",
              borderColor: "#D9D9D9",
              borderStyle: "solid",
            }}
          >
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
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
