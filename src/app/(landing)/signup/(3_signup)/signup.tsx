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

export default function SignUp() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <PageHeader
        heading="Sign up"
        subtitle="Sign up to manage your services."
      />
      <TextField required placeholder="Email*" type="email" fullWidth />
      <TextField
        required
        placeholder="Create a password"
        type="password"
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
      <Button variant="primary" fullWidth>
        Sign up
      </Button>
      <Divider>Or</Divider>
      <Button fullWidth>Sign up with Google</Button>
      <Button fullWidth>Sign up with Facebook</Button>
    </Box>
  );
}
