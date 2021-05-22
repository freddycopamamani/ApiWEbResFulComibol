const express = require("express");
const SociosController = require("../controllers/socios");
const Soc_Schema = require('../validacionModels/socios');
const validador = require('../middleware/validadorDatos');

const api = express.Router();

api.post("/",  SociosController.crearSocio);
api.get("/", SociosController.listaSocios);
api.get("/:id", SociosController.getSocioById);
api.put("/:id", SociosController.actualizarSocio );
api.delete("/:id", SociosController.eliminarSocio);

module.exports = api;
