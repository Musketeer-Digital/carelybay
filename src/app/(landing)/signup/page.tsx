import PageHeader from "@/app/components/layout/page-header";
import { Container } from "@mui/material";
import { UsersStep } from "./(2_2_users)/users";

export default function SignUp() {
  return (
    <Container>
      <PageHeader
        heading="Sign up"
        subtitle="Enter your details to sign-up for a new Carelybay account!"
      />
      <UsersStep />
    </Container>
  );
}
