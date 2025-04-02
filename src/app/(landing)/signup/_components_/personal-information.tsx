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
import { useState } from "react";
import Image from "next/image";
import { useUserStore } from "@/store/userStore";

interface PersonalInformationInputs {
  firstName: string;
  lastName: string;
  dob: string;
  phoneNumber: string;
  file: File;
}

export default function PersonalInformation({
  nextStep = () => {},
  prevStep = () => {},
  userId,
}: {
  nextStep?: () => void;
  prevStep?: () => void;
  userId?: string;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [profileImageSrc, setProfileImageSrc] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PersonalInformationInputs>();

  const setProfilePhoto = useUserStore((state) => state.setProfilePhoto);

  const handleUploadedFile = (data: InputEvent) => {
    const target = data.target as HTMLInputElement;
    const file = target?.files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
    console.log(URL.createObjectURL(file));
    setValue("file", file);
    setProfileImageSrc(URL.createObjectURL(file));
  };

  const onSubmit: SubmitHandler<PersonalInformationInputs> = async (data) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);
      const file = data.file;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("dob", data.dob);
      formData.append("phoneNumber", data.phoneNumber);

      const response = await fetch(`/api/users/profile`, {
        method: "POST",
        body: formData,
      });

      console.log("File uploaded successfully", { response });

      // Update the user store with the profile photo
      setProfilePhoto(profileImageSrc);
      nextStep();
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
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
              {profileImageSrc ? (
                <Image
                  src={profileImageSrc}
                  alt={"uploaded image"}
                  width={64}
                  height={64}
                />
              ) : (
                <Typography
                  fontWeight={"700"}
                  fontSize={"64px"}
                  lineHeight={"46px"}
                >
                  S
                </Typography>
              )}
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
                  {...register("file", {
                    onChange: (e) => handleUploadedFile(e),
                  })}
                  type="file"
                  hidden
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
        <Button
          variant="primary"
          type="submit"
          fullWidth
          disabled={isUploading}
        >
          {isUploading ? `Uploading... ${uploadProgress}%` : "Next"}
        </Button>
      </form>
    </Container>
  );
}
