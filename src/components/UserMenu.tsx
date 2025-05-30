import { MenuItem, Typography } from "@mui/material";
import type { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function UserMenu({
  onClose,
  session,
}: {
  onClose: () => void;
  session: Session | null;
}) {
  const router = useRouter();

  const items = [
    {
      label: "Profile",
      onClick: () => router.push("/profile"),
    },
    {
      label: session ? "Logout" : "Login",
      onClick: () => {
        if (session) {
          signOut();
        } else {
          router.push("/signin");
        }
      },
    },
  ];

  return (
    <>
      {items.map((item) => (
        <MenuItem
          key={item.label}
          onClick={() => {
            onClose();
            item.onClick();
          }}
        >
          <Typography>{item.label}</Typography>
        </MenuItem>
      ))}
    </>
  );
}
