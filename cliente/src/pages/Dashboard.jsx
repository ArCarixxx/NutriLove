import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Button, Container } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar"; 

function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) {
      setUsuario(JSON.parse(user));
    } else {
      navigate("/login"); // Redirigir si no está autenticado
    }
  }, [navigate]);

  return (
    
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Bienvenido, {usuario?.username}
      </Typography>
      <Typography variant="h6" paragraph>
        Rol: {usuario?.rol}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          localStorage.removeItem("usuario");
          navigate("/login");
        }}
        fullWidth
      >
        Cerrar Sesión
      </Button>
    </Container>
  );
}

export default Dashboard;
