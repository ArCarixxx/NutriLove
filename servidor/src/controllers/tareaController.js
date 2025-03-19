const Tarea = require('../models/Tarea');

const obtenerTareas = (req, res) => {
    Tarea.obtenerTodas((err, resultados) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(resultados);
    });
};

const obtenerTareaPorId = (req, res) => {
    const { id } = req.params;
    Tarea.obtenerPorId(id, (err, resultados) => {
        if (err) return res.status(500).json({ error: err.message });
        if (resultados.length === 0) return res.status(404).json({ mensaje: "Tarea no encontrada" });
        res.json(resultados[0]);
    });
};

const crearTarea = (req, res) => {
    const { titulo, descripcion, fecha_limite, estado } = req.body;
    Tarea.crear({ titulo, descripcion, fecha_limite, estado }, (err, resultado) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: "Tarea creada", id: resultado.insertId });
    });
};

const actualizarTarea = (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, fecha_limite, estado } = req.body;
    Tarea.actualizar(id, { titulo, descripcion, fecha_limite, estado }, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Tarea actualizada" });
    });
};

const eliminarTarea = (req, res) => {
    const { id } = req.params;
    Tarea.eliminar(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Tarea eliminada" });
    });
};

module.exports = {
    obtenerTareas,
    obtenerTareaPorId,
    crearTarea,
    actualizarTarea,
    eliminarTarea
};
