import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [voluntarios, setVoluntarios] = useState(0);
  const [personasPorEdad, setPersonasPorEdad] = useState({});
  const [nuevasPersonas, setNuevasPersonas] = useState(0);
  const [tareas, setTareas] = useState({
    pendiente: 1,
    enProceso: 2,
    finalizada: 3,
    cancelado: 1,
    vencido: 1,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const responseVoluntarios = await fetch("http://localhost:5000/api/voluntarios");
      const dataVoluntarios = await responseVoluntarios.json();
      setVoluntarios(dataVoluntarios.length);

      const responsePersonas = await fetch("http://localhost:5000/api/personas");
      const dataPersonas = await responsePersonas.json();
      
      const edades = {};
      let nuevas = 0;
      const hoy = new Date();
      
      dataPersonas.forEach((persona) => {
        const edad = new Date().getFullYear() - new Date(persona.fecha_nacimiento).getFullYear();
        edades[edad] = edades[edad] ? edades[edad] + 1 : 1;
        
        const fechaRegistro = new Date(persona.fecha_registro);
        if ((hoy - fechaRegistro) / (1000 * 60 * 60 * 24) <= 30) {
          nuevas++;
        }
      });

      setPersonasPorEdad(edades);
      setNuevasPersonas(nuevas);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) {
      setUsuario(JSON.parse(user));
    } else {
      navigate("/login");
    }
    fetchData();
  }, [navigate]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom color="primary">
            Bienvenido, {usuario?.username}
          </Typography>
          <Typography variant="h4" paragraph color="secondary">
            Rol: {usuario?.rol}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Voluntarios Activos</Typography>
              {loading ? <CircularProgress /> : <Typography variant="h4">{voluntarios}</Typography>}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Tareas por Estado</Typography>
              {loading ? (
                <CircularProgress />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={Object.keys(tareas).map((estado) => ({
                    name: estado.charAt(0).toUpperCase() + estado.slice(1),
                    cantidad: tareas[estado],
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cantidad" fill="#ff8000" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Personas Nuevas en el Último Mes</Typography>
              {loading ? <CircularProgress /> : <Typography variant="h4">{nuevasPersonas}</Typography>}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Distribución por Edad</Typography>
              {loading ? (
                <CircularProgress />
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={Object.keys(personasPorEdad).map((edad) => ({
                        name: `${edad} años`,
                        value: personasPorEdad[edad],
                      }))}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      {Object.keys(personasPorEdad).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={["#0088FE", "#00C49F", "#FFBB28", "#FF8042"][index % 4]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;