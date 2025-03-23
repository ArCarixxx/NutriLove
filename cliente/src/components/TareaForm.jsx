import { useState, useEffect } from "react";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem} from "@mui/material";

const TareaForm = ({ onSave, initialData }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    fecha_limite: "",
    estado: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        titulo: initialData.titulo || "",
        descripcion: initialData.descripcion || "",
        fecha_limite: initialData.fecha_limite || "",
        estado: initialData.estado || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Título"
        name="titulo"
        value={formData.titulo}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Descripción"
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Fecha Límite"
        name="fecha_limite"
        InputLabelProps={{ shrink: true }}
        value={formData.fecha_limite}
        onChange={handleChange}
        type="date"
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth>
        <InputLabel>Estado</InputLabel>
        <Select name="estado" value={formData.estado} onChange={handleChange}>
          <MenuItem value="Pendiente">Pendiente</MenuItem>
          <MenuItem value="En Proceso">En Proceso</MenuItem>
          <MenuItem value="Finalizada">Finalizada</MenuItem>
          <MenuItem value="Cancelado">Cancelado</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Guardar
      </Button> 
    </form>
  );
};

export default TareaForm;
