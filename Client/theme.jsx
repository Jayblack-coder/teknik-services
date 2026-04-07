import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#0d47a1" },
    secondary: { main: "#00acc1" },
    background: { default: "#f5f7fa" }
  },
  typography: {
    fontFamily: "Roboto, sans-serif"
  }
});

export default theme;