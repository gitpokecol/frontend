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
    fontSize: 30,
    fontFamily: [
      "pokemon-ds",
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
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          textShadow: "1px 1px #c2c2c2",
          lineHeight: 1,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "1.5rem",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: "1px dashed #e0e0e0",
        },
      },
    },
  },
});

export default theme;
