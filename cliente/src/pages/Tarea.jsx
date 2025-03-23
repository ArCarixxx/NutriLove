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
import TareaForm from "../components/TareaForm";

const Tareas = () => {
  const [tareas, setTareas] = useState([]);
  const [filteredTareas, setFilteredTareas] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTarea, setSelectedTarea] = useState(null);
  const [search, setSearch] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/tareas")
      .then((res) => res.json())
      .then((data) => {
        setTareas(data);
        setFilteredTareas(data);
      });
  }, []);

  const handleOpen = (tarea = null) => {
    console.log("Tarea seleccionada:", tarea); // Verificar en consola
    setSelectedTarea(tarea);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTarea(null);
  };

  const handleSave = (data) => {
    const url = selectedTarea
      ? `http://localhost:5000/api/tareas/${selectedTarea.id_tarea}`
      : "http://localhost:5000/api/tareas";
    const method = selectedTarea ? "PUT" : "POST";
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
    fetch(`http://localhost:5000/api/tareas/${deleteId}`, {
      method: "DELETE",
    }).then(() => {
      setConfirmOpen(false);
      setDeleteId(null);
      window.location.reload(); // Recargar para ver cambios
    });
  };

  // Filtrar tareas en tiempo real
  useEffect(() => {
    setFilteredTareas(
      tareas.filter((t) =>
        Object.values(t).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [search, tareas]);

  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center", my: 2 }}>
        Gestión de Tareas
      </Typography>

      {/* Buscador */}
      <TextField
        variant="outlined"
        label="Buscar tarea..."
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1 }} />,
        }}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tabla de Tareas */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><strong>Título</strong></TableCell>
              <TableCell><strong>Descripción</strong></TableCell>
              <TableCell><strong>Fecha de Creación</strong></TableCell>
              <TableCell><strong>Fecha Límite</strong></TableCell>
              <TableCell><strong>Estado</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTareas.map((tarea) => (
              <TableRow key={tarea.id_tarea}>
                <TableCell>{tarea.titulo}</TableCell>
                <TableCell>{tarea.descripcion}</TableCell>
                <TableCell>{new Date(tarea.fecha_creacion).toLocaleString()}</TableCell>
                <TableCell>{tarea.fecha_limite ? new Date(tarea.fecha_limite).toLocaleString() : 'Sin fecha'}</TableCell>
                <TableCell>{tarea.estado}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(tarea)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteConfirm(tarea.id_tarea)}>
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

      {/* Modal para agregar/editar tarea */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedTarea ? "Editar Tarea" : "Agregar Tarea"}</DialogTitle>
        <DialogContent>
          <TareaForm onSave={handleSave} initialData={selectedTarea || {}} />
        </DialogContent>
      </Dialog>

      {/* Modal de confirmación para eliminar */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>¿Estás seguro de eliminar esta tarea?</DialogTitle>
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

export default Tareas;
