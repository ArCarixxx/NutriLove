import React, { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";

function RegistroActividad() {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/registro_actividades")
      .then((response) => response.json())
      .then((data) => setRegistros(data));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Registros de Actividades
      </Typography>
      <Button variant="contained" color="primary" style={{ marginBottom: "20px" }}>
        Agregar Registro
      </Button>
      <div>
        {registros.map((registro) => (
          <div key={registro.id_registro}>
            <Typography>Asignación ID: {registro.id_asignacion}</Typography>
            <Typography>Descripción: {registro.descripcion}</Typography>
            <Typography>Fecha: {registro.fecha}</Typography>
            {/* Agregar más detalles de registro según sea necesario */}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default RegistroActividad;
