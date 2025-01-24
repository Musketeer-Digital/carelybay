import PageHeader from "@/app/components/layout/page-header";
import { Container, Input, FormGroup, FormControlLabel, Checkbox, Typography, Link, Button, Divider } from "@mui/material";
import { UsersStep } from "./(2_2_users)/users";

export default function SignUp() {
  return (
    <Container>
      <PageHeader
        heading="Sign up"
        subtitle="Enter your details to sign-up for a new Carelybay account!"
      />
      <Input placeholder="Email*" type="email" fullWidth />
      <Input placeholder="Create a password" type="password" fullWidth />
      <FormControlLabel 
        control={<Checkbox />} 
        label={
          <Typography>* I agree to the {" "}
            <Link href="/terms-of-service" target="_blank" rel="noopener">Terms of Service</Link>
            {" "} and {" "}
            <Link href="/privacy-policy" target="_blank" rel="noopener"> Privacy Policy</Link>
          </Typography>
        } 
      />
      <Button fullWidth>Sign up</Button>
      <Divider>Or</Divider>
      <Button fullWidth>Sign up with Google</Button>
      <Button fullWidth>Sign up with Facebook</Button>
      <Typography style={{ textAlign: "center"}}>Already using Carelybay? <Link href="/signin">Sign in</Link></Typography>
      {/* TODO: Remove after testing */}
      <UsersStep />
    </Container>
  );
}
