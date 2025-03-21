const express = require("express");
const router = express.Router();
const VoluntarioController = require("../controllers/voluntarioController");

router.get("/", VoluntarioController.obtenerVoluntarios);
router.get("/completo", VoluntarioController.obtenerVoluntariosCompleto);
router.get("/:id", VoluntarioController.obtenerVoluntarioPorId);
router.post("/", VoluntarioController.crearVoluntario);
router.put("/:id", VoluntarioController.actualizarVoluntario);
router.delete("/:id", VoluntarioController.eliminarVoluntario);

module.exports = router;
