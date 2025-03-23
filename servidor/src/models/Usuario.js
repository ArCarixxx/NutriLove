const db = require('../config/db');

const Usuario = {
    obtenerTodos: (callback) => {
        db.query('SELECT * FROM Usuario', callback);
    },
    obtenerRolVoluntario: (callback) => {
        db.query('SELECT u.id_usuario, p.nombre, p.apellido, u.username FROM Usuario u INNER JOIN Persona p ON u.id_persona = p.id_persona WHERE rol = "Voluntario"', callback);
    },
    obtenerPorId: (id, callback) => {
        db.query('SELECT * FROM Usuario WHERE id_usuario = ?', [id], callback);
    },
    crear: (usuario, callback) => {
        const { id_persona, username, password, rol, estado } = usuario;
        db.query(
            'INSERT INTO Usuario (id_persona, username, password, rol, estado) VALUES (?, ?, ?, ?, ?)',
            [id_persona, username, password, rol, estado], callback
        );
    },
    actualizar: (id, usuario, callback) => {
        const { username, password, rol, estado } = usuario;
        db.query(
            'UPDATE Usuario SET username = ?, password = ?, rol = ?, estado = ? WHERE id_usuario = ?',
            [username, password, rol, estado, id], callback
        );
    },
    eliminar: (id, callback) => {
        db.query('DELETE FROM Usuario WHERE id_usuario = ?', [id], callback);
    },
    buscarPorUsername: (username, callback) => {
        const sql = 'SELECT * FROM Usuario WHERE username = ?';
        db.query(sql, [username], callback);
    }
};

module.exports = Usuario;
