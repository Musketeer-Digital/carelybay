import * as React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const cards = [
  {
    id: 1,
    image: <WorkOutlineIcon />,
    title: "Post a job",
  },
  {
    id: 2,
    image: <PersonAddIcon />,
    title: "Find a job",
  },
];

function ChooseRoleCards() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  console.log(selectedCard);
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                  width: 40,
                  borderRadius: 2,
                  backgroundColor:
                    selectedCard === index ? "common.white" : "#D9D9D9",
                  border: "1px",
                  borderColor: "#D9D9D9",
                  borderStyle: "solid",
                }}
              >
                {card.image}
              </Box>
              <Box sx={{ display: "flex", alignSelf: "flex-end", mt: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {card.title}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default ChooseRoleCards;
