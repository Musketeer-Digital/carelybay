import PageHeader from "@/app/components/layout/page-header";
import { Container, Input, Typography, Link, Button } from "@mui/material";

export default function VerifyEmailCode() {
  return (
    <Container>
      <PageHeader
        heading="Check your email for a code"
        subtitle="We sent a code to <email> to verify your email"
      />
      <Input placeholder="Email*" type="email" fullWidth />
      <Input placeholder="Create a password" type="password" fullWidth />
      <Button variant="primary" fullWidth>
        Confirm
      </Button>
      <Typography style={{ textAlign: "center" }}>
        Can't find the email? Check your spam folder or{" "}
        <Link href="/signin">re-enter your email and try again</Link>
      </Typography>
    </Container>
  );
}
