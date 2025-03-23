const Persona = require('../models/Persona');

const obtenerPersonas = (req, res) => {
    Persona.obtenerTodas((err, resultados) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(resultados);
    });
};
const obtenerPersonasUsuarios = (req, res) => {
    Persona.obtenerPersonaUSuario((err, resultados) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(resultados);
    });
};

const obtenerPersonaPorId = (req, res) => {
    const { id } = req.params;
    Persona.obtenerPorId(id, (err, resultados) => {
        if (err) return res.status(500).json({ error: err.message });
        if (resultados.length === 0) return res.status(404).json({ mensaje: "Persona no encontrada" });
        res.json(resultados[0]);
    });
};

const crearPersona = (req, res) => {
    const nuevaPersona = req.body;
    Persona.crear(nuevaPersona, (err, resultado) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: "Persona creada", id: resultado.insertId });
    });
};

const crearVoluntario = (req, res) => {
    const nuevaPersona = req.body;
    Persona.crearVoluntario(nuevaPersona, (err, resultado) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: "Voluntario creado", id: resultado.insertId });
    });
};

const actualizarPersona = (req, res) => {
    const { id } = req.params;
    const personaActualizada = req.body;
    Persona.actualizar(id, personaActualizada, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Persona actualizada" });
    });
};

const eliminarPersona = (req, res) => {
    const { id } = req.params;
    Persona.eliminar(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Persona eliminada" });
    });
};

module.exports = {
    obtenerPersonas,
    obtenerPersonasUsuarios,
    obtenerPersonaPorId,
    crearPersona,
    crearVoluntario,
    actualizarPersona,
    eliminarPersona
};
