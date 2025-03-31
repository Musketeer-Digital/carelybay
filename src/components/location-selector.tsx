import { useFormContext } from "react-hook-form";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Stack,
  Autocomplete,
} from "@mui/material";
import InputGroup from "./input-group"; // Import the new InputGroup component
import { ChangeEvent, FormEvent } from "react";
import useSWR from "swr";

interface Location {
  id: number;
  name: string;
}

interface LocationSelectorProps {
  heading: string;
  locations: Location[];
}

export default function LocationSelector({
  heading,
  locations,
}: LocationSelectorProps) {
  const { register, setValue } = useFormContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedLocation = locations.find(
      (location) => location.id === +event.target.value,
    );
    setValue("location", selectedLocation);
  };

  return (
    <Autocomplete
      options={locations}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for your city"
          {...register("location.id", { required: "Location is required" })}
          fullWidth
          margin="normal"
        />
      )}
      onChange={(e) => handleChange(e as any)}
    />
  );
}
