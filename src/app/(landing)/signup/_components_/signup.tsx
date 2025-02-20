"use client";
import { useState } from "react";
import PageHeader from "@/app/components/layout/page-header";
import SocialLoginButton from "@/app/components/buttons/social-login-button";
import { useFormContext, SubmitHandler } from "react-hook-form";
import { SignUpInputs } from "../page";
import {
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Link,
  Button,
  Divider,
  TextField,
  Stack,
} from "@mui/material";

interface SignUpProps {
  nextStep: () => void;
}

export default function SignUp({ nextStep }: SignUpProps) {
  const [error, setError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<SignUpInputs>();

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    const { email } = data;

    try {
      const otpResponse = await fetch("/api/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Send email to generate OTP
      });
      const otpData = await otpResponse.json();

      if (!otpResponse.ok) {
        setError(otpData?.message || "Failed to generate OTP");
        return;
      }

      // OTP request successful, redirect user to OTP verification page
      nextStep();
    } catch (error) {
      setError("An error occurred while requesting OTP");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && <Box>{error}</Box>}
        <PageHeader
          sx={{
            mb: 8,
          }}
          heading="Sign up"
          subtitle="Sign up to manage your services."
        />
        <TextField
          placeholder="Email*"
          type="email"
          fullWidth
          {...register("email", { required: "Email is required" })}
          sx={{
            mb: 2,
          }}
        />
        <TextField
          placeholder="Create a password"
          type="password"
          fullWidth
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        <FormControlLabel
          sx={{
            mt: 3,
            mb: 2,
            fontSize: 16,
          }}
          control={<Checkbox />}
          label={
            <Typography>
              * I agree to the&nbsp;
              <Link
                href="/terms-of-service"
                target="_blank"
                rel="noopener"
                sx={{ fontWeight: 500 }}
              >
                Terms of Service
              </Link>
              &nbsp;and&nbsp;
              <Link
                href="/privacy-policy"
                target="_blank"
                rel="noopener"
                sx={{ fontWeight: 500 }}
              >
                Privacy Policy
              </Link>
            </Typography>
          }
        />
        <Button variant="primary" type="submit" fullWidth>
          Sign up
        </Button>
      </form>

      <Divider>
        <Typography variant="body2" sx={{ px: 1 }}>
          Or
        </Typography>
      </Divider>

      <Stack spacing={2}>
        <SocialLoginButton
          provider="google"
          displayText="Sign up with Google"
        />
        {/* TODO: Replace provider with "facebook" when clientid/clientsecret is ready */}
        <SocialLoginButton
          provider="facebook"
          displayText="Sign up with Facebook"
        />
      </Stack>
    </Box>
  );
}
