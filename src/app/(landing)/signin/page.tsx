"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import PageHeader from "@/app/components/layout/page-header";
import NextLink from "next/link";
import {
  Container,
  TextField,
  Button,
  Divider,
  Typography,
  Link,
  Box,
} from "@mui/material";

export default function SignIn() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
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
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1em" }}
      >
        {error && <Box>{error}</Box>}
        <TextField
          required
          placeholder="Email*"
          type="email"
          name="email"
          fullWidth
        />
        <TextField
          required
          placeholder="Password"
          type="password"
          name="password"
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
      <Button
        fullWidth
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        Sign in with Google
      </Button>
      {/* TODO: Replace with "facebook" when clientid/clientsecret is ready */}
      <Button
        fullWidth
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        Sign in with Facebook
      </Button>
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
