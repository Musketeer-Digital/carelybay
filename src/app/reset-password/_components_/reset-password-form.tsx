import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useEffect } from "react";

interface ResetPasswordInputs {
  email: string;
  newPassword: string;
  token: string;
}

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResetPasswordInputs>();
  const router = useRouter();
  const { token, email } = router.query;

  useEffect(() => {
    if (token) setValue("token", token as string);
    if (email) setValue("email", email as string);
  }, [token, email, setValue]);

  const onSubmit: SubmitHandler<ResetPasswordInputs> = async (data) => {
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        // Handle successful password reset
        console.log("Password reset successfully");
      } else {
        // Handle error
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Reset Password
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
          placeholder="Email"
          type="email"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          {...register("newPassword", { required: "New password is required" })}
          error={!!errors.newPassword}
          helperText={errors.newPassword?.message}
          placeholder="New Password"
          type="password"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <input {...register("token")} type="hidden" />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Reset Password
        </Button>
      </form>
    </Container>
  );
}
