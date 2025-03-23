import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Container } from "@mui/material";
import logo from "../assets/Logo-NutriLove.png";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores anteriores

    try {
      const response = await fetch("http://localhost:5000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Respuesta del servidor:", data); // 👀 Verifica que data.usuario existe
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        navigate("/dashboard");
      } else {
        setError(data.mensaje);
      }
      
    } catch (error) {
      console.error("Error en login:", error);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <Container maxWidth="xs">
    <br></br><br></br><br></br>
    <img src={logo} alt="NutriLove Logo" style={{ height: 300 }} />
      <center>
      <Typography variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>
      </center>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Usuario"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Ingresar
        </Button>
        <Button onClick={handleLogout}
          variant="contained"
          color="secondary"
          fullWidth
          style={{ marginTop: "16px" }}
        >
          Cancelar
        </Button>
      </form>
      {error && <Typography color="error" style={{ marginTop: "16px" }}>{error}</Typography>}
    </Container>
  );
}

export default Login;