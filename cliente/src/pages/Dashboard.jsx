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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"; // Gráfico de barras
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"; // Para gráficos

function Dashboard() {
  const [usuario, setUsuario] = useState(null);
  const [voluntarios, setVoluntarios] = useState(0);
  const [tareas, setTareas] = useState({
    pendiente: 1,
    enProceso: 2,
    finalizada: 3,
    cancelado: 1,
    vencido: 1, // Agregar el estado vencido si es necesario
  });
  const [tareasPorTipo, setTareasPorTipo] = useState({});
  const [tareasPorVoluntario, setTareasPorVoluntario] = useState({});
  const [tiempoEjecutadas, setTiempoEjecutadas] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      // Obtener voluntarios
      const responseVoluntarios = await fetch("http://localhost:5000/api/voluntarios");
      const dataVoluntarios = await responseVoluntarios.json();
      setVoluntarios(dataVoluntarios.length);

      // Obtener tareas
      const responseTareas = await fetch("http://localhost:5000/api/tareas");
      const dataTareas = await responseTareas.json();

      // Contar tareas por estado
      const estados = {
        pendiente: 6,
        enProceso: 4,
        finalizada: 5,
        cancelado: 1,
        vencido: 1, // Asegúrate de que este estado esté presente si lo necesitas
      };
      const tipos = {};
      const tareasPorVoluntario = {};
      const tiempos = [];

      dataTareas.forEach((tarea) => {
        // Asegurarse de que los estados están correctamente escritos (sensibilidad a mayúsculas/minúsculas)
        const estadoTarea = tarea.estado ? tarea.estado.toLowerCase() : ""; // Convertir a minúsculas para normalizar

        if (estados[estadoTarea] !== undefined) {
          estados[estadoTarea]++; // Contar las tareas por estado
        }

        // Contar tareas por tipo
        tipos[tarea.tipo] = tipos[tarea.tipo] ? tipos[tarea.tipo] + 1 : 1;

        // Contar tareas por voluntario
        tareasPorVoluntario[tarea.voluntario] = tareasPorVoluntario[tarea.voluntario]
          ? tareasPorVoluntario[tarea.voluntario] + 1
          : 1;

        // Calcular tiempo de ejecución de tareas finalizadas
        if (tarea.estado === "Finalizada" && tarea.fechaInicio && tarea.fechaFin) {
          const inicio = new Date(tarea.fechaInicio);
          const fin = new Date(tarea.fechaFin);
          const tiempo = (fin - inicio) / 1000; // Tiempo en segundos
          tiempos.push(tiempo);
        }
      });

      setTareas(estados);
      setTareasPorTipo(tipos);
      setTareasPorVoluntario(tareasPorVoluntario);
      setTiempoEjecutadas(tiempos);

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
      navigate("/login"); // Redirigir si no está autenticado
    }

    fetchData(); // Llamar a la función de datos
  }, [navigate]);

  const COLORS = ["#00C49F", "#FF8042", "#0088FE", "#FFBB28", "#FF6347"]; // Puedes agregar más colores si es necesario

  const promedioTiempo = tiempoEjecutadas.length
    ? (tiempoEjecutadas.reduce((acc, tiempo) => acc + tiempo, 0) / tiempoEjecutadas.length).toFixed(2)
    : 0;

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {/* Bienvenida y sesión */}
        <Grid item xs={12}>
          <Typography variant="h2" gutterBottom color="primary">
            Bienvenido, {usuario?.username}
          </Typography>
          <Typography variant="h4" paragraph color="secondary">
            Rol: {usuario?.rol}
          </Typography>
        </Grid>

        {/* Reporte de Voluntarios */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Voluntarios Activos
              </Typography>
              {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <CircularProgress />
                </Box>
              ) : (
                <Typography variant="h4">{voluntarios}</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Reporte de Tareas por Estado */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tareas por Estado
              </Typography>
              {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <CircularProgress />
                </Box>
              ) : (
                <ResponsiveContainer width="100%" height={300} >
                  <BarChart data={Object.keys(tareas).map((estado) => ({
                    name: estado.charAt(0).toUpperCase() + estado.slice(1),
                    cantidad: tareas[estado],
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="cantidad" fill="#ff8000"  />
                  </BarChart>
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
