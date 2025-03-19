import React, { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";

function Tarea() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tareas")
      .then((response) => response.json())
      .then((data) => setTareas(data));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tareas
      </Typography>
      <Button variant="contained" color="primary" style={{ marginBottom: "20px" }}>
        Agregar Tarea
      </Button>
      <div>
        {tareas.map((tarea) => (
          <div key={tarea.id_tarea}>
            <Typography>{tarea.titulo}</Typography>
            <Typography>{tarea.estado}</Typography>
            {/* Agregar más detalles de tarea según sea necesario */}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Tarea;
