const express = require('express');
const router = express.Router();
const asignacionTareaController = require('../controllers/asignacionTareaController');

router.get('/', asignacionTareaController.obtenerAsignaciones);
router.get('/:id', asignacionTareaController.obtenerAsignacionPorId);
router.post('/', asignacionTareaController.crearAsignacion);
router.put('/:id', asignacionTareaController.actualizarAsignacion);
router.delete('/:id', asignacionTareaController.eliminarAsignacion);

module.exports = router;
