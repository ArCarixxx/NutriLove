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
import AsignacionTareaForm from "../components/AsignacionTareaForm";

const AsignacionTareas = () => {
  const [asignaciones, setAsignaciones] = useState([]);
  const [filteredAsignaciones, setFilteredAsignaciones] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedAsignacion, setSelectedAsignacion] = useState(null);
  const [search, setSearch] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/asignacion/completo")
      .then((res) => res.json())
      .then((data) => {
        setAsignaciones(data);
        setFilteredAsignaciones(data);
      });
  }, []);

  const handleOpen = (asignacion = null) => {
    console.log("Asignación seleccionada:", asignacion); // Verificar en consola
    setSelectedAsignacion(asignacion);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAsignacion(null);
  };

  const handleSave = (data) => {
    const url = selectedAsignacion
      ? `http://localhost:5000/api/asignacion/${selectedAsignacion.id_asignacion}`
      : "http://localhost:5000/api/asignacion";
    const method = selectedAsignacion ? "PUT" : "POST";
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
    fetch(`http://localhost:5000/api/asignacion/${deleteId}`, {
      method: "DELETE",
    }).then(() => {
      setConfirmOpen(false);
      setDeleteId(null);
      window.location.reload(); // Recargar para ver cambios
    });
  };

  // Filtrar asignaciones en tiempo real
  useEffect(() => {
    setFilteredAsignaciones(
      asignaciones.filter((a) =>
        Object.values(a).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [search, asignaciones]);

  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center", my: 2 }}>
        Gestión de Asignación de Tareas
      </Typography>

      {/* Buscador */}
      <TextField
        variant="outlined"
        label="Buscar asignación..."
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1 }} />,
        }}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tabla de Asignación de Tareas */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><strong>Voluntario</strong></TableCell>
              <TableCell><strong>Tarea</strong></TableCell>
              <TableCell><strong>Fecha Asignación</strong></TableCell>
              <TableCell><strong>Fecha Inicio</strong></TableCell>
              <TableCell><strong>Fecha Fin</strong></TableCell>
              <TableCell><strong>Estado</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAsignaciones.map((asignacion) => (
              <TableRow key={asignacion.id_asignacion}>
                <TableCell>{asignacion.nombre} {asignacion.apellido}</TableCell>
                <TableCell>{asignacion.titulo}</TableCell>
                <TableCell>{new Date(asignacion.fecha_asignacion).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(asignacion.fecha_inicio).toLocaleDateString()}</TableCell>
                <TableCell>{asignacion.fecha_fin ? new Date(asignacion.fecha_fin).toLocaleDateString() : "-"}</TableCell>
                <TableCell>{asignacion.estado}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(asignacion)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteConfirm(asignacion.id_asignacion)}>
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

      {/* Modal para agregar/editar asignación de tarea */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedAsignacion ? "Editar Asignación de Tarea" : "Asignar Tarea"}</DialogTitle>
        <DialogContent>
          <AsignacionTareaForm onSave={handleSave} initialData={selectedAsignacion || {}} />
        </DialogContent>
      </Dialog>

      {/* Modal de confirmación para eliminar */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>¿Estás seguro de eliminar esta asignación?</DialogTitle>
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

export default AsignacionTareas;
