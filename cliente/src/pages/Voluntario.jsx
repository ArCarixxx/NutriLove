import React, { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";

function Voluntario() {
  const [voluntarios, setVoluntarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/voluntarios")
      .then((response) => response.json())
      .then((data) => setVoluntarios(data));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Voluntarios
      </Typography>
      <Button variant="contained" color="primary" style={{ marginBottom: "20px" }}>
        Agregar Voluntario
      </Button>
      <div>
        {voluntarios.map((voluntario) => (
          <div key={voluntario.id_voluntario}>
            <Typography>{voluntario.habilidades}</Typography>
            <Typography>{voluntario.estado}</Typography>
            {/* Agregar más detalles de voluntario según sea necesario */}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Voluntario;
