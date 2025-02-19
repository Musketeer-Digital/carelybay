import PageHeader from "@/app/components/layout/page-header";
import { useRef, useState } from "react";
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
  email: string;
}
export default function VerifyEmailCode({
  prevStep,
  nextStep,
  email,
}: VerifyEmailCodeProps) {
  const [error, setError] = useState("");
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const otp = formData.get("otp") as string;

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      ref.current?.reset();
      if (response.ok) {
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
            We sent a code to {email} to verify your email
          </Typography>
        }
      />
      <form ref={ref} action={handleSubmit}>
        {error && <Box>{error}</Box>}
        <TextField
          required
          placeholder="123456"
          type="string"
          name="otp"
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
