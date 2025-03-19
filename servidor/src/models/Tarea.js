const db = require('../config/db');

const Tarea = {
    obtenerTodas: (callback) => {
        db.query('SELECT * FROM Tarea', callback);
    },

    obtenerPorId: (id, callback) => {
        db.query('SELECT * FROM Tarea WHERE id_tarea = ?', [id], callback);
    },

    crear: (nuevaTarea, callback) => {
        const { titulo, descripcion, fecha_limite, estado } = nuevaTarea;
        const sql = 'INSERT INTO Tarea (titulo, descripcion, fecha_limite, estado) VALUES (?, ?, ?, ?)';
        db.query(sql, [titulo, descripcion, fecha_limite, estado], callback);
    },

    actualizar: (id, tareaActualizada, callback) => {
        const { titulo, descripcion, fecha_limite, estado } = tareaActualizada;
        const sql = 'UPDATE Tarea SET titulo = ?, descripcion = ?, fecha_limite = ?, estado = ? WHERE id_tarea = ?';
        db.query(sql, [titulo, descripcion, fecha_limite, estado, id], callback);
    },

    eliminar: (id, callback) => {
        db.query('DELETE FROM Tarea WHERE id_tarea = ?', [id], callback);
    }
};

module.exports = Tarea;
