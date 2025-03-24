import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Box, Typography, FormControl, InputLabel, Select, MenuItem, Dialog,
    DialogTitle,
    DialogActions , } from "@mui/material";

    import logo from "../assets/Logo-NutriLove.png";
    import letras from "../assets/LogoBlanco.png";

const VoluntarioForm = ({ onSave, initialData = {} }) => {
    const navigate = useNavigate(); // Hook para redirección
    const [openModal, setOpenModal] = useState(false);
    const [userData, setUserData] = useState({ usuario: "", contrasenia: "" });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
  });

  const nombre = watch("nombre", initialData.nombre || "");
  const apellido = watch("apellido", initialData.apellido || "");
  const fechaNacimiento = watch("fecha_nacimiento", initialData.fecha_nacimiento || "");

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

  const handleChange = (e) => {
    setValue(e.target.name, e.target.value);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    navigate("/"); // Redirige al home
  };
  
  const onSubmit = async (formData) => {
    const dataToSend = {
      ...formData,
      rol: "voluntario",
      estado: "Activo",
    };

    try {
      const response = await fetch("http://localhost:5000/api/personas/voluntario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error("Error al registrar el voluntario");

      const data = await response.json();
      setUserData({ usuario: formData.usuario, contrasenia: formData.contrasenia });
      setOpenModal(true); // Abre el modal
    } catch (error) {
      console.error("Error:", error);
      alert("Error al registrar el voluntario");
    }
  };  

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
        <Box sx={{ padding: 2, borderRadius: 2, boxShadow: 2, backgroundColor: "#f5f5f5" }}>
          <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 2 }}>
            Registro de Voluntario
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField fullWidth label="Nombre" {...register("nombre", { required: "El nombre es obligatorio" })} error={!!errors.nombre} helperText={errors.nombre?.message} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Apellido" {...register("apellido", { required: "El apellido es obligatorio" })} error={!!errors.apellido} helperText={errors.apellido?.message} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Correo" type="email" {...register("correo", { required: "El correo es obligatorio", pattern: { value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/, message: "Correo inválido" } })} error={!!errors.correo} helperText={errors.correo?.message} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Teléfono" type="tel" {...register("telefono", { required: "El teléfono es obligatorio", pattern: { value: /^[0-9]{7,10}$/, message: "Teléfono inválido" } })} error={!!errors.telefono} helperText={errors.telefono?.message} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Dirección" {...register("direccion", { required: "La dirección es obligatoria" })} error={!!errors.direccion} helperText={errors.direccion?.message} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Fecha de Nacimiento" type="date" InputLabelProps={{ shrink: true }} {...register("fecha_nacimiento", { required: "La fecha de nacimiento es obligatoria" })} error={!!errors.fecha_nacimiento} helperText={errors.fecha_nacimiento?.message} />
            </Grid>

            <Grid item xs={6}>
          <TextField
            fullWidth
            label="Disponibilidad"
            name="disponibilidad"
            value={watch("disponibilidad")}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Habilidades"
            name="habilidades"
            value={watch("habilidades")}
            onChange={handleChange}
          />
        </Grid>

            <Grid item xs={6}>
              <TextField fullWidth label="Usuario" value={watch("usuario")} 
            InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true }} variant="outlined" sx={{ backgroundColor: "#e0e0e0" }} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Contraseña" 
            InputLabelProps={{ shrink: true }} type="password" value={watch("contrasenia")} InputProps={{ readOnly: true }} variant="outlined" sx={{ backgroundColor: "#e0e0e0" }} />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Rol</InputLabel>
                <Select name="rol" value="Voluntario" readOnly variant="outlined" sx={{ backgroundColor: "#e0e0e0" }}>
                  <MenuItem value="Administrador">Administrador</MenuItem>
                  <MenuItem value="Voluntario">Voluntario</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select name="estado" value="Activo" readOnly variant="outlined" sx={{ backgroundColor: "#e0e0e0" }}>
                  <MenuItem value="Activo">Activo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Guardar
          </Button>
          
        </Box>
      </form>

      {/* Modal de confirmación */}
      
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>¡Gracias por registrarte como voluntario en NutriLove!</DialogTitle>
        <center>
            <img src={logo} alt="NutriLove Logo" style={{ height: 70 }} />
            <img src={letras} alt="NutriLove Letras" style={{ height: 70, marginRight: 30 }} />
            <img src={logo} alt="NutriLove Logo" style={{ height: 70 }} />
            <Typography variant="body1"><strong>Usuario:</strong> {userData.usuario}</Typography>
            <Typography variant="body1"><strong>Contraseña:</strong> {userData.contrasenia}</Typography>
        </center>
        <br></br>
        
        <Button variant="contained" color="primary" onClick={handleCloseModal}>
            Cerrar
          </Button>
      </Dialog>
    </>
  );
};

export default VoluntarioForm;
