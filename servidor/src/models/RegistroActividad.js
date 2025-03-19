const db = require('../config/db');

const RegistroActividad = {
    obtenerTodos: (callback) => {
        db.query('SELECT * FROM Registro_Actividad', callback);
    },

    obtenerPorId: (id, callback) => {
        db.query('SELECT * FROM Registro_Actividad WHERE id_registro = ?', [id], callback);
    },

    crear: (nuevoRegistro, callback) => {
        const { id_asignacion, descripcion } = nuevoRegistro;
        const sql = 'INSERT INTO Registro_Actividad (id_asignacion, descripcion) VALUES (?, ?)';
        db.query(sql, [id_asignacion, descripcion], callback);
    },

    actualizar: (id, registroActualizado, callback) => {
        const { id_asignacion, descripcion } = registroActualizado;
        const sql = 'UPDATE Registro_Actividad SET id_asignacion = ?, descripcion = ? WHERE id_registro = ?';
        db.query(sql, [id_asignacion, descripcion, id], callback);
    },

    eliminar: (id, callback) => {
        db.query('DELETE FROM Registro_Actividad WHERE id_registro = ?', [id], callback);
    }
};

module.exports = RegistroActividad;
