const express = require('express');
const router = express.Router();
const voluntarioController = require('../controllers/voluntarioController');

router.get('/', voluntarioController.obtenerVoluntarios);
router.get('/:id', voluntarioController.obtenerVoluntarioPorId);
router.post('/', voluntarioController.crearVoluntario);
router.put('/:id', voluntarioController.actualizarVoluntario);
router.delete('/:id', voluntarioController.eliminarVoluntario);

module.exports = router;
