const express = require('express');
const router = express.Router();
const personaRoutes = require('./personaRoutes');

router.use('/personas', personaRoutes);

router.get('/', (req, res) => {
    res.send('API de NutriLove funcionando!');
});

module.exports = router;
