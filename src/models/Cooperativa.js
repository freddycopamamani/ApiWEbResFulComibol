/*const mongoose = require("mongoose");
const { Schema } = mongoose;

const schemaCoop = new Schema({
    nombre_Coop :{ type: String, required: true},
    direccion_Coop: { type: String, required: true},
    telefono_Coop: {type: String, required: true},
    bocaminas_Coop: [{ type: Schema.Types.ObjectId, ref: 'bocaminas', autopopulate: true}],
});

schemaCoop.plugin(require('mongoose-autopopulate'));

const model = mongoose.model('Cooperativas', schemaCoop);
module.exports = model;*/

import { Schema, model} from 'mongoose';

const schemaCoop =  new Schema({
    nombre_Coop :{ type: String, required: true},
    direccion_Coop: { type: String, required: true},
    telefono_Coop: {type: String, required: true},
    bocaminas_Coop: [{ type: Schema.Types.ObjectId, ref: 'bocaminas', autopopulate: true}],
},
{
    timestamps: true,
    versionKey: false
});

export default model('cooperativas', schemaCoop);