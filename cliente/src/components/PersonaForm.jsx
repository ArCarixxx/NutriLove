import { useForm } from "react-hook-form";
import { TextField, Button, Grid, Typography } from "@mui/material";

const PersonaForm = ({ onSubmit, initialData = {} }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Nombre"
            {...register("nombre", { required: "El nombre es obligatorio" })}
            error={!!errors.nombre}
            helperText={errors.nombre?.message}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Apellido"
            {...register("apellido", { required: "El apellido es obligatorio" })}
            error={!!errors.apellido}
            helperText={errors.apellido?.message}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Correo"
            type="email"
            {...register("correo", {
              required: "El correo es obligatorio",
              pattern: { value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, message: "Correo inválido" }
            })}
            error={!!errors.correo}
            helperText={errors.correo?.message}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Teléfono"
            type="tel"
            {...register("telefono", {
              required: "El teléfono es obligatorio",
              pattern: { value: /^[0-9]{7,10}$/, message: "Teléfono inválido" }
            })}
            error={!!errors.telefono}
            helperText={errors.telefono?.message}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Dirección"
            {...register("direccion", { required: "La dirección es obligatoria" })}
            error={!!errors.direccion}
            helperText={errors.direccion?.message}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Fecha de Nacimiento"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register("fecha_nacimiento", { required: "La fecha de nacimiento es obligatoria" })}
            error={!!errors.fecha_nacimiento}
            helperText={errors.fecha_nacimiento?.message}
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {initialData.id_persona ? "Actualizar" : "Agregar"}
      </Button>
    </form>
  );
};

export default PersonaForm;
