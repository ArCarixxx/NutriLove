const db = require('../config/db');

const RegistroActividad = {
    obtenerTodos: (callback) => {
        db.query('SELECT * FROM Registro_Actividad', callback);
    },

    obtenerCompleto: (callback) => {
        db.query('SELECT ra.id_registro, p.nombre, p.apellido, u.username, t.titulo AS tarea, ra.fecha, ra.descripcion FROM Registro_Actividad ra JOIN Asignacion_Tarea at ON ra.id_asignacion = at.id_asignacion JOIN Tarea t ON at.id_tarea = t.id_tarea JOIN Voluntario v ON at.id_voluntario = v.id_voluntario JOIN Usuario u ON v.id_usuario = u.id_usuario JOIN Persona p ON u.id_persona = p.id_persona;', callback);
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
