import { createTheme, ThemeOptions } from "@mui/material/styles";

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
      default: "#FFF",
      paper: "#FAFAF9",
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
      active: "#FF6817",
      selected: "#E0E8EF",
    },
    grey: {
      400: "#D9D9D9",
    },
  },
  components: {
    // * COMPONENT -- Button
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          fontSize: "1rem",
          height: 48,
        },
      },
      variants: [
        {
          props: { variant: "primary" },
          style: {
            background: "#FF6817",
            borderColor: "#FF6817",
            color: "#FFF",
            fontSize: 16,
            textTransform: "capitalize",
            transition: "background 0.2s ease-in-out, border 0.2s ease-in-out",
            "&:hover": {
              background: "#E55C15",
              borderColor: "#E55C15",
            },
            "&.Mui-disabled": {
              background: "#EFEFF0",
              color: "#5F636880",
              opacity: 0.6,
            },
          },
        },
        {
          props: { variant: "contained" },
          style: {
            background: "#F7F7F7",
            color: "#6E6E6E",
            fontWeight: "600",
            textTransform: "capitalize",
            boxShadow: "none",
            transition: "background 0.2s ease-in-out, border 0.2s ease-in-out",
            "&:hover": {
              background: "#ECECEC",
              boxShadow: "none",
            },
            "&.Mui-disabled": {
              background: "#F0F0F0",
              color: "#BDBDBD",
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            border: "1px solid #DADADA",
            color: "#6E6E6E",
            fontWeight: "600",
            textTransform: "capitalize",
            background: "transparent",
            boxShadow: "none",
            transition: "background 0.2s ease-in-out, border 0.2s ease-in-out",
            "&:hover": {
              background: "#F7F7F7",
              boxShadow: "none",
            },
            "&.Mui-disabled": {
              borderColor: "#E0E0E0",
              color: "#BDBDBD",
            },
          },
        },
      ],
    },
    // * COMPONENT -- Checkbox
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#D9D9D9",
          transition: "0.167s all ease-in-out",
        },
      },
    },

    // * COMPONENT -- Links
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#453E3B",
          fontWeight: "600",
          textDecoration: "underline",
        },
      },
    },
    // * COMPONENT -- OutlinedInput
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderColor: "FF6817",
          borderRadius: "10px",
        },
      },
    },
    // * COMPONENT -- Progress Bar
    MuiMobileStepper: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: "dots" },
              style: {
                display: "flex",
                justifyContent: "center",

                "& .MuiMobileStepper-dot": {
                  maxWidth: 128,
                  minWidth: 128,
                  flex: 1,
                  height: 8,
                  backgroundColor: "#E4E4E4",
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                },
                "& .MuiMobileStepper-dotActive": {
                  backgroundColor: "#FF6817",
                },
              },
            },
          ],
        },
      },
    },
    // * COMPONENT -- TextField
    MuiTextField: {
      styleOverrides: {
        root: {
          border: "1px",
          borderStyle: "solid",
          borderRadius: "10px",
          borderColor: "#CCCCCC",
        },
      },
    },
    // * COMPONENT -- MuiPaper
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid #DDD",
          borderRadius: 16,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid #E6E6E6",
          boxShadow: "none",
          borderRadius: 16,
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
    h5: {
      fontWeight: 400,
      fontSize: 18,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: 14,
      color: "#453E3B",
    },
  },
};

export const theme = createTheme(themeOptions);
