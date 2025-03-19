const Voluntario = require('../models/Voluntario');

const obtenerVoluntarios = (req, res) => {
    Voluntario.obtenerTodos((err, resultados) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(resultados);
    });
};

const obtenerVoluntarioPorId = (req, res) => {
    const { id } = req.params;
    Voluntario.obtenerPorId(id, (err, resultados) => {
        if (err) return res.status(500).json({ error: err.message });
        if (resultados.length === 0) return res.status(404).json({ mensaje: "Voluntario no encontrado" });
        res.json(resultados[0]);
    });
};

const crearVoluntario = (req, res) => {
    const { id_usuario, disponibilidad, habilidades, estado } = req.body;
    Voluntario.crear({ id_usuario, disponibilidad, habilidades, estado }, (err, resultado) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: "Voluntario creado", id: resultado.insertId });
    });
};

const actualizarVoluntario = (req, res) => {
    const { id } = req.params;
    const { disponibilidad, habilidades, estado } = req.body;
    Voluntario.actualizar(id, { disponibilidad, habilidades, estado }, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Voluntario actualizado" });
    });
};

const eliminarVoluntario = (req, res) => {
    const { id } = req.params;
    Voluntario.eliminar(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Voluntario eliminado" });
    });
};

module.exports = {
    obtenerVoluntarios,
    obtenerVoluntarioPorId,
    crearVoluntario,
    actualizarVoluntario,
    eliminarVoluntario
};
