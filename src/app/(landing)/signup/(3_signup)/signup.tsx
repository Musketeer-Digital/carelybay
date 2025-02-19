"use client";
import { useRef, useState } from "react";
import PageHeader from "@/app/components/layout/page-header";
import SocialLoginButton from "@/app/components/buttons/social-login-button";
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
  setEmail: (email: string) => void;
}

export default function SignUp({ nextStep, setEmail }: SignUpProps) {
  const [error, setError] = useState<string>();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const otpResponse = await fetch("/api/otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Send email to generate OTP
      });
      ref.current?.reset();
      const otpData = await otpResponse.json();

      if (!otpResponse.ok) {
        setError(otpData?.message || "Failed to generate OTP");
        return;
      }

      // OTP request successful, redirect user to OTP verification page
      setEmail(email);
      nextStep();
    } catch (error) {
      setError("An error occurred while requesting OTP");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <form ref={ref} action={handleSubmit}>
        {error && <Box>{error}</Box>}
        <PageHeader
          sx={{
            mb: 8,
          }}
          heading="Sign up"
          subtitle="Sign up to manage your services."
        />
        <TextField
          required
          placeholder="Email*"
          type="email"
          name="email"
          fullWidth
          sx={{
            mb: 2,
          }}
        />
        <TextField
          required
          placeholder="Create a password"
          type="password"
          name="password"
          fullWidth
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
        <SocialLoginButton provider="google" displayName="Google" />
        {/* TODO: Replace provider with "facebook" when clientid/clientsecret is ready */}
        <SocialLoginButton provider="facebook" displayName="Facebook" />
      </Stack>
    </Box>
  );
}
