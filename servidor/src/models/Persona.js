const db = require('../config/db');

const Persona = {
    obtenerTodas: (callback) => {
        db.query('SELECT * FROM Persona', callback);
    },
    obtenerPorId: (id, callback) => {
        db.query('SELECT * FROM Persona WHERE id_persona = ?', [id], callback);
    },
    crear: (persona, callback) => {
        const { nombre, apellido, correo, telefono, direccion, fecha_nacimiento } = persona;
        db.query(
            'INSERT INTO Persona (nombre, apellido, correo, telefono, direccion, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, apellido, correo, telefono, direccion, fecha_nacimiento], callback
        );
    },
    actualizar: (id, persona, callback) => {
        const { nombre, apellido, correo, telefono, direccion, fecha_nacimiento } = persona;
        db.query(
            'UPDATE Persona SET nombre = ?, apellido = ?, correo = ?, telefono = ?, direccion = ?, fecha_nacimiento = ? WHERE id_persona = ?',
            [nombre, apellido, correo, telefono, direccion, fecha_nacimiento, id], callback
        );
    },
    eliminar: (id, callback) => {
        db.query('DELETE FROM Persona WHERE id_persona = ?', [id], callback);
    }
};

module.exports = Persona;
