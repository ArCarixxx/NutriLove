const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');

router.get('/', personaController.obtenerPersonas);
router.get('/usuario', personaController.obtenerPersonasUsuarios);
router.get('/:id', personaController.obtenerPersonaPorId);
router.post('/', personaController.crearPersona);
router.post('/voluntario', personaController.crearVoluntario);
router.put('/:id', personaController.actualizarPersona);
router.delete('/:id', personaController.eliminarPersona);

module.exports = router;
