import PageHeader from "@/app/components/layout/page-header";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { Container, Button, Box } from "@mui/material";
import LocationSelector from "@/components/location-selector";

interface PersonalInformationInputs {
  firstName: string;
  lastName: string;
  dob: string;
  phoneNumber: string;
  location: { id: number; name: string };
}

const locations = [
  { id: 1, name: "New York" },
  { id: 2, name: "Los Angeles" },
  { id: 3, name: "Chicago" },
];

export default function SetLocation() {
  const methods = useForm<PersonalInformationInputs>();

  const onSubmit: SubmitHandler<PersonalInformationInputs> = (data) => {
    console.log(data);
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

          <Button variant="primary" type="submit" fullWidth>
            Next
          </Button>
        </form>
      </FormProvider>
    </Box>
  );
}
