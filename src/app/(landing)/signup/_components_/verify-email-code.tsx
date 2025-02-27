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

const OTPInput = ({ name, error, register }) => (
  <TextField
    {...register(name, { required: "OTP is required" })}
    error={!!error}
    helperText={error?.message}
    type="text"
    inputProps={{ maxLength: 1 }}
    margin="normal"
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
    const otp = `${data.otp1}${data.otp2}${data.otp3}${data.otp4}${data.otp5}${data.otp6}`;

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
        <Box display="flex" justifyContent="space-between">
          {["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"].map((name) => (
            <OTPInput
              key={name}
              name={name}
              error={errors[name]}
              register={register}
            />
          ))}
        </Box>
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
