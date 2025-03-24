const RegistroActividad = require('../models/RegistroActividad');

const obtenerRegistros = (req, res) => {
    RegistroActividad.obtenerTodos((err, resultados) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(resultados);
    });
};
const obtenerRegistroCompleto = (req, res) => {
    RegistroActividad.obtenerCompleto((err, resultados) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(resultados);
    });
};

const obtenerRegistroPorId = (req, res) => {
    const { id } = req.params;
    RegistroActividad.obtenerPorId(id, (err, resultados) => {
        if (err) return res.status(500).json({ error: err.message });
        if (resultados.length === 0) return res.status(404).json({ mensaje: "Registro no encontrado" });
        res.json(resultados[0]);
    });
};

const crearRegistro = (req, res) => {
    const { id_asignacion, descripcion } = req.body;
    RegistroActividad.crear({ id_asignacion, descripcion }, (err, resultado) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: "Registro creado", id: resultado.insertId });
    });
};

const actualizarRegistro = (req, res) => {
    const { id } = req.params;
    const { id_asignacion, descripcion } = req.body;
    RegistroActividad.actualizar(id, { id_asignacion, descripcion }, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Registro actualizado" });
    });
};

const eliminarRegistro = (req, res) => {
    const { id } = req.params;
    RegistroActividad.eliminar(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Registro eliminado" });
    });
};

module.exports = {
    obtenerRegistros,
    obtenerRegistroCompleto,
    obtenerRegistroPorId,
    crearRegistro,
    actualizarRegistro,
    eliminarRegistro
};
