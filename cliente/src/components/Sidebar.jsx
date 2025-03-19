// src/components/Sidebar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, ListItemIcon, IconButton } from '@mui/material';
import { Home, Person, Task, VolunteerActivism, Settings, ExitToApp } from '@mui/icons-material'; 
import { useNavigate } from 'react-router-dom';
import logo from "../assets/Logo-NutriLove.png";
import letras from "../assets/LogoBlanco.png";

const Sidebar = () => {
  const navigate = useNavigate();

  // Función para navegar entre las páginas
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      sx={{
        width: 270,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 270,
          boxSizing: 'border-box',
          backgroundColor: '#7BA449',
          color: 'white',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <div style={{ padding: '20px', textAlign: '<center' }}>
      <center>
        <img src={logo} alt="NutriLove Logo" style={{ height: 150 }} />
        <img src={letras} alt="NutriLove Letras" style={{ height: 90, marginRight: 30 }} />
      </center>
               
      </div>
      <Divider />
      <List>
        <ListItem button onClick={() => handleNavigation('/dashboard')}>
          <ListItemIcon>
            <Home style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/persona')}>
          <ListItemIcon>
            <Person style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Persona" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/voluntario')}>
          <ListItemIcon>
            <VolunteerActivism style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Voluntarios" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/tarea')}>
          <ListItemIcon>
            <Task style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Tareas" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/asignacion')}>
          <ListItemIcon>
            <Settings style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Asignaciones" />
        </ListItem>
        <ListItem button onClick={() => handleNavigation('/actividad')}>
          <ListItemIcon>
            <ExitToApp style={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Actividades" />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
