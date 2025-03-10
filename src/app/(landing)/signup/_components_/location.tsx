import { Container } from "@mui/material";
import PageHeader from "@/app/components/layout/page-header";
import { TextField, Typography, Slider } from "@mui/material";
import { Autocomplete } from "@mui/material";

export default function Location() {
  return (
    <Container>
      <PageHeader
        heading="Location"
        subtitle="Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing"
      />
      <Typography
        sx={{
          fontWeight: "500",
          fontSize: "14px",
          lineHeight: "20px",
          marginTop: 8,
          marginBottom: 2,
        }}
      >
        Where's your home located?
      </Typography>
      <TextField type="text" placeholder="Search for your city" fullWidth />
      <Typography
        sx={{
          fontWeight: "500",
          fontSize: "18px",
          lineHeight: "100%",
          marginTop: 8,
          marginBottom: 2,
        }}
      >
        How far are you willing to travel?
      </Typography>
      <Slider
        defaultValue={25}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value} km`}
      ></Slider>
    </Container>
  );
}
