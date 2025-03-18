const express = require('express');
const router = express.Router();
const personaController = require('../controllers/personaController');

router.get('/', personaController.obtenerPersonas);
router.get('/:id', personaController.obtenerPersonaPorId);
router.post('/', personaController.crearPersona);
router.put('/:id', personaController.actualizarPersona);
router.delete('/:id', personaController.eliminarPersona);

module.exports = router;
