import * as React from "react";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CardDisplay from "@/app/components/checkbox-card/card-display/card-display";
import type { DisplayCardInfo } from "@/app/components/checkbox-card/card-display/card-display";

const cards: DisplayCardInfo[] = [
  {
    id: 1,
    image: <WorkOutlineIcon />,
    title: "Post a Job",
  },
  {
    id: 2,
    image: <PersonAddIcon />,
    title: "Find a Job",
  },
];

export default function ChooseRoleCards() {
  return <CardDisplay cards={cards} />;
}
