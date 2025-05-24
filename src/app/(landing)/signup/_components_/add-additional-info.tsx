import { useState } from "react";
import {
  Container,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
} from "@mui/material";
import PageHeader from "@/components/layout/page-header";
import {
  SmokeFree,
  DirectionsCar,
  Pets,
  Sick,
  ChildCare,
  BabyChangingStation,
  Vaccines,
  House,
  HouseSiding,
  Yard,
} from "@mui/icons-material";

const additionalInfoList = [
  { label: "Non-smoker", icon: SmokeFree },
  { label: "Own transport", icon: DirectionsCar },
  { label: "Comfortable with pets", icon: Pets },
  { label: "Willing to care for sick kids", icon: Sick },
  { label: "Exp. with twins/multiples", icon: ChildCare },
  { label: "Exp. with special needs", icon: BabyChangingStation },
  { label: "Exp. with nursing", icon: Vaccines },
  { label: "Available for after-school care", icon: House },
  { label: "Interested in live-in jobs", icon: HouseSiding },
  { label: "Interested in live-out jobs", icon: Yard },
];

export default function AddAdditionalInfo() {
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelected = (
    event: React.MouseEvent<HTMLElement>,
    newSelected: string[],
  ) => {
    setSelected(newSelected);
  };

  return (
    <Container>
      <PageHeader
        heading="Add additional information"
        subtitle="Set any additional information"
      />
      <ToggleButtonGroup
        value={selected}
        onChange={handleSelected}
        sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 4 }}
      >
        {additionalInfoList.map(({ label, icon: Icon }) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "120px",
              textAlign: "center",

              "&.Mui-selected": {
                background: "#FF6817",
              },
            }}
          >
            <ToggleButton
              value={label}
              sx={{
                padding: 2,

                "&.Mui-selected": {
                  background: "#FF6817",
                  border: "1px solid transparent !important",
                },
              }}
            >
              <Icon
                sx={{
                  color: selected.includes(label) ? "#FFFFFF" : "#171717",
                }}
              />
            </ToggleButton>
            <Typography sx={{ marginTop: 1 }}>{label}</Typography>
          </Box>
        ))}
      </ToggleButtonGroup>
    </Container>
  );
}
