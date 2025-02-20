import PageHeader from "@/app/components/layout/page-header";
import { useForm, SubmitHandler } from "react-hook-form";
import { Container, Box, Typography, TextField, Button } from "@mui/material";

interface PersonalInformationInputs {
  firstName: string;
  lastName: string;
  dob: string;
  phoneNumber: string;
}

export default function PersonalInformation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInformationInputs>();

  const onSubmit: SubmitHandler<PersonalInformationInputs> = (data) => {
    console.log(data);
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <PageHeader
        heading="Personal Information"
        subtitle="Sign in to manage your services."
      />
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundColor: "#FFAE1F1A",
            }}
          >
            {/* TODO: profilePicture ? profilePicture : Initial */}
            <Typography
              fontWeight={"700"}
              fontSize={"64px"}
              lineHeight={"46px"}
            >
              S
            </Typography>
            <Button
              sx={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translate(-50%, 50%)",
                backgroundColor: "#FFFFFF",
                color: "#171717",
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "24px",
                border: "1px solid #EAEAEA",
                borderRadius: "16px",
                minWidth: "40px",
                height: "40px",
                whiteSpace: "nowrap",
              }}
            >
              + Add
            </Button>
          </Box>
        </Box>

        <Box>
          <Typography fontWeight={"600"} fontSize={"18px"} lineHeight={"27px"}>
            Upload Profile picture
          </Typography>
          <Typography fontWeight={"400"} fontSize={"16px"} lineHeight={"24px"}>
            You can skip for now and upload profile picture later
          </Typography>
        </Box>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            {...register("firstName", { required: "First name is required" })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
            placeholder="First Name*"
            type="text"
            sx={{ flex: 1 }}
          />
          <TextField
            {...register("lastName", { required: "Last name is required" })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
            placeholder="Last Name*"
            type="text"
            sx={{ flex: 1 }}
          />
        </Box>
        <TextField
          {...register("dob")}
          placeholder="Date of birth*"
          type="date"
          fullWidth
        ></TextField>
        <TextField
          {...register("phoneNumber", { required: "Phone number is required" })}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          placeholder="Phone Number*"
          type="tel"
          fullWidth
        />
        <Button variant="primary" type="submit" fullWidth>
          Next
        </Button>
      </form>
    </Container>
  );
}
