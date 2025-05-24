"use client";
import { signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { Link, Box, Button, Typography } from "@mui/material";

export default function SessionControls() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const showSession = () => {
    if (status === "authenticated") {
      return (
        <Button
          className="border border-solid border-black rounded"
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push("/");
            });
          }}
        >
          Sign Out
        </Button>
      );
    } else if (status === "loading") {
      return <Typography>Loading...</Typography>;
    } else {
      return (
        <Link component={NextLink} href="/signin">
          Sign In
        </Link>
      );
    }
  };
  return (
    <Box>
      <Typography>TESTING - Session Controls</Typography>
      <Typography>
        User signed in: {session?.user?.email || "Not signed in."}
      </Typography>
      {showSession()}
    </Box>
  );
}
