import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFFFFF",
      main: "#56AEFF",
      dark: "#FFFFFF",
      contrastText: "#000000",
    },
    secondary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: [
      "PublicPixel",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export default theme;
