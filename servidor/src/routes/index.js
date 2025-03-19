const express = require('express');
const router = express.Router();
const personaRoutes = require('./personaRoutes');
const usuarioRoutes = require('./usuarioRoutes');
const voluntarioRoutes = require('./voluntarioRoutes');
const tareaRoutes = require('./tareaRoutes');
const asignacionTareaRoutes = require('./asignacionTareaRoutes');
const registroActividadRoutes = require('./registroActividadRoutes');




router.use('/personas', personaRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/voluntarios', voluntarioRoutes);
router.use('/tareas', tareaRoutes);
router.use('/asignacion', asignacionTareaRoutes);
router.use('/registros', registroActividadRoutes);

router.get('/', (req, res) => {
    res.send('API de NutriLove funcionando!');
});

module.exports = router;
