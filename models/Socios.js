const mongoose = require("mongoose");
const { Schema } = mongoose;

const schemaSoc = new Schema({
    nombre_Soc: { type: String, required: true},
    apellidos_Soc: {type: String, required: true},
    ci_Soc: {type: String, required: true},
    numCelular_Soc: {type: String, required: true}
});

const model = mongoose.model('socios', schemaSoc);
module.exports = model;