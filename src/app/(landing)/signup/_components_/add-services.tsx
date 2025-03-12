import { useState } from "react";
import { Container, Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import PageHeader from "@/app/components/layout/page-header";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import HouseIcon from "@mui/icons-material/House";
import PoolIcon from "@mui/icons-material/Pool";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

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
          <Box
            sx={{
              width: "24px",
              height: "24px",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          >
            <OutdoorGrillIcon />
          </Box>
          Cooking/Meal preparation
        </ToggleButton>
        <ToggleButton value="Pick-up/Drop-off">
          <Box
            sx={{
              width: "24px",
              height: "24px",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          >
            <LocalTaxiIcon />
          </Box>
          Pick-up/Drop-off
        </ToggleButton>
        <ToggleButton value="Light housekeeping">
          <Box
            sx={{
              width: "24px",
              height: "24px",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          >
            <HouseIcon />
          </Box>
          Light housekeeping
        </ToggleButton>
        <ToggleButton value="Activities (e.g swimming)">
          <Box
            sx={{
              width: "24px",
              height: "24px",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          >
            <PoolIcon />
          </Box>
          Activities (e.g swimming)
        </ToggleButton>
        <ToggleButton value="Putting kids to bed">
          <Box
            sx={{
              width: "24px",
              height: "24px",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          >
            <NightShelterIcon />
          </Box>
          Putting kids to bed
        </ToggleButton>
        <ToggleButton value="Homework help">
          <Box
            sx={{
              width: "24px",
              height: "24px",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          >
            <BedroomParentIcon />
          </Box>
          Homework help
        </ToggleButton>
        <ToggleButton value="Bathing">
          <Box
            sx={{
              width: "24px",
              height: "24px",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          >
            <BathtubIcon />
          </Box>
          Bathing
        </ToggleButton>
        <ToggleButton value="Virtual Cart">
          <Box
            sx={{
              width: "24px",
              height: "24px",
              backgroundColor: "white",
              borderRadius: "50%",
            }}
          >
            <SupportAgentIcon />
          </Box>
          Virtual Cart
        </ToggleButton>
      </ToggleButtonGroup>
    </Container>
  );
}
