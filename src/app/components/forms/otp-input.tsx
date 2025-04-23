import { TextField } from "@mui/material";
import { FieldError } from "react-hook-form";

export const OTPInput = ({
  name,
  error,
  register,
}: {
  name: string;
  error?: FieldError;
  register: any;
}) => (
  <TextField
    {...register(name, { required: "OTP is required" })}
    error={!!error}
    helperText={error?.message}
    type="text"
    slotProps={{
      htmlInput: {
        maxLength: 1,
        sx: {
          textAlign: "center",
          justifyContent: "center",
          padding: 0,
          width: {
            xs: 50,
            md: 48,
          },
          height: {
            xs: 60,
            md: 48,
          },
        },
      },
    }}
  />
);
