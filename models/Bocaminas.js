const mongoose = require("mongoose");
const { Schema } = mongoose;

const schemaBoc = new Schema({
    nombre_Boc :{ type: String, required: true},
    lat_Boc: { type: String, required: true},
    long_Boc: {type: String, required: true},
    cota_Boc: {type: String, required: true},
    socios_Boc1: [{ type: Schema.Types.ObjectId, ref: 'socios', autopopulate: true}],
});

schemaBoc.plugin(require('mongoose-autopopulate'));

const model = mongoose.model('bocaminas', schemaBoc);
module.exports = model;