import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { TextField, Button, Grid, MenuItem } from "@mui/material";

const PersonaForm = ({ onSubmit, initialData = {} }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialData, // Cargar datos iniciales
  });

  // Observar cambios en los campos clave
  const nombre = watch("nombre", initialData.nombre || "");
  const apellido = watch("apellido", initialData.apellido || "");
  const fechaNacimiento = watch("fecha_nacimiento", initialData.fecha_nacimiento || "");

  // Generar usuario y contraseña al modificar los valores clave
  useEffect(() => {
    if (nombre && apellido) {
      const username = `${nombre.charAt(0)}${apellido}`.toLowerCase();
      setValue("usuario", username);
    }
    if (nombre && fechaNacimiento) {
      const anioNacimiento = fechaNacimiento.split("-")[0];
      if (anioNacimiento) {
        const password = `${nombre}${anioNacimiento}`;
        setValue("contrasenia", password);
      }
    }
  }, [nombre, apellido, fechaNacimiento, setValue]);

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

        {/* Campo Usuario */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Usuario"
            {...register("usuario", { required: "El usuario es obligatorio" })}
            error={!!errors.usuario}
            helperText={errors.usuario?.message}
          />
        </Grid>

        {/* Campo Contraseña */}
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            {...register("contrasenia", { required: "La contraseña es obligatoria" })}
            error={!!errors.contrasenia}
            helperText={errors.contrasenia?.message}
          />
        </Grid>

        {/* Selector de Rol */}
        <Grid item xs={6}>
          <TextField
            select
            fullWidth
            label="Rol"
            {...register("rol", { required: "El rol es obligatorio" })}
            error={!!errors.rol}
            helperText={errors.rol?.message}
          >
            <MenuItem value="Administrador">Administrador</MenuItem>
            <MenuItem value="Voluntario">Voluntario</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Guardar
      </Button>
    </form>
  );
};

export default PersonaForm;
