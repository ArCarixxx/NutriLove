import { useState, useEffect } from "react";
import {
  Container,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  TextField,
  Fab,
  DialogActions,
} from "@mui/material";
import { Edit, Add, Search, Delete } from "@mui/icons-material";
import VoluntarioForm from "../components/VoluntarioForm";

const Voluntarios = () => {
  const [voluntarios, setVoluntarios] = useState([]);
  const [filteredVoluntarios, setFilteredVoluntarios] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedVoluntario, setSelectedVoluntario] = useState(null);
  const [search, setSearch] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/voluntarios/Completo")
      .then((res) => res.json())
      .then((data) => {
        setVoluntarios(data);
        setFilteredVoluntarios(data);
      });
  }, []);

  const handleOpen = (voluntario = null) => {
    console.log("Voluntario seleccionado:", voluntario); // Verificar en consola
    setSelectedVoluntario(voluntario);
    setOpen(true);
  };
  

  const handleClose = () => {
    setOpen(false);
    setSelectedVoluntario(null);
  };

  const handleSave = (data) => {
    const url = selectedVoluntario
      ? `http://localhost:5000/api/voluntarios/${selectedVoluntario.id_voluntario}`
      : "http://localhost:5000/api/voluntarios";
    const method = selectedVoluntario ? "PUT" : "POST";
    console.log(selectedVoluntario)
    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        setOpen(false);
        window.location.reload(); // Recargar para ver cambios
      });
  };

  const handleDeleteConfirm = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDelete = () => {
    fetch(`http://localhost:5000/api/voluntarios/${deleteId}`, {
      method: "DELETE",
    }).then(() => {
      setConfirmOpen(false);
      setDeleteId(null);
      window.location.reload(); // Recargar para ver cambios
    });
  };

  // Filtrar voluntarios en tiempo real
  useEffect(() => {
    setFilteredVoluntarios(
      voluntarios.filter((v) =>
        Object.values(v).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [search, voluntarios]);

  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center", my: 2 }}>
        Gestión de Voluntarios
      </Typography>

      {/* Buscador */}
      <TextField
        variant="outlined"
        label="Buscar voluntario..."
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1 }} />,
        }}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tabla de Voluntarios */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Apellido</strong></TableCell>
              <TableCell><strong>Disponibilidad</strong></TableCell>
              <TableCell><strong>Habilidades</strong></TableCell>
              <TableCell><strong>Estado</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVoluntarios.map((voluntario) => (
              <TableRow key={voluntario.id_voluntario}>
                <TableCell>{voluntario.nombre}</TableCell>
                <TableCell>{voluntario.apellido}</TableCell>
                <TableCell>{voluntario.disponibilidad}</TableCell>
                <TableCell>{voluntario.habilidades}</TableCell>
                <TableCell>{voluntario.estado}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(voluntario)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteConfirm(voluntario.id_voluntario)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Botón flotante para agregar */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: "fixed", bottom: 20, right: 20 }}
        onClick={() => handleOpen()}
      >
        <Add />
      </Fab>

      {/* Modal para agregar/editar voluntario */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedVoluntario ? "Editar Voluntario" : "Agregar Voluntario"}</DialogTitle>
        <DialogContent>
          <VoluntarioForm onSave={handleSave} initialData={selectedVoluntario || {}} />
        </DialogContent>
      </Dialog>

      {/* Modal de confirmación para eliminar */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>¿Estás seguro de eliminar este voluntario?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Voluntarios;
