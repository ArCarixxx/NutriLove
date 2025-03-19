import React, { useEffect, useState } from "react";
import { Button, Container, Typography } from "@mui/material";

function Persona() {
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    // Aquí iría la lógica para obtener los datos de la base de datos
    // Asegúrate de que tu backend tenga una ruta para obtener las personas
    fetch("http://localhost:5000/api/personas") 
      .then((response) => response.json())
      .then((data) => setPersonas(data));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Personas
      </Typography>
      <Button variant="contained" color="primary" style={{ marginBottom: "20px" }}>
        Agregar Persona
      </Button>
      <div>
        {personas.map((persona) => (
          <div key={persona.id_persona}>
            <Typography>{persona.nombre} {persona.apellido}</Typography>
            <Typography>{persona.correo}</Typography>
            {/* Agregar más detalles de la persona según sea necesario */}
          </div>
        ))}
      </div>
    </Container>
  );
}

export default Persona;
