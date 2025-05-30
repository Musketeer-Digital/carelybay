import SessionGuard from "@/components/SessionGuard";
import SignInClient from "./SignInClient"; // Move your current SignIn component to a separate file

export default async function SignInPage() {
  return (
    <SessionGuard>
      <SignInClient />
    </SessionGuard>
  );
}
