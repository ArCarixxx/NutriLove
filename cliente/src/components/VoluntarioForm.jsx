import { useState, useEffect } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function VoluntarioForm({ onSave, initialData }) {
  const [personas, setPersonas] = useState([]);
  const [formData, setFormData] = useState({
    id_usuario: "",
    disponibilidad: "",
    habilidades: "",
    estado: "Activo",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/usuarios/Voluntario") // Verifica que este endpoint funcione
      .then((res) => res.json())
      .then((data) => {
        console.log("Personas cargadas:", data); // Verifica que obtienes datos
        setPersonas(data);
      })
      .catch((error) => console.error("Error cargando personas:", error));
  }, []);
  

  useEffect(() => {
    if (initialData ) {
      console.log("Cargando datos del voluntario:", initialData); // Verificar en consola
      setFormData({
        id_usuario: initialData.id_usuario || "",
        disponibilidad: initialData.disponibilidad || "",
        habilidades: initialData.habilidades || "",
        estado: initialData.estado || "Activo",
      });
    }
  }, [initialData ]); // Asegura que se actualice cuando cambie
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
      <FormControl fullWidth>
        <InputLabel>Seleccionar Persona</InputLabel>
        <Select name="id_usuario" value={formData.id_usuario} onChange={handleChange} required>
          {personas.map((p) => (
            <MenuItem key={p.id_usuario} value={p.id_usuario}>
              {p.nombre} {p.apellido} - {p.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Disponibilidad"
        name="disponibilidad"
        value={formData.disponibilidad}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Habilidades"
        name="habilidades"
        value={formData.habilidades}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth>
        <InputLabel>Estado</InputLabel>
        <Select name="estado" value={formData.estado} onChange={handleChange}>
          <MenuItem value="Activo">Activo</MenuItem>
          <MenuItem value="Inactivo">Inactivo</MenuItem>
        </Select>
      </FormControl>
      
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Guardar
      </Button>
    </form>
  );
}

export default VoluntarioForm;
