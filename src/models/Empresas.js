import { Schema, model } from 'mongoose';

const empresaSchema = new Schema({
  nombreComercial_Emp:{ type:String, required: true,  maxlength:255},
  nroMatricula_Emp: { type: String, required: true},
  ciudad_Emp: { type: String, required: true},
  tipoDeSociedad_Emp: String,
  representanteLegal_Emp: { type: String, required: true},
  ciRepresentanteLegal_Emp: { type: String, required: true},
  direccion_Emp:{ type: String, required: true}
},
{
  timestamps: true,
  versionKey: false
}
);

const Empresa = model('empresa', empresaSchema);

export default Empresa;
