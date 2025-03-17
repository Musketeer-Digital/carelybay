import React from "react";
import PageHeader from "@/app/components/layout/page-header";
import {
  useForm,
  SubmitHandler,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import { Button, Box, Slider } from "@mui/material";
import LocationSelector from "@/components/location-selector";
import InputGroup from "@/components/input-group";
import TravelDistanceSlider from "./travel-distance-slider";
import useSWR from "swr";
import { fetcher } from "@/app/api/fetcher";
import { useUserStore } from "@/store/userStore";

interface PersonalInformationInputs {
  firstName: string;
  lastName: string;
  dob: string;
  phoneNumber: string;
  location: { id: number; name: string };
  travelDistanceKm: number;
}

const maxDistance = 100; // Maximum distance in kilometers
const step = 5; // Step increments in kilometers

export default function SetLocation() {
  const methods = useForm<PersonalInformationInputs>();
  const { control } = useFormContext<PersonalInformationInputs>();
  const { data: res } = useSWR("/api/locations", fetcher);
  const locations = res?.data || [];

  const setLocation = useUserStore((state) => state.setLocation);

  const onSubmit: SubmitHandler<PersonalInformationInputs> = (data) => {
    console.log(data);
    setLocation(data.location);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <PageHeader
        heading="Location"
        subtitle="Set your location to get the best experience."
        sx={{ mb: 4 }}
      />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box sx={{ mb: 4 }}>
            <LocationSelector
              heading="Where are you located?"
              locations={locations}
            />
          </Box>

          <Box sx={{ mb: 12 }}>
            <InputGroup heading={"How far are you willing to travel?"}>
              <TravelDistanceSlider
                name="travelDistanceKm"
                maxDistance={maxDistance}
                step={step}
              />
            </InputGroup>
          </Box>

          <Button variant="primary" type="submit" fullWidth>
            Next
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
}
