import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Logo y Nombre de la Empresa */}
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <img
            src="https://via.placeholder.com/50" // Reemplaza con tu logo real
            alt="Logo NutriLove"
            style={{ marginRight: 8 }}
          />
          <Typography variant="h6" component="div">
            NutriLove
          </Typography>
        </Box>

        {/* Botón Cerrar Sesión */}
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#E29038", '&:hover': { backgroundColor: "#C7742E" } }}
        >
          Cerrar Sesión
        </Button>

      </Toolbar>
    </AppBar>
  );
}

export default Header;
