"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Container, TextField, Button, Box } from "@mui/material";
import PageHeader from "@/app/components/layout/page-header";

interface ForgotPasswordInputs {
  email: string;
}

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInputs>();

  const onSubmit: SubmitHandler<ForgotPasswordInputs> = async (data) => {
    const { email } = data;

    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const result = await res.json();

    if (result.success) {
      setSuccess("Password reset link sent successfully. Please check your email.");
    } else {
      setError(result.message || "Something went wrong");
    }
  };

  return (
    <Container>
      <PageHeader heading="Forgot Password" subtitle="" />
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
        <Button variant="primary" type="submit" fullWidth>
          Send Reset Link
        </Button>
      </form>
    </Container>
  );
}
