import { useState } from "react";
import { Container, ToggleButtonGroup, ToggleButton } from "@mui/material";
import PageHeader from "@/app/components/layout/page-header";

export default function AddServices() {
  const [services, setServices] = useState(() => [
    "Cooking/Meal preparation",
    "Pick-up/Drop-off",
    "Light housekeeping",
    "Activities (e.g swimming)",
    "Putting kids to bed",
    "Homework help",
    "Bathing",
    "Virtual Cart",
  ]);

  const handleFormat = (
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
        onChange={handleFormat}
        orientation="vertical"
        sx={{ display: "flex", gap: 2, marginTop: 4, alignItems: "flex-start" }}
      >
        <ToggleButton value="Cooking/Meal preparation">
          Cooking/Meal preparation
        </ToggleButton>
        <ToggleButton value="Pick-up/Drop-off">Pick-up/Drop-off</ToggleButton>
        <ToggleButton value="Light housekeeping">
          Light housekeeping
        </ToggleButton>
        <ToggleButton value="Activities (e.g swimming)">
          Activities (e.g swimming)
        </ToggleButton>
        <ToggleButton value="Putting kids to bed">
          Putting kids to bed
        </ToggleButton>
        <ToggleButton value="Homework help">Homework help</ToggleButton>
        <ToggleButton value="Bathing">Bathing</ToggleButton>
        <ToggleButton value="Virtual Cart">Virtual Cart</ToggleButton>
      </ToggleButtonGroup>
    </Container>
  );
}
