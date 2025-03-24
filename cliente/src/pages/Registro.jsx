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
import RegistroActividadForm from "../components/RegistroActividadForm";

const RegistroActividades = () => {
  const [registros, setRegistros] = useState([]);
  const [filteredRegistros, setFilteredRegistros] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRegistro, setSelectedRegistro] = useState(null);
  const [search, setSearch] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/registros/completo")
      .then((res) => res.json())
      .then((data) => {
        setRegistros(data);
        setFilteredRegistros(data);
      });
  }, []);

  const handleOpen = (registro = null) => {
    console.log("Registro seleccionado:", registro); // Verificar en consola
    setSelectedRegistro(registro);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRegistro(null);
  };

  const handleSave = (data) => {
    const url = selectedRegistro
      ? `http://localhost:5000/api/registros/${selectedRegistro.id_registro}`
      : "http://localhost:5000/api/registros";
    const method = selectedRegistro ? "PUT" : "POST";
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
    fetch(`http://localhost:5000/api/registros/${deleteId}`, {
      method: "DELETE",
    }).then(() => {
      setConfirmOpen(false);
      setDeleteId(null);
      window.location.reload(); // Recargar para ver cambios
    });
  };

  // Filtrar registros en tiempo real
  useEffect(() => {
    setFilteredRegistros(
      registros.filter((r) =>
        Object.values(r).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [search, registros]);

  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center", my: 2 }}>
        Gestión de Registros de Actividad
      </Typography>

      {/* Buscador */}
      <TextField
        variant="outlined"
        label="Buscar registro..."
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1 }} />,
        }}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tabla de Registros de Actividad */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><strong>Asignación</strong></TableCell>
              <TableCell><strong>Fecha</strong></TableCell>
              <TableCell><strong>Descripción</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRegistros.map((registro) => (
              <TableRow key={registro.id_registro}>
                <TableCell>{registro.tarea}</TableCell>
                <TableCell>{new Date(registro.fecha).toLocaleDateString()}</TableCell>
                <TableCell>{registro.descripcion}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(registro)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteConfirm(registro.id_registro)}>
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

      {/* Modal para agregar/editar registro de actividad */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedRegistro ? "Editar Registro de Actividad" : "Registrar Actividad"}</DialogTitle>
        <DialogContent>
          <RegistroActividadForm onSave={handleSave} initialData={selectedRegistro || {}} />
        </DialogContent>
      </Dialog>

      {/* Modal de confirmación para eliminar */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>¿Estás seguro de eliminar este registro?</DialogTitle>
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

export default RegistroActividades;
