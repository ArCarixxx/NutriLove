const db = require('../config/db');

const AsignacionTarea = {
    obtenerTodas: (callback) => {
        db.query('SELECT * FROM Asignacion_Tarea', callback);
    },
    obtenerAsignacionCompleto: (callback) => {
        const sql = `
            SELECT a.id_asignacion, a.id_voluntario, p.nombre, p.apellido, a.id_tarea, t.titulo, a.fecha_asignacion, a.fecha_inicio, a.fecha_fin, a.estado 
            FROM Asignacion_Tarea a
            INNER JOIN Voluntario v ON v.id_voluntario = a.id_voluntario
            INNER JOIN Tarea t ON t.id_tarea = a.id_tarea
            INNER JOIN Usuario u ON v.id_usuario = u.id_usuario
            INNER JOIN Persona p ON u.id_persona = p.id_persona
        `;
        db.query(sql, callback);
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
