import { useForm } from "react-hook-form";
import { TextField, Button, Grid } from "@mui/material";

const TareaForm = ({ onSubmit, initialData = {} }) => {
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
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Título"
            {...register("titulo", { required: "El título es obligatorio" })}
            error={!!errors.titulo}
            helperText={errors.titulo?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descripción"
            multiline
            rows={4}
            {...register("descripcion", { required: "La descripción es obligatoria" })}
            error={!!errors.descripcion}
            helperText={errors.descripcion?.message}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Fecha Límite"
            type="date"
            InputLabelProps={{ shrink: true }}
            {...register("fecha_limite", { required: "La fecha límite es obligatoria" })}
            error={!!errors.fecha_limite}
            helperText={errors.fecha_limite?.message}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Estado"
            {...register("estado", { required: "El estado es obligatorio" })}
            error={!!errors.estado}
            helperText={errors.estado?.message}
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        {initialData.id_tarea ? "Actualizar" : "Agregar"}
      </Button>
    </form>
  );
};

export default TareaForm;
