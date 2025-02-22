"use client";

import { SessionProvider as AuthProvider } from "next-auth/react";
import SessionControls from "@/app/components/session-controls";

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
