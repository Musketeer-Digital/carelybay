import type { Preview } from "@storybook/react";

import { ThemeProvider, CssBaseline } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';

/* TODO: update import for your custom Material UI themes */
import { lightTheme, darkTheme } from '../path/to/themes';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

// .storybook/preview.js

import { CssBaseline, ThemeProvider } from "@mui/material";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { theme } from "../src/app/theme";

/* snipped for brevity */

export const decorators = [withThemeFromJSXProvider({
  themes: {
    light: theme,
    dark: theme,
  },
  defaultTheme: "light",
  Provider: ThemeProvider,
  GlobalStyles: CssBaseline,
}), withThemeFromJSXProvider({
  GlobalStyles: CssBaseline,
  Provider: ThemeProvider,
  themes: {
    // Provide your custom themes here
    light: lightTheme,
    dark: darkTheme,
  },
  defaultTheme: 'light',
})];
