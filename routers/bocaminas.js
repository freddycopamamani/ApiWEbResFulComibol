const express = require("express");
const BocaminasController = require("../controllers/bocaminas");
const Boc_Schema = require('../validacionModels/bocaminas');
const validador = require('../middleware/validadorDatos');

const api = express.Router();

api.post("/bocamina", validador(Boc_Schema), BocaminasController.crearBocamina);
api.get("/bocamina", BocaminasController.listaBocaminas);
api.put("/bocamina/:_id", BocaminasController.actualizarBocamina );
api.put("/bocamina/asignarSocio/:_id", BocaminasController.asignarSocio);
api.put("/bocamina/eliminarSocio/:_id", BocaminasController.eliminarSocio);
api.delete("/bocamina/:_id", BocaminasController.eliminarBocamina);

module.exports = api;