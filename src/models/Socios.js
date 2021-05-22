const mongoose = require("mongoose");
const { Schema } = mongoose;

const schemaSoc = new Schema({
    bocamina: { type: Schema.Types.ObjectId, ref: 'bocaminas'},
    nombre_Soc: { type: String, required: true},
    apellidos_Soc: {type: String, required: true},
    ci_Soc: {type: String, required: true},
    numCelular_Soc: {type: String, required: true}
});

schemaSoc.plugin(require('mongoose-autopopulate'));
const model = mongoose.model('socios', schemaSoc);
module.exports = model;
