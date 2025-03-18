const express = require('express');
const router = express.Router();
const personaRoutes = require('./personaRoutes');
const usuarioRoutes = require('./usuarioRoutes');

router.use('/personas', personaRoutes);
router.use('/usuarios', usuarioRoutes);

router.get('/', (req, res) => {
    res.send('API de NutriLove funcionando!');
});

module.exports = router;
