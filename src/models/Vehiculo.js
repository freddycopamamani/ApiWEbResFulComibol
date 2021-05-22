import { Schema, model } from 'mongoose';

const vehiculoSchema = new Schema({
  nroPlaca_Veh:{type:String, required: true, unique:true, maxlength:15},
  poliza_Veh: { type: Number, required: true},
  clase_Veh: { type: String, required: true},
  marca_Veh: { type: String, required: true},
  color_Veh: { type: String, required: true},
  capacidad_Veh : { type: String, required: true},
  tipo_Veh: {type:String, required: true},
  modelo_veh: {type: String, required: true}
},
{
  timestamps: true,
  versionKey: false
}
);

const Vehiculo = model('vehiculo', vehiculoSchema);

export default Vehiculo;
