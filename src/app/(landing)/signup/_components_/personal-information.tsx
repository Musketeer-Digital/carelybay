import PageHeader from "@/app/components/layout/page-header";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Input,
} from "@mui/material";

interface PersonalInformationInputs {
  firstName: string;
  lastName: string;
  dob: string;
  phoneNumber: string;
  file: File;
}

export default function PersonalInformation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInformationInputs>();

  const onSubmit: SubmitHandler<PersonalInformationInputs> = async (
    data: PersonalInformationInputs,
  ) => {
    const { file } = data;
    const formData = new FormData();
    formData.append("file", data.file);

    const uploadResponse = await fetch("api/file", {
      method: "PUT",
      body: formData,
    });

    if (!uploadResponse.ok) {
      throw new Error("Failed to upload file");
    }

    console.log(uploadResponse);
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <PageHeader
        heading="Personal Information"
        subtitle="Sign in to manage your services."
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              position: "relative",
              marginBottom: 4,
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
                component="label"
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
                <input
                  {...register("file")}
                  type="file"
                  hidden
                  onChange={(e) => console.log(e.target.files?.[0])}
                />
                + Add
              </Button>
            </Box>
          </Box>

          <Box>
            <Typography
              fontWeight={"600"}
              fontSize={"18px"}
              lineHeight={"27px"}
            >
              Upload Profile picture
            </Typography>
            <Typography
              fontWeight={"400"}
              fontSize={"16px"}
              lineHeight={"24px"}
            >
              You can skip for now and upload profile picture later
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
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
          sx={{ marginBottom: 2 }}
        ></TextField>
        <TextField
          {...register("phoneNumber", { required: "Phone number is required" })}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          placeholder="Phone Number*"
          type="tel"
          fullWidth
          sx={{ marginBottom: 4 }}
        />
        <Button variant="primary" type="submit" fullWidth>
          Next
        </Button>
      </form>
    </Container>
  );
}
