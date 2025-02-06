import PageHeader from "@/app/components/layout/page-header";
import {
  Container,
  TextField,
  Button,
  Divider,
  Typography,
  Link,
  Box,
} from "@mui/material";
import NextLink from "next/link";

export default function SignIn() {
  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
        <Box
          sx={{
            width: "48px",
            height: "48px",
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
      <TextField required placeholder="Email*" type="email" fullWidth />
      <TextField required placeholder="Password" type="password" fullWidth />
      <Link component={NextLink} href="/forgotpasword">
        Forgot Password
      </Link>
      <Button variant="primary" fullWidth>
        Sign in
      </Button>
      <Divider>Or</Divider>
      <Button fullWidth>Sign in with Google</Button>
      <Button fullWidth>Sign in with Facebook</Button>
      <Typography
        variant="h5"
        sx={{ textAlign: "center", marginBottom: { xs: 2, md: 5 } }}
      >
        Don't have a Carelybay account?&nbsp;
        <Link component={NextLink} href="/signin">
          Sign up
        </Link>
      </Typography>
    </Container>
  );
}
