"use client";
import { useRef, useState } from "react";
import PageHeader from "@/app/components/layout/page-header";
import {
  Box,
  FormControlLabel,
  Checkbox,
  Typography,
  Link,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import { signIn } from "next-auth/react";

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
        {error && <div className="">{error}</div>}
        <PageHeader
          heading="Sign up"
          subtitle="Sign up to manage your services."
        />
        <TextField
          required
          placeholder="Email*"
          type="email"
          name="email"
          fullWidth
        />
        <TextField
          required
          placeholder="Create a password"
          type="password"
          name="password"
          fullWidth
        />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography>
              * I agree to the{" "}
              <Link href="/terms-of-service" target="_blank" rel="noopener">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" target="_blank" rel="noopener">
                {" "}
                Privacy Policy
              </Link>
            </Typography>
          }
        />
        <Button variant="primary" type="submit" fullWidth>
          Sign up
        </Button>
      </form>
      <Divider>Or</Divider>
      <Button
        fullWidth
        onClick={() =>
          signIn("google", {
            callbackUrl: "/dashboard",
          })
        }
      >
        Sign up with Google
      </Button>
      {/* TODO: Replace with "facebook" when clientid/clientsecret is ready */}
      <Button
        fullWidth
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        Sign up with Facebook
      </Button>
    </Box>
  );
}
