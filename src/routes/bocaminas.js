const express = require("express");
const BocaminasController = require("../controllers/bocaminas");
const Boc_Schema = require('../validacionModels/bocaminas');
const validador = require('../middleware/validadorDatos');

const api = express.Router();

api.post("/", BocaminasController.crearBocamina);
api.get("/", BocaminasController.listaBocaminas);
api.get("/:id", BocaminasController.getBocaminaById);
api.put("/:id", BocaminasController.actualizarBocamina );
api.put("/bocamina/asignarSocio/:_id", BocaminasController.asignarSocio);
api.put("/bocamina/eliminarSocio/:_id", BocaminasController.eliminarSocio);
api.delete("/:id", BocaminasController.eliminarBocamina);

module.exports = api;
