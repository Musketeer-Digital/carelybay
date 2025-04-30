"use client";

import { SessionProvider as AuthProvider, useSession } from "next-auth/react";
import Header from "../components/header";

type Props = {
  children?: React.ReactNode;
};

const AuthenticatedLayout = ({ children }: Props) => {
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user?.email;

  return (
    <>
      {isAuthenticated && <Header />}
      {children}
    </>
  );
};

export const SessionProvider = ({ children }: Props) => {
  return (
    <AuthProvider>
      <AuthenticatedLayout>{children}</AuthenticatedLayout>
    </AuthProvider>
  );
};
