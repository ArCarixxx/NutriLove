import { useState, useEffect } from "react";
import { TextField, Button, Grid, MenuItem, Select, FormControl, InputLabel, DialogActions, DialogTitle } from "@mui/material";

const AsignacionTareaForm = ({ onSave, initialData = {} }) => {
  const [formData, setFormData] = useState({
    id_voluntario: "",
    id_tarea: "",
    fecha_inicio: "",
    fecha_fin: "",
    estado: "Pendiente",
  });

  const [voluntarios, setVoluntarios] = useState([]);
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    // Obtener lista de voluntarios desde el backend
    fetch("http://localhost:5000/api/voluntarios/completo")
      .then((res) => res.json())
      .then((data) => setVoluntarios(data));

    // Obtener lista de tareas desde el backend
    fetch("http://localhost:5000/api/tareas")
      .then((res) => res.json())
      .then((data) => setTareas(data));
  }, []);

  useEffect(() => {
    if (initialData && initialData.id_asignacion) {
      setFormData({
        id_voluntario: initialData.id_voluntario || "",
        id_tarea: initialData.id_tarea || "",
        fecha_inicio: initialData.fecha_inicio || "",
        fecha_fin: initialData.fecha_fin || "",
        estado: initialData.estado || "Pendiente",
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
              <InputLabel id="voluntario-label">Voluntario</InputLabel>
              <Select
                labelId="voluntario-label"
                value={formData.id_voluntario}
                onChange={handleChange}
                name="id_voluntario"
                required
              >
                {voluntarios.map((voluntario) => (
                  <MenuItem key={voluntario.id_voluntario} value={voluntario.id_voluntario}>
                    {voluntario.nombre} {voluntario.apellido}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="tarea-label">Tarea</InputLabel>
              <Select
                labelId="tarea-label"
                value={formData.id_tarea}
                onChange={handleChange}
                name="id_tarea"
                required
              >
                {tareas.map((tarea) => (
                  <MenuItem key={tarea.id_tarea} value={tarea.id_tarea}>
                    {tarea.titulo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Fecha de Inicio"
              type="date"
              fullWidth
              value={formData.fecha_inicio}
              onChange={handleChange}
              name="fecha_inicio"
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Fecha de Fin"
              type="date"
              fullWidth
              value={formData.fecha_fin}
              onChange={handleChange}
              name="fecha_fin"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select
                labelId="estado-label"
                value={formData.estado}
                onChange={handleChange}
                name="estado"
                required
              >
                <MenuItem value="Pendiente">Pendiente</MenuItem>
                <MenuItem value="En Proceso">En Proceso</MenuItem>
                <MenuItem value="Finalizada">Finalizada</MenuItem>
                <MenuItem value="Cancelada">Cancelada</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Guardar
          </Button>
      </form>
    </>
  );
};

export default AsignacionTareaForm;
