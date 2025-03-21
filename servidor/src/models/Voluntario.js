const db = require("../config/db");
const { obtenerTodos } = require("./Usuario");

const Voluntario = {
    obtenerVoluntarioCompleto: (callback) => {
        const sql = `
            SELECT v.id_voluntario, v.id_usuario, p.nombre, p.apellido, v.disponibilidad, v.habilidades, v.estado
            FROM Voluntario v
            INNER JOIN Usuario u ON v.id_usuario = u.id_usuario
            INNER JOIN Persona p ON u.id_persona = p.id_persona
        `;
        db.query(sql, callback);
    },
    obtenerTodos    : (callback) => {
        db.query('SELECT * FROM Voluntario', callback);
    },
    obtenerPorId: (id, callback) => {
        const sql = `
            SELECT v.id_voluntario, v.id_usuario, p.nombre, p.apellido, v.disponibilidad, v.habilidades, v.estado
            FROM Voluntario v
            INNER JOIN Usuario u ON v.id_usuario = u.id_usuario
            INNER JOIN Persona p ON u.id_persona = p.id_persona
            WHERE v.id_voluntario = ?
        `;
        db.query(sql, [id], callback);
    },

    crear: (nuevoVoluntario, callback) => {
        const { id_usuario, disponibilidad, habilidades, estado } = nuevoVoluntario;
        const sql = `
            INSERT INTO Voluntario (id_usuario, disponibilidad, habilidades, estado)
            VALUES (?, ?, ?, ?)
        `;
        db.query(sql, [id_usuario, disponibilidad, habilidades, estado], callback);
    },

    actualizar: (id, voluntarioActualizado, callback) => {
        const { disponibilidad, habilidades, estado } = voluntarioActualizado;
        const sql = `
            UPDATE Voluntario
            SET disponibilidad = ?, habilidades = ?, estado = ?
            WHERE id_voluntario = ?
        `;
        db.query(sql, [disponibilidad, habilidades, estado, id], callback);
    },

    eliminar: (id, callback) => {
        db.query("DELETE FROM Voluntario WHERE id_voluntario = ?", [id], callback);
    },
};

module.exports = Voluntario;
