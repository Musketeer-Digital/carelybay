import { useFormContext } from "react-hook-form";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import InputGroup from "./input-group"; // Import the new InputGroup component

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

  const handleChange = (event) => {
    const selectedLocation = locations.find(
      (location) => location.id === event.target.value,
    );
    setValue("location", selectedLocation);
  };

  return (
    <Stack>
      <InputGroup heading={heading}>
        <TextField
          select
          label="Search for your city"
          {...register("location.id", { required: "Location is required" })}
          onChange={handleChange}
          fullWidth
          margin="normal"
        >
          {locations.map((location) => (
            <MenuItem key={location.id} value={location.id}>
              {location.name}
            </MenuItem>
          ))}
        </TextField>
      </InputGroup>
    </Stack>
  );
}
