const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

const obtenerUsuarios = (req, res) => {
    Usuario.obtenerTodos((err, resultados) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(resultados);
    });
};

const obtenerUsuarioPorId = (req, res) => {
    const { id } = req.params;
    Usuario.obtenerPorId(id, (err, resultados) => {
        if (err) return res.status(500).json({ error: err.message });
        if (resultados.length === 0) return res.status(404).json({ mensaje: "Usuario no encontrado" });
        res.json(resultados[0]);
    });
};

const crearUsuario = (req, res) => {
    const { id_persona, username, password, rol, estado } = req.body;
    Usuario.crear({ id_persona, username, password, rol, estado }, (err, resultado) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ mensaje: "Usuario creado", id: resultado.insertId });
    });
};

const actualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { username, password, rol, estado } = req.body;
    Usuario.actualizar(id, { username, password, rol, estado }, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Usuario actualizado" });
    });
};

const eliminarUsuario = (req, res) => {
    const { id } = req.params;
    Usuario.eliminar(id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: "Usuario eliminado" });
    });
};

const login = (req, res) => {
    const { username, password } = req.body;

    console.log("Datos recibidos:", req.body); // 📌 Verifica lo que llega en el request

    Usuario.buscarPorUsername(username, (err, resultados) => {
        if (err) return res.status(500).json({ error: err.message });

        console.log("Resultados de la consulta:", resultados); // 📌 Muestra lo que devuelve la BD

        if (resultados.length === 0) {
            return res.status(401).json({ mensaje: "Usuario no encontrado" });
        }

        const usuario = resultados[0];

        if (password !== usuario.password) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id_usuario: usuario.id_usuario, rol: usuario.rol }, 'secreto', { expiresIn: '1h' });

        res.json({ mensaje: "Login exitoso", usuario, token });

    });
};


module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    login
};
