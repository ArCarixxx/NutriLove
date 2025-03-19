// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#E29038" },  // Naranja
    secondary: { main: "#7BA449" }, // Verde
    text: { primary: "#333", secondary: "#7F8C8D" }, // Gris oscuro
    background: { default: "#F8F8F8", paper: "#FFFFFF" }
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
  }
});

export default theme;
