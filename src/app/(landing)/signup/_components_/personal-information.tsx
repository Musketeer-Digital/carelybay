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

interface PersonalInformationInputs {
  firstName: string;
  lastName: string;
  dob: string;
  phoneNumber: string;
  file: File;
}

export default function PersonalInformation() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PersonalInformationInputs>();

  const streamFileToGCP = async (
    url: string,
    file: File,
    headers: Record<string, string>,
  ): Promise<void> => {
    const chunkSize = 1024 * 1024; // 1MB chunks
    const fileSize = file.size;
    let uploadedBytes = 0;

    for (let start = 0; start < fileSize; start += chunkSize) {
      const chunk = file.slice(start, start + chunkSize);
      try {
        const response = await fetch(url, {
          method: "PUT",
          body: chunk,
          headers: {
            ...headers,
            "Content-Range": `bytes ${start}-${start + chunk.size - 1}/${fileSize}`,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Upload failed at byte ${start}: ${response.status} ${response.statusText} - ${errorText}`,
          );
        }

        uploadedBytes += chunk.size;
        const progress = Math.round((uploadedBytes / fileSize) * 100);
        setUploadProgress(progress);
      } catch (error) {
        console.error("Error uploading chunk:", error);
      }
    }
  };

  const handleUploadedFile = (data: InputEvent) => {
    const target = data.target as HTMLInputElement;
    const file = target?.files?.[0];
    if (!file) {
      console.error("No file selected");
      return;
    }
    setValue("file", file);
  };

  const onSubmit: SubmitHandler<PersonalInformationInputs> = async (data) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);
      const file = data.file;

      // Get signed URL with headers
      const response = await fetch("/api/signed-url", {
        method: "POST",
        body: JSON.stringify({
          fileName: file.name,
        }),
      });

      const res = await response.json();

      const { uploadUrl: url, headers } = res;

      await streamFileToGCP(url, file, headers);

      // await streamFileToGCP(url, file, headers);
      // console.log("File uploaded successfully");

      // Continue with rest of form submission
      // ...
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
