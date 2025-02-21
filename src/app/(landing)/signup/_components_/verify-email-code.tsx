import PageHeader from "@/app/components/layout/page-header";
import { useState } from "react";
import { useFormContext, SubmitHandler } from "react-hook-form";
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

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    const { email, password } = getValues();
    const { otp } = data;

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
        subtitle={
          <Typography>
            We sent a code to {getValues("email")} to verify your email
          </Typography>
        }
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <Box>{error}</Box>}
        <TextField
          {...register("otp", { required: "OTP is required" })}
          error={!!errors.otp}
          helperText={errors.otp?.message}
          placeholder="123456"
          type="text"
          margin="normal"
          fullWidth
        />
        <Button variant="primary" type="submit" fullWidth>
          Confirm
        </Button>
      </form>
      <Typography style={{ textAlign: "center" }}>
        Can't find the email? Check your spam folder or{" "}
        <Link onClick={prevStep} sx={{ cursor: "pointer" }}>
          re-enter your email and try again
        </Link>
      </Typography>
    </Container>
  );
}
