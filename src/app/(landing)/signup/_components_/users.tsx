"use client";

import { fetcher } from "@/app/api/fetcher";
import { Box, Typography } from "@mui/material";
import useSWR from "swr";

export const UsersStep = () => {
  const { data: users = [], isLoading } = useSWR("/api/users", fetcher);
  return (
    <Box>
      {users.length} Users
      {users.map((user: { id: string }, index: number) => (
        <Typography key={index}>User: {user.id}</Typography>
      ))}
    </Box>
  );
};
