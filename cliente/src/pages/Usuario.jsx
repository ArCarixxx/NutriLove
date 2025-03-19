import React, { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";

function Usuario() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/usuarios")
      .then((response) => response.json())
      .then((data) => setUsuarios(data));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Usuarios
      </Typography>
      <Button variant="contained" color="primary" style={{ marginBottom: "20px" }}>
        Agregar Usuario
      </Button>
      <div>
        {usuarios.map((usuario) => (
          <div key={usuario.id_usuario}>
            <Typography>{usuario.username}</Typography>
            <Typography>{usuario.rol}</Typography>
            {/* Agregar más detalles de usuario según sea necesario */}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Usuario;
