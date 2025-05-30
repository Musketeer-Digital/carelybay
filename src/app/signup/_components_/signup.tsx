"use client";
import { useState } from "react";
import PageHeader from "@/components/layout/page-header";
import SocialLoginButton from "@/components/buttons/social-login-button";
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
import { useUserStore } from "@/store/userStore";
import { useUserStatusStore } from "@/store/userStatusStore";

import { VerificationStatus } from "@/config/authOptions";
import { useSession } from "next-auth/react";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

interface SignUpProps {
  nextStep?: (step?: number) => void;
}

export default function SignUp({ nextStep = () => {} }: SignUpProps) {
  const router = useRouter();
  // const { data: session } = useSession();
  const [error, setError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<SignUpInputs>();
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  // switch (session?.status) {
  //   case VerificationStatus.NotVerified:
  //     nextStep(2); // Set step to 2 for OTP verification
  //     break;
  //   case VerificationStatus.MissingInfo:
  //     nextStep(3); // Set step to 3 for additional user info
  //     break;
  //   case VerificationStatus.Verified:
  //     nextStep(4); // Set step to 4 for completion
  //     break;
  //   default:
  //     break;
  // }

  const onSubmit: SubmitHandler<SignUpInputs> = async (data: SignUpInputs) => {
    const { email, password } = data;

    try {
      // * Generate OTP
      const otpResponse = await fetch("/api/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Send email to generate OTP
      });
      const otpData = await otpResponse.json();

      if (!otpResponse.ok) {
        setError(otpData?.message || "Failed to generate OTP");
        return;
      }

      // Generate OTP request successful, update the user store with the user information
      setUserInfo({ email });

      // Redirect user to OTP verification page
      router.push("/signup/verify");
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
            mb: 6,
          }}
          heading="Sign up"
          subtitle="Sign up to manage your services."
        />
        <TextField
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
          placeholder="Email*"
          type="email"
          fullWidth
          sx={{
            mb: 2,
          }}
        />
        <TextField
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          placeholder="Create a password"
          type="password"
          fullWidth
        />
        <FormControlLabel
          sx={{
            mt: 3,
            mb: {
              xs: 5,
              md: 2,
            },
            fontSize: 16,
          }}
          control={
            <Checkbox
              color="info"
              sx={{
                mx: 0.5,
              }}
            />
          }
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
        <Button
          variant="primary"
          type="submit"
          fullWidth
          sx={{ textTransform: "none" }}
        >
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
