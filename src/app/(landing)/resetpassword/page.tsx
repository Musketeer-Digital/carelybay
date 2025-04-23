"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/app/components/layout/page-header";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";

interface ResetPasswordInputs {
  password: string;
  token: string;
  email: string;
}

export default function ResetPassword() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInputs>();

  const onSubmit: SubmitHandler<ResetPasswordInputs> = async (data) => {
    const { password, token, email } = data;

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, token, email }),
    });

    const result = await res.json();

    if (result.success) {
      setSuccess("Password reset successfully. Redirecting to login page...");
      setTimeout(() => {
        router.push("/signin");
      }, 3000);
    } else {
      setError(result.message || "Something went wrong");
    }
  };

  return (
    <Container>
      <PageHeader heading="Reset Password" subtitle="" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1em",
        }}
      >
        {error && <Box>{error}</Box>}
        {success && <Box>{success}</Box>}
        <TextField
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
          placeholder="Email*"
          type="email"
          fullWidth
        />
        <TextField
          {...register("token", { required: "Token is required" })}
          error={!!errors.token}
          helperText={errors.token?.message}
          placeholder="Verification Token*"
          type="text"
          fullWidth
        />
        <TextField
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
          placeholder="New Password*"
          type="password"
          fullWidth
        />
        <Button variant="primary" type="submit" fullWidth>
          Reset Password
        </Button>
      </form>
    </Container>
  );
}
