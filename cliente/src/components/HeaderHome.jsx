import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo-NutriLove.png";
import letras from "../assets/LogoBlanco.png";

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
        <img src={logo} alt="NutriLove Logo" style={{ height: 50, marginRight: 30 }} />
        <img src={letras} alt="NutriLove Letas" style={{ height: 70, marginRight: 30 }} />
        
        </Box>

        {/* Botón Cerrar Sesión */}
        <Button onClick={handleLogout}
        variant="contained"
        color="primary"
        sx={{ backgroundColor: "#E29038", '&:hover': { backgroundColor: "#C7742E" } }}>
          Iniciar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
