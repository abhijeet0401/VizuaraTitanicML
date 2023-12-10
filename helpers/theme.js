import { createTheme } from "@mui/material/styles";
export const lightTheme = createTheme({
  palette: {
    primary: { main: "#3C3C3C" },
    secondary: { main: "#A0A0A0B2" },
    background: { main: "#f2f0f0" },
    color: {
      main: "linear-gradient(112.03deg, #FF9900 -56.39%, #FF01FF 190.51%)",
    },
    mode: "light",
  },
  typography: {
    fontSize: 14,
    fontWeightBold: true,
    fontFamily: "Open Sans",
    color: "black",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        // @font-face {
        //   font-family: 'Poppins';
        //   font-style: normal;
        //   font-display: swap;
        //   font-weight: 400;
        //   src: url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
        //   unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        // }
      `,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: { main: "#E4E4E4" },
    secondary: { main: "#A0A0A0B2" },
    background: { main: "#151515" },
    color: {
      main: "linear-gradient(112.03deg, #FF9900 -56.39%, #FF01FF 190.51%)",
    },
    mode: "dark",
  },
  typography: {
    fontSize: 14,
    fontWeightBold: true,
    fontFamily: "Open Sans",
    color: "white",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        // @font-face {
        //   font-family: 'Poppins';
        //   font-style: normal;
        //   font-display: swap;
        //   font-weight: 400;
        //   src: url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
        //   unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        // }
      `,
    },
  },
});

export const blueTheme = createTheme({
  palette: {
    primary: { main: "#E4E4E4" },
    secondary: { main: "#A0A0A0B2" },
    background: { main: "#00326C" },
    color: {
      main: "linear-gradient(112.03deg, #FF9900 -56.39%, #FF01FF 190.51%)",
    },
    mode: "dark",
  },
  typography: {
    fontSize: 14,
    fontWeightBold: true,
    fontFamily: "Open Sans",
    color: "white",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        // @font-face {
        //   font-family: 'Poppins';
        //   font-style: normal;
        //   font-display: swap;
        //   font-weight: 400;
        //   src: url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
        //   unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        // }
      `,
    },
  },
});