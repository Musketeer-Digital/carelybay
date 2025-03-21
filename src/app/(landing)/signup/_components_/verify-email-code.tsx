import PageHeader from "@/app/components/layout/page-header";
import { useState } from "react";
import { useFormContext, SubmitHandler, FieldError } from "react-hook-form";
import { SignUpInputs } from "../page";
import {
  Container,
  Typography,
  Link,
  Button,
  TextField,
  Box,
} from "@mui/material";

interface VerifyEmailCodeProps {
  prevStep: () => void;
  nextStep: () => void;
}

const OTPInput = ({
  name,
  error,
  register,
}: {
  name: string;
  error?: FieldError;
  register: any;
}) => (
  <TextField
    {...register(name, { required: "OTP is required" })}
    error={!!error}
    helperText={error?.message}
    type="text"
    slotProps={{
      htmlInput: {
        maxLength: 1,
        sx: {
          textAlign: "center",
          justifyContent: "center",
          padding: 0,
          width: {
            xs: 50,
            md: 48,
          },
          height: {
            xs: 60,
            md: 48,
          },
        },
      },
    }}
  />
);

export default function VerifyEmailCode({
  prevStep,
  nextStep,
}: VerifyEmailCodeProps) {
  const [error, setError] = useState("");
  const {
    getValues,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormContext<SignUpInputs>();

  const onSubmit: SubmitHandler<SignUpInputs> = async (data: SignUpInputs) => {
    const { email, password } = getValues();
    const otp = `${data.otp}`;

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, otp }),
      });

      if (response.ok) {
        reset();
        return nextStep();
      }
    } catch (error) {
      setError(
        "An error occurred while verifying OTP, account was not created. Try again.",
      );
    }
  };

  return (
    <Container>
      <PageHeader
        heading="Check your email for a code"
        subtitle={`We sent a code to ${getValues("email")} to verify your email`}
        sx={{ mb: 4 }}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <Box>{error}</Box>}
        <Box
          display="flex"
          gap={{ xs: 2, md: 4 }}
          sx={{
            mb: 4,
            justifyContent: {
              xs: "space-between",
              sm: "flex-start",
            },
          }}
        >
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <OTPInput
                key={index}
                name={`otp[${index}]`}
                error={errors.otp}
                register={register}
              />
            ))}
        </Box>
        <Button variant="primary" type="submit" fullWidth sx={{ mb: 4 }}>
          Confirm
        </Button>
      </form>
      <Typography
        sx={{
          textAlign: "left",
          maxWidth: {
            xs: "100%",
            md: "50%",
          },
        }}
      >
        Can't find the email? Check your spam folder, or{" "}
        <Link onClick={prevStep} sx={{ cursor: "pointer" }}>
          re-enter your email and try again
        </Link>
      </Typography>
    </Container>
  );
}
