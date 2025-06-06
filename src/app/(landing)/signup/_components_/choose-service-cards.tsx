import React from "react";
import Face4Icon from "@mui/icons-material/Face4";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning";
import ElderlyIcon from "@mui/icons-material/Elderly";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import CardDisplay from "@/app/components/checkbox-card/card-display/card-display";
import type { DisplayCardInfo } from "@/app/components/checkbox-card/checkbox-card";
import { ChildCareIcon } from "@/app/components/icons/childcare-icon";

const cards: DisplayCardInfo[] = [
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

export default function ChooseServiceCards() {
  return <CardDisplay cards={cards} />;
}
