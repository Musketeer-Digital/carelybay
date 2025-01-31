import { createTheme, ThemeOptions } from "@mui/material/styles";
import { ButtonPropsVariantOverrides } from "@mui/material/Button";
import { OverridableStringUnion } from "@mui/types";

// Extend the ButtonPropsVariantOverrides to include the custom variant
declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    primary: true;
  }
}

const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    primary: {
      main: "#FF6817",
    },
    secondary: {
      main: "#929FD8",
    },
    text: {
      primary: "#171717",
      secondary: "#4D4D4D",
    },
    divider: "#E4E4E4",
    action: {
      selected: "#E0E8EF",
    },
    grey: {
      400: "##D9D9D9",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          borderRadius: 100,
          fontSize: "1rem",
          border: "1px",
          borderStyle: "solid",
          borderColor: "#D9D9D9",
          background: "#FFF",
          minWidth: 200,
          height: 48,

          variants: [
            {
              props: { variant: "primary" },
              style: {
                background: "#FF6817",
                borderColor: "#FF6817",
                color: "#FFF",
                fontWeight: "bold",
                fontSize: 16,
                textTransform: "capitalize",
              },
            },
          ],
        },
      },
    },
  },
  typography: {
    fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
    fontWeightLight: 300,

    h4: {
      lineHeight: 1.35,
    },
  },
};

export const theme = createTheme(themeOptions);
