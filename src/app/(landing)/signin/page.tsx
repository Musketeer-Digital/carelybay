"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import PageHeader from "@/app/components/layout/page-header";
import NextLink from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Container,
  TextField,
  Button,
  Divider,
  Typography,
  Link,
  Box,
  Stack,
} from "@mui/material";
import SocialLoginButton from "@/app/components/buttons/social-login-button";

interface SignInInputs {
  email: string;
  password: string;
}

export default function SignIn() {
  const [error, setError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputs>();

  const onSubmit: SubmitHandler<SignInInputs> = async (data: SignInInputs) => {
    const { email, password } = data;

    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error as string);
    }

    if (res?.ok) {
      return router.push("/dashboard");
    }
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            backgroundColor: "rgba(243, 243, 243, 1)",
            borderRadius: "50%",
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontSize: "24px" }}>👋</Typography>
        </Box>
        <Typography variant="body1">Welcome back to Carelybay</Typography>
      </Box>
      <PageHeader
        heading="Sign In"
        subtitle="Sign in to manage your services."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: "1em" }}
      >
        {error && <Box>{error}</Box>}
        <TextField
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
          placeholder="Email*"
          type="email"
          fullWidth
        />
        <TextField
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message}
          placeholder="Password"
          type="password"
          fullWidth
        />
        <Link component={NextLink} href="/forgotpasword">
          Forgot Password
        </Link>
        <Button variant="primary" type="submit" fullWidth>
          Sign in
        </Button>
      </form>
      <Divider>Or</Divider>
      <Stack spacing={2}>
        <SocialLoginButton
          provider="google"
          displayText="Sign in with Google"
        />
        {/* TODO: Replace provider with "facebook" when clientid/clientsecret is ready */}
        <SocialLoginButton
          provider="facebook"
          displayText="Sign in with Facebook"
        />
      </Stack>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", marginBottom: { xs: 2, md: 5 } }}
      >
        Don't have a Carelybay account?&nbsp;
        <Link component={NextLink} href="/signup">
          Sign up
        </Link>
      </Typography>
    </Container>
  );
}
