const db = require('../config/db');

const Persona = {
    obtenerTodas: (callback) => {
        db.query('SELECT * FROM Persona', callback);
    },
    obtenerPersonaUSuario: (callback) => {
        db.query('SELECT p.id_persona, p.nombre, p.apellido, p.correo, p.telefono, p.direccion, p.fecha_nacimiento, u.username, u.rol FROM Persona p LEFT JOIN Usuario u ON p.id_persona = u.id_persona;', callback)
    },
    obtenerPorId: (id, callback) => {
        db.query('SELECT * FROM Persona WHERE id_persona = ?', [id], callback);
    },
    crear: (persona, callback) => {
        const { nombre, apellido, correo, telefono, direccion, fecha_nacimiento, rol } = persona;
    
        // Iniciar transacción
        db.beginTransaction((err) => {
            if (err) return callback(err);
    
            // Insertar en la tabla Persona
            db.query(
                'INSERT INTO Persona (nombre, apellido, correo, telefono, direccion, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?)',
                [nombre, apellido, correo, telefono, direccion, fecha_nacimiento],
                (error, results) => {
                    if (error) {
                        return db.rollback(() => callback(error));
                    }
    
                    const id_persona = results.insertId;
                    const username = `${nombre.charAt(0)}${apellido}`.toLowerCase();
                    const yearNacimiento = new Date(fecha_nacimiento).getFullYear();
                    const password = `${nombre}${yearNacimiento}`;
                    const estado = 'Activo'
    
                    // Insertar en la tabla Usuario
                    db.query(
                        'INSERT INTO Usuario (id_persona, username, password, rol, estado) VALUES (?, ?, ?, ?, ?)',
                        [id_persona, username, password, rol, estado],
                        (error2) => {
                            if (error2) {
                                return db.rollback(() => callback(error2));
                            }
    
                            // Confirmar transacción
                            db.commit((errCommit) => {
                                if (errCommit) {
                                    return db.rollback(() => callback(errCommit));
                                }
                                callback(null, { id_persona, username });
                            });
                        }
                    );
                }
            );
        });
    },   
    
    crearVoluntario: (persona, callback) => {
        const { nombre, apellido, correo, telefono, direccion, fecha_nacimiento, rol, disponibilidad, habilidades } = persona;
    
        // Iniciar transacción
        db.beginTransaction((err) => {
            if (err) return callback(err);
    
            // Insertar en la tabla Persona
            db.query(
                'INSERT INTO Persona (nombre, apellido, correo, telefono, direccion, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?)',
                [nombre, apellido, correo, telefono, direccion, fecha_nacimiento],
                (error, results) => {
                    if (error) {
                        return db.rollback(() => callback(error));
                    }
    
                    const id_persona = results.insertId;
                    const username = `${nombre.charAt(0)}${apellido}`.toLowerCase();
                    const yearNacimiento = new Date(fecha_nacimiento).getFullYear();
                    const password = `${nombre}${yearNacimiento}`;
                    const estado = 'Activo';
    
                    // Insertar en la tabla Usuario
                    db.query(
                        'INSERT INTO Usuario (id_persona, username, password, rol, estado) VALUES (?, ?, ?, ?, ?)',
                        [id_persona, username, password, rol, estado],
                        (error2, userResults) => {
                            if (error2) {
                                return db.rollback(() => callback(error2));
                            }
    
                            const id_usuario = userResults.insertId;
    
                            // Insertar en la tabla Voluntario
                            db.query(
                                'INSERT INTO Voluntario (id_usuario, disponibilidad, habilidades, estado) VALUES (?, ?, ?, ?)',
                                [id_usuario, disponibilidad, habilidades, estado],
                                (error3) => {
                                    if (error3) {
                                        return db.rollback(() => callback(error3));
                                    }
    
                                    // Confirmar transacción
                                    db.commit((errCommit) => {
                                        if (errCommit) {
                                            return db.rollback(() => callback(errCommit));
                                        }
                                        callback(null, { id_persona, username, id_usuario });
                                    });
                                }
                            );
                        }
                    );
                }
            );
        });
    },
    
    actualizar: (id, persona, callback) => {
        const { nombre, apellido, correo, telefono, direccion, fecha_nacimiento, rol, estado } = persona;
    
        // Iniciar transacción
        db.beginTransaction((err) => {
            if (err) {
                console.error("Error al iniciar transacción:", err);
                return callback(err);
            }
    
            console.log("Iniciando actualización para id_persona:", id);
    
            // Actualizar la tabla Persona
            db.query(
                `UPDATE Persona 
                 SET nombre = ?, apellido = ?, correo = ?, telefono = ?, direccion = ?, fecha_nacimiento = ? 
                 WHERE id_persona = ?`,
                [nombre, apellido, correo, telefono, direccion, fecha_nacimiento, id],
                (errorPersona, resultsPersona) => {
                    if (errorPersona) {
                        console.error("Error al actualizar Persona:", errorPersona);
                        return db.rollback(() => callback(errorPersona));
                    }
    
                    console.log("Resultado de actualización en Persona:", resultsPersona);
    
                    // Si no se actualizó ninguna fila, devolvemos error
                    if (resultsPersona.affectedRows === 0) {
                        console.warn("No se encontró la persona con ID:", id);
                        return db.rollback(() => callback(new Error("No se encontró la persona con ese ID")));
                    }
    
                    // Generar nuevo username y password
                    const username = `${nombre.charAt(0)}${apellido}`.toLowerCase();
                    const yearNacimiento = new Date(fecha_nacimiento).getFullYear();
                    const password = `${nombre}${yearNacimiento}`;
    
                    console.log("Nuevo username:", username, "Nueva contraseña:", password);
    
                    // Actualizar la tabla Usuario
                    db.query(
                        `UPDATE Usuario 
                         SET username = ?, password = ?, rol = ?, estado = ? 
                         WHERE id_persona = ?`,
                        [username, password, rol, estado, id],
                        (errorUsuario, resultsUsuario) => {
                            if (errorUsuario) {
                                console.error("Error al actualizar Usuario:", errorUsuario);
                                return db.rollback(() => callback(errorUsuario));
                            }
    
                            console.log("Resultado de actualización en Usuario:", resultsUsuario);
    
                            if (resultsUsuario.affectedRows === 0) {
                                console.warn("No se encontró el usuario para id_persona:", id);
                                return db.rollback(() => callback(new Error("No se encontró el usuario con ese ID")));
                            }
    
                            // Confirmar transacción
                            db.commit((errCommit) => {
                                if (errCommit) {
                                    console.error("Error al confirmar transacción:", errCommit);
                                    return db.rollback(() => callback(errCommit));
                                }
                                console.log("Actualización exitosa para id_persona:", id);
                                callback(null, { id_persona: id, username });
                            });
                        }
                    );
                }
            );
        });
    },
    
    eliminar: (id, callback) => {
        db.query('DELETE FROM Persona WHERE id_persona = ?', [id], callback);
    }
};

module.exports = Persona;
