import { useState, useEffect } from "react";
import { TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel, DialogActions, DialogTitle } from "@mui/material";

const RegistroActividadForm = ({ onSave, initialData = {} }) => {
  const [formData, setFormData] = useState({
    id_asignacion: "",
    descripcion: "",
    fecha: "",
  });

  const [asignaciones, setAsignaciones] = useState([]);

  useEffect(() => {
    // Obtener lista de asignaciones desde el backend
    fetch("http://localhost:5000/api/asignaciones")
      .then((res) => res.json())
      .then((data) => setAsignaciones(data));
  }, []);

  useEffect(() => {
    if (initialData && initialData.id_registro) {
      setFormData({
        id_asignacion: initialData.id_asignacion || "",
        descripcion: initialData.descripcion || "",
        fecha: initialData.fecha || "",
      });
    }
  }, [initialData]); // Este efecto se ejecutará cada vez que cambie initialData

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="asignacion-label">Asignación</InputLabel>
              <Select
                labelId="asignacion-label"
                value={formData.id_asignacion}
                onChange={handleChange}
                name="id_asignacion"
                required
              >
                {asignaciones.map((asignacion) => (
                  <MenuItem key={asignacion.id_asignacion} value={asignacion.id_asignacion}>
                    {`Voluntario: ${asignacion.id_voluntario} - Tarea: ${asignacion.id_tarea}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Descripción de la Actividad"
              multiline
              fullWidth
              value={formData.descripcion}
              onChange={handleChange}
              name="descripcion"
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Fecha de la Actividad"
              type="datetime-local"
              fullWidth
              value={formData.fecha}
              onChange={handleChange}
              name="fecha"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Guardar
          </Button>
      </form>
    </>
  );
};

export default RegistroActividadForm;
