const express = require('express');
const router = express.Router();
const registroActividadController = require('../controllers/registroActividadController');

router.get('/', registroActividadController.obtenerRegistros);
router.get('/completo', registroActividadController.obtenerRegistroCompleto);
router.get('/:id', registroActividadController.obtenerRegistroPorId);
router.post('/', registroActividadController.crearRegistro);
router.put('/:id', registroActividadController.actualizarRegistro);
router.delete('/:id', registroActividadController.eliminarRegistro);

module.exports = router;
