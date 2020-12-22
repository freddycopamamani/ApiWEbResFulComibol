const express = require("express");
const CooperativasController = require("../controllers/cooperativas");
const Coop_Schema = require('../validacionModels/cooperativa');
const validador = require('../middleware/validadorDatos');

const api = express.Router();

api.post("/cooperativa", validador(Coop_Schema), CooperativasController.crearCooperativa);
api.get("/cooperativa", CooperativasController.listaCooperativas);
api.put("/cooperativa/:_id", CooperativasController.actualizarCooperativa );
api.put("/cooperativa/asignarBocamina/:_id", CooperativasController.asignarBocamina);
api.put("/cooperativa/eliminarBocamina/:_id", CooperativasController.eliminarBocamina);
api.delete("/cooperativa/:_id", CooperativasController.eliminarCooperativa);


module.exports = api;