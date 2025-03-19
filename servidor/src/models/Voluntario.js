const db = require('../config/db');

const Voluntario = {
    obtenerTodos: (callback) => {
        db.query('SELECT * FROM Voluntario', callback);
    },

    obtenerPorId: (id, callback) => {
        db.query('SELECT * FROM Voluntario WHERE id_voluntario = ?', [id], callback);
    },

    crear: (nuevoVoluntario, callback) => {
        const { id_usuario, disponibilidad, habilidades, estado } = nuevoVoluntario;
        const sql = 'INSERT INTO Voluntario (id_usuario, disponibilidad, habilidades, estado) VALUES (?, ?, ?, ?)';
        db.query(sql, [id_usuario, disponibilidad, habilidades, estado], callback);
    },

    actualizar: (id, voluntarioActualizado, callback) => {
        const { disponibilidad, habilidades, estado } = voluntarioActualizado;
        const sql = 'UPDATE Voluntario SET disponibilidad = ?, habilidades = ?, estado = ? WHERE id_voluntario = ?';
        db.query(sql, [disponibilidad, habilidades, estado, id], callback);
    },

    eliminar: (id, callback) => {
        db.query('DELETE FROM Voluntario WHERE id_voluntario = ?', [id], callback);
    }
};

module.exports = Voluntario;
