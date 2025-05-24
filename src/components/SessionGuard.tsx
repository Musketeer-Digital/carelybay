import { auth } from "@/lib/auth"; // adjust path if needed
import { redirect } from "next/navigation";
import React from "react";

type SessionGuardProps = {
  redirectIfAuthenticated?: boolean;
  redirectTo?: string;
  children: React.ReactNode;
};

// The SessionGuard can redirect clients that already detect a session 
// to the profile page.

export default async function SessionGuard({
  redirectIfAuthenticated = true,
  redirectTo = "/profile",
  children,
}: SessionGuardProps) {
  const session = await auth();

  if (redirectIfAuthenticated && session?.user) {
    redirect(redirectTo);
  }

  return <>{children}</>;
}