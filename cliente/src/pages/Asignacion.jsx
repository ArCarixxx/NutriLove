import React, { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";

function AsignacionTarea() {
  const [asignaciones, setAsignaciones] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/asignacion_tareas")
      .then((response) => response.json())
      .then((data) => setAsignaciones(data));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Asignaciones de Tareas
      </Typography>
      <Button variant="contained" color="primary" style={{ marginBottom: "20px" }}>
        Agregar Asignación
      </Button>
      <div>
        {asignaciones.map((asignacion) => (
          <div key={asignacion.id_asignacion}>
            <Typography>Tarea: {asignacion.id_tarea}</Typography>
            <Typography>Voluntario: {asignacion.id_voluntario}</Typography>
            <Typography>Estado: {asignacion.estado}</Typography>
            {/* Agregar más detalles de asignación según sea necesario */}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default AsignacionTarea;
