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
        <ToggleButton value="Cooking/Meal preparation">
          <Box
            sx={{
              width: "24px",
              height: "24px",
              backgroundColor: "white",
              borderRadius: "50%",
              marginRight: 1,
              opacity: services.includes("Cooking/Meal preparation") ? 1 : 0,
            }}
          >
            <OutdoorGrillIcon color="primary" />
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
              marginRight: 1,
              opacity: services.includes("Pick-up/Drop-off") ? 1 : 0,
            }}
          >
            <LocalTaxiIcon color="primary" />
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
              marginRight: 1,
              opacity: services.includes("Light housekeeping") ? 1 : 0,
            }}
          >
            <HouseIcon color="primary" />
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
              marginRight: 1,
              opacity: services.includes("Activities (e.g swimming)") ? 1 : 0,
            }}
          >
            <PoolIcon color="primary" />
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
              marginRight: 1,
              opacity: services.includes("Putting kids to bed") ? 1 : 0,
            }}
          >
            <NightShelterIcon color="primary" />
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
              marginRight: 1,
              opacity: services.includes("Homework help") ? 1 : 0,
            }}
          >
            <BedroomParentIcon color="primary" />
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
              marginRight: 1,
              opacity: services.includes("Bathing") ? 1 : 0,
            }}
          >
            <BathtubIcon color="primary" />
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
              marginRight: 1,
              opacity: services.includes("Virtual Cart") ? 1 : 0,
            }}
          >
            <SupportAgentIcon color="primary" />
          </Box>
          Virtual Cart
        </ToggleButton>
      </ToggleButtonGroup>
    </Container>
  );
}
