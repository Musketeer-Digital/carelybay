import { createTheme, ThemeOptions } from "@mui/material/styles";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    primary: {
      main: "#FF6817",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#929FD8",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#171717",
      secondary: "#4D4D4D",
    },
    divider: "#E4E4E4",
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
