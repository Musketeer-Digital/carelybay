"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/actions/register";
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

export default function SignUp() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    const r = await register({
      email: formData.get("email"),
      password: formData.get("password"),
      name: formData.get("name"),
    });
    ref.current?.reset();
    if (r?.error) {
      setError(r.error);
      return;
    } else {
      return router.push("/signin");
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
