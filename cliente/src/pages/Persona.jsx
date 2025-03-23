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
import PersonaForm from "../components/PersonaForm";

const Personas = () => {
  const [personas, setPersonas] = useState([]);
  const [filteredPersonas, setFilteredPersonas] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [search, setSearch] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/personas/usuario")
      .then((res) => res.json())
      .then((data) => {
        setPersonas(data);
        setFilteredPersonas(data);
      });
  }, []);

  const handleOpen = (persona = null) => {
    setSelectedPersona(persona);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPersona(null);
  };

  const handleSave = (data) => {
    const url = selectedPersona
      ? `http://localhost:5000/api/personas/${selectedPersona.id_persona}`
      : "http://localhost:5000/api/personas";
    const method = selectedPersona ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        setOpen(false);
        window.location.reload();
      });
  };

  const handleDeleteConfirm = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleDelete = () => {
    fetch(`http://localhost:5000/api/personas/${deleteId}`, {
      method: "DELETE",
    }).then(() => {
      setConfirmOpen(false);
      setDeleteId(null);
      window.location.reload();
    });
  };

  useEffect(() => {
    setFilteredPersonas(
      personas.filter((p) =>
        Object.values(p).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }, [search, personas]);

  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center", my: 2 }}>
        Gestión de Personas
      </Typography>

      {/* Buscador */}
      <TextField
        variant="outlined"
        label="Buscar persona..."
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: <Search sx={{ mr: 1 }} />,
        }}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Tabla de Personas */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Apellido</strong></TableCell>
              <TableCell><strong>Correo</strong></TableCell>
              <TableCell><strong>Teléfono</strong></TableCell>
              <TableCell><strong>Dirección</strong></TableCell>
              <TableCell><strong>Fecha Nacimiento</strong></TableCell>
              <TableCell><strong>Usuario</strong></TableCell>
              <TableCell><strong>Rol</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPersonas.map((persona) => (
              <TableRow key={persona.id_persona}>
                <TableCell>{persona.nombre}</TableCell>
                <TableCell>{persona.apellido}</TableCell>
                <TableCell>{persona.correo}</TableCell>
                <TableCell>{persona.telefono}</TableCell>
                <TableCell>{persona.direccion}</TableCell>
                <TableCell>{persona.fecha_nacimiento}</TableCell>
                <TableCell>{persona.username}</TableCell> {/* Nuevo campo */}
                <TableCell>{persona.rol}</TableCell> {/* Nuevo campo */}
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(persona)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteConfirm(persona.id_persona)}>
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

      {/* Modal para agregar/editar persona */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>{selectedPersona ? "Editar Persona" : "Agregar Persona"}</DialogTitle>
        <DialogContent>
          <PersonaForm onSubmit={handleSave} initialData={selectedPersona || {}} />
        </DialogContent>
      </Dialog>

      {/* Modal de confirmación para eliminar */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>¿Estás seguro de eliminar esta persona?</DialogTitle>
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

export default Personas;
