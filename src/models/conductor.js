import { Schema, model } from 'mongoose';

const conductorSchema = new Schema({
  nombre_Con:{type:String, required: true,  maxlength:15},
  apellidos_Con: { type: String, required: true},
  nroLicencia_Con: { type: String, unique: true, required: true},
  categoria_Con: { type: String, required: true},
},
{
  timestamps: true,
  versionKey: false
}
);

const Conductor = model('conductor', conductorSchema);

export default Conductor;
