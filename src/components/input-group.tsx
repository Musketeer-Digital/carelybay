import { ReactNode } from "react";
import { Stack, Typography } from "@mui/material";

interface InputGroupProps {
  children: ReactNode;
  heading?: string;
}

export default function InputGroup({
  children,
  heading = "Title",
}: InputGroupProps) {
  return (
    <Stack>
      <Typography variant="h5" fontWeight={600} color={"#222"}>
        {heading}
      </Typography>
      {children}
    </Stack>
  );
}
