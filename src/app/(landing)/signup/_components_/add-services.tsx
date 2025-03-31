import { useState } from "react";
import { Container, Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import PageHeader from "@/app/components/layout/page-header";
import {
  OutdoorGrill,
  LocalTaxi,
  House,
  Pool,
  NightShelter,
  BedroomParent,
  Bathtub,
  SupportAgent,
} from "@mui/icons-material";

const servicesList = [
  { label: "Cooking/Meal preparation", icon: OutdoorGrill },
  { label: "Pick-up/Drop-off", icon: LocalTaxi },
  { label: "Light housekeeping", icon: House },
  { label: "Activities (e.g swimming)", icon: Pool },
  { label: "Putting kids to bed", icon: NightShelter },
  { label: "Homework help", icon: BedroomParent },
  { label: "Bathing", icon: Bathtub },
  { label: "Virtual Cart", icon: SupportAgent },
];

export default function AddServices() {
  const [services, setServices] = useState<string[]>([]);

  const handleServices = (
    event: React.MouseEvent<HTMLElement>,
    newServices: string[],
  ) => {
    setServices(newServices);
  };

  return (
    <Container>
      <PageHeader
        heading="Add your Services provided"
        subtitle="Set your location to check the services"
      />
      <ToggleButtonGroup
        value={services}
        onChange={handleServices}
        orientation="vertical"
        sx={{ display: "flex", gap: 2, marginTop: 4, alignItems: "flex-start" }}
      >
        {servicesList.map(({ label, icon: Icon }) => (
          <ToggleButton key={label} value={label}>
            <Box
              sx={{
                width: "24px",
                height: "24px",
                backgroundColor: "white",
                borderRadius: "50%",
                marginRight: 1,
                opacity: services.includes(label) ? 1 : 0,
              }}
            >
              <Icon color="primary" />
            </Box>
            {label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Container>
  );
}
