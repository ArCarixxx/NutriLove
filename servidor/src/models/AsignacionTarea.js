const db = require('../config/db');

const AsignacionTarea = {
    obtenerTodas: (callback) => {
        db.query('SELECT * FROM Asignacion_Tarea', callback);
    },

    obtenerPorId: (id, callback) => {
        db.query('SELECT * FROM Asignacion_Tarea WHERE id_asignacion = ?', [id], callback);
    },

    crear: (nuevaAsignacion, callback) => {
        const { id_voluntario, id_tarea, fecha_inicio, fecha_fin, estado } = nuevaAsignacion;
        const sql = 'INSERT INTO Asignacion_Tarea (id_voluntario, id_tarea, fecha_inicio, fecha_fin, estado) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [id_voluntario, id_tarea, fecha_inicio, fecha_fin, estado], callback);
    },

    actualizar: (id, asignacionActualizada, callback) => {
        const { id_voluntario, id_tarea, fecha_inicio, fecha_fin, estado } = asignacionActualizada;
        const sql = 'UPDATE Asignacion_Tarea SET id_voluntario = ?, id_tarea = ?, fecha_inicio = ?, fecha_fin = ?, estado = ? WHERE id_asignacion = ?';
        db.query(sql, [id_voluntario, id_tarea, fecha_inicio, fecha_fin, estado, id], callback);
    },

    eliminar: (id, callback) => {
        db.query('DELETE FROM Asignacion_Tarea WHERE id_asignacion = ?', [id], callback);
    }
};

module.exports = AsignacionTarea;
