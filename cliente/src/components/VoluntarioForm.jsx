import { useState, useEffect } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function VoluntarioForm({ onSave, voluntario }) {
  const [personas, setPersonas] = useState([]);
  const [formData, setFormData] = useState({
    id_usuario: "",
    disponibilidad: "",
    habilidades: "",
    estado: "activo",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/usuarios/Voluntario") // Endpoint que hace el JOIN
      .then((res) => res.json())
      .then((data) => setPersonas(data))
      .catch((error) => console.error("Error cargando personas:", error));
  }, []);

  useEffect(() => {
    if (voluntario) {
      setFormData({
        id_usuario: voluntario.id_usuario || "",
        disponibilidad: voluntario.disponibilidad || "",
        habilidades: voluntario.habilidades || "",
        estado: voluntario.estado || "activo",
      });
    }
  }, [voluntario]);

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
              {p.nombre} {p.apellido}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField label="Disponibilidad" name="disponibilidad" value={formData.disponibilidad} onChange={handleChange} required fullWidth />
      <TextField label="Habilidades" name="habilidades" value={formData.habilidades} onChange={handleChange} required fullWidth />
      <FormControl fullWidth>
        <InputLabel>Estado</InputLabel>
        <Select name="estado" value={formData.estado} onChange={handleChange}>
          <MenuItem value="activo">Activo</MenuItem>
          <MenuItem value="inactivo">Inactivo</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Guardar
      </Button>
    </form>
  );
}

export default VoluntarioForm;
