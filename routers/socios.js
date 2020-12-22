const express = require("express");
const SociosController = require("../controllers/socios");
const Soc_Schema = require('../validacionModels/socios');
const validador = require('../middleware/validadorDatos');

const api = express.Router();

api.post("/socio", validador(Soc_Schema), SociosController.crearSocio);
api.get("/socio", SociosController.listaSocios);
api.put("/socio/:_id", SociosController.actualizarSocio );
api.delete("/socio/:_id", SociosController.eliminarSocio);

module.exports = api;