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

const GestionTareas = () => {
    const [tareas, setTareas] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [tareaEditando, setTareaEditando] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        cargarTareas();
    }, []);

    const cargarTareas = () => {
        axios.get("http://localhost:5000/api/tareas")
            .then(response => setTareas(response.data))
            .catch(error => console.error("Error cargando tareas:", error));
    };

    const handleBuscar = (e) => {
        setBusqueda(e.target.value);
    };

    const handleEliminar = (id) => {
        if (window.confirm("¿Seguro que deseas eliminar esta tarea?")) {
            axios.delete(`http://localhost:5000/api/tareas/${id}`)
                .then(() => cargarTareas())
                .catch(error => console.error("Error eliminando tarea:", error));
        }
    };

    const handleEditar = (tarea) => {
        setTareaEditando(tarea);
        setModalOpen(true);
    };

    const handleGuardar = () => {
        setModalOpen(false);
        setTareaEditando(null);
        cargarTareas();
    };

    return (
        <Container>
            <Typography variant="h4" sx={{ textAlign: "center", my: 2 }}>
              Gestión de Voluntarios
            </Typography>
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
            
            <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Título</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Fecha Creación</TableCell>
                            <TableCell>Fecha Límite</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tareas.filter(t => t.titulo.toLowerCase().includes(busqueda.toLowerCase())).map((tarea) => (
                            <TableRow key={tarea.id_tarea}>
                                <TableCell>{tarea.titulo}</TableCell>
                                <TableCell>{tarea.descripcion}</TableCell>
                                <TableCell>{tarea.fecha_creacion}</TableCell>
                                <TableCell>{tarea.fecha_limite}</TableCell>
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
          <VoluntarioForm onSubmit={handleSave} initialData={selectedVoluntario || {}} />
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

export default GestionTareas;
