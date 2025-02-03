import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import Face4Icon from "@mui/icons-material/Face4";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import ElderlyIcon from "@mui/icons-material/Elderly";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";

import Image from "next/image";

const cards = [
  {
    id: 1,
    image: <ChildCareIcon />,
    title: "Childcare",
  },
  {
    id: 2,
    image: <Face4Icon />,
    title: "Au Pairs",
  },
  {
    id: 3,
    image: <LocalLibraryIcon />,
    title: "Tutors",
  },
  {
    id: 4,
    image: <EscalatorWarningIcon />,
    title: "Special needs care",
  },
  {
    id: 5,
    image: <ElderlyIcon />,
    title: "Aged care",
  },
  {
    id: 6,
    image: <OtherHousesIcon />,
    title: "Household help",
  },
];

function ChooseServiceCards() {
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
              <Box sx={{ display: "flex", alignItems: "end", mt: 1 }}>
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

export default ChooseServiceCards;
