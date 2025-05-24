import { Card, CardActionArea, CardContent } from "@mui/material";
import React from "react";
import CardImage from "./card-image/card-image";
import CardTitle from "./card-title/card-title";

export interface DisplayCardInfo {
  id: number;
  image: React.ReactNode;
  title: string;
}
interface CheckboxCardProps {
  cardData: DisplayCardInfo;
  selectedCardIndex: number;
  onCardSelect: (index: number) => void;
  index: number;
}

const CheckboxCard: React.FC<CheckboxCardProps> = ({
  cardData,
  index,
  onCardSelect,
  selectedCardIndex,
}) => {
  return (
    <Card key={cardData.id} sx={{ boxShadow: "none", border: "1px", flex: 1 }}>
      <CardActionArea
        onClick={() => onCardSelect && onCardSelect(index)}
        data-active={selectedCardIndex === index ? "" : undefined}
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
            image={cardData?.image}
            isSelected={selectedCardIndex === index}
          />
          <CardTitle title={cardData?.title} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CheckboxCard;
