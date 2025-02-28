"use client";

import { SessionProvider as AuthProvider } from "next-auth/react";

type Props = {
  children?: React.ReactNode;
};

export const SessionProvider = ({ children }: Props) => {
  return (
    <AuthProvider>
      {children}
      {/* TODO: Remove after debugging */}
      {/* <SessionControls /> */}
    </AuthProvider>
  );
};
