const AsignacionTarea = require('../models/AsignacionTarea');

const obtenerAsignaciones = (req, res) => {
    AsignacionTarea.obtenerTodas((err, resultados) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(resultados);
    });
};
const obtenerAsignacionCompleto = (req, res) => {
    AsignacionTarea.obtenerAsignacionCompleto((err, resultados) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(resultados);
    });
};

const obtenerAsignacionPorId = (req, res) => {
    const { id } = req.params;
    AsignacionTarea.obtenerPorId(id, (err, resultados) => {
        if (err) return res.status(500).json({ error: err.message });
        if (resultados.length === 0) return res.status(404).json({ mensaje: "Asignación no encontrada" });
        res.json(resultados[0]);
    });
};

const crearAsignacion = (req, res) => {
    const { id_voluntario, id_tarea, fecha_inicio, fecha_fin, estado } = req.body;
    AsignacionTarea.crear({ id_voluntario, id_tarea, fecha_inicio, fecha_fin, estado }, (err, resultado) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: "Asignación creada", id: resultado.insertId });
    });
};

const actualizarAsignacion = (req, res) => {
    const { id } = req.params;
    const { id_voluntario, id_tarea, fecha_inicio, fecha_fin, estado } = req.body;
    AsignacionTarea.actualizar(id, { id_voluntario, id_tarea, fecha_inicio, fecha_fin, estado }, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Asignación actualizada" });
    });
};

const eliminarAsignacion = (req, res) => {
    const { id } = req.params;
    AsignacionTarea.eliminar(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Asignación eliminada" });
    });
};

module.exports = {
    obtenerAsignaciones,
    obtenerAsignacionCompleto,
    obtenerAsignacionPorId,
    crearAsignacion,
    actualizarAsignacion,
    eliminarAsignacion
};
