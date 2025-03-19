// src/components/Sidebar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, ListItemIcon, IconButton } from '@mui/material';
import { Home, Person, Task, VolunteerActivism, Settings, ExitToApp } from '@mui/icons-material'; 
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  // Función para navegar entre las páginas
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#7BA449',
          color: 'white',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <img
          src="https://via.placeholder.com/50" // Aquí va tu logo
          alt="Logo"
          style={{ marginBottom: '10px' }}
        />
        <h2>NutriLove</h2>
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
