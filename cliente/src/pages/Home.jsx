import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Typography, Box, Grid, Paper } from "@mui/material";
import { keyframes } from "@mui/system";

// Importar imágenes desde src/assets
import voluntariosImage from "../assets/banner.jpg";  
import nutriImage from "../assets/alimentos.jpg";
import nutricionImage from "../assets/banco-alimentos.jpg"; 
import logoImage from "../assets/Logo-NutriLove.png";  // Asegúrate de que la ruta sea correcta

function Home() {
  const fadeIn = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `;

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "fluid",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* Primer Box con fondo de imagen */}
      <Box
        sx={{
          backgroundImage: `url(${voluntariosImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          padding: "50px 0",
          color: "white",
          textAlign: "center",
          animation: `${fadeIn} 2s ease-in-out`,
        }}
      >
        {/* Logo de la organización */}
        <Box sx={{ marginBottom: "20px", animation: `${fadeIn} 3s ease-in-out` }}>
          <img src={logoImage} alt="NutriLove Logo" style={{ width: "150px" }} />
        </Box>

        {/* Caja de bienvenida */}
        <Box
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: "30px",
            borderRadius: "10px",
            marginBottom: "40px",
            animation: `${fadeIn} 4s ease-in-out`,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold", marginBottom: "20px" }}>
            Bienvenido a NutriLove
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: "40px" }}>
            ¡Únete a nuestra misión y ayuda a quienes más lo necesitan!
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            {/* Botón para registro */}
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#FFB74D",
                  "&:hover": {
                    backgroundColor: "#FFA000",
                  },
                }}
                component={Link}
                to="/registro"
              >
                Regístrate como Voluntario
              </Button>
            </Grid>

            {/* Botón para iniciar sesión */}
            <Grid item>
              <Button
                variant="outlined"
                color="Secondary"
                size="large"
                sx={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  borderColor: "#A5C63B",
                  color: "#A5C63B",
                  "&:hover": {
                    backgroundColor: "#A5C63B",
                    color: "white",
                  },
                }}
                component={Link}
                to="/login"
              >
                Iniciar Sesión
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>

      {/* Sección sin fondo: Misión y Visión */}
      <Box sx={{ width: "100%", padding: "40px 20px" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
          Misión
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "40px", textAlign: "center" }}>
          Proporcionar alimentos saludables a personas en situación de vulnerabilidad, promoviendo una
          alimentación digna y adecuada.
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>
          Visión
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "40px", textAlign: "center" }}>
          Ser la organización líder en la lucha contra el hambre en Bolivia, maximizando la eficiencia en la
          recolección y distribución de alimentos mediante tecnología y estrategias innovadoras.
        </Typography>
      </Box>

      {/* Sección de imágenes e información sin fondo */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
          marginTop: "50px",
        }}
      >
        <Paper
          sx={{
            width: "250px",
            height: "250px",
            backgroundImage: `url(${nutriImage})`, 
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "10px",
            boxShadow: 3,
          }}
        />
        <Paper
          sx={{
            width: "250px",
            height: "250px",
            backgroundImage: `url(${nutricionImage})`, 
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "10px",
            boxShadow: 3,
          }}
        />
      </Box>

      {/* Caja de contacto */}
      <Box
        sx={{
          marginTop: "60px",
          textAlign: "center",
          padding: "30px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#FFB74D" }}>
          ¿Tienes alguna duda?
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "10px", color: "white" }}>
          Si necesitas más información sobre cómo ser voluntario o sobre nuestra misión, no dudes en
          contactarnos.
        </Typography>
        <Button
          variant="text"
          sx={{
            marginTop: "20px",
            color: "#FFB74D",
            fontWeight: "bold",
          }}
          component={Link}
          to="/contacto"
        >
          Contáctanos
        </Button>
      </Box>
    </Container>
  );
}

export default Home;
