"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/app/components/layout/page-header";
import { useFormContext, SubmitHandler } from "react-hook-form";
import { VerificationInputs } from "./page";
import { useUserStore } from "@/store/userStore";
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  Container,
  Link,
} from "@mui/material";
import { OTPInput } from "@/app/components/forms/otp-input";
import { signIn, useSession } from "next-auth/react";

export default function VerifyEmailCode() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState(false);
  const userInfo = useUserStore((state) => state.userInfo);
  const [OTPFocusIndex, setOTPFocusIndex] = useState<number>(0)

  const { data: session } = useSession();

  const {
    handleSubmit,
    watch,
    formState: { errors },
    control,
    register,
    getValues,
  } = useFormContext<VerificationInputs>();

  const email = userInfo?.email;

  if (!email) {
    console.warn("Verify Page - email not found, redirecting to signup");
    router.replace("/signup");
  }

  const onSubmit: SubmitHandler<VerificationInputs> = async (
    data: VerificationInputs,
  ) => {
    const otp = `${data.otp.join("")}`;

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        await signIn("credentials", {
          email,
          otp,
          redirect: true,
          callbackUrl: "/signup/personal-information",
        });
      }
    } catch (error) {
      setError(
        "An error occurred while verifying OTP, account was not created. Try again.",
      );
    }
  };

  const OPTInputArray = Array(6).fill(0).map((_, index) => (
    <OTPInput
      key={index}
      name={`otp[${index}]`}
      error={errors.otp?.[index]}
      register={register}
      focus={OTPFocusIndex}
    />)
  )

  // if 

  return (
    <Container>
      <PageHeader
        heading="Check your email for a code"
        subtitle={`We sent a code to ${email} to verify your email`}
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
          {OPTInputArray}
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
        <Link
          onClick={() => {
            router.push("/signup");
          }}
          sx={{ cursor: "pointer" }}
        >
          re-enter your email and try again
        </Link>
      </Typography>
    </Container>
  );
}
