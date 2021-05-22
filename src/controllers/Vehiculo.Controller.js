import models from '../models';

export default {
  addVehiculo: async (req, res, next) => {
    try {
      const {nroPlaca_Veh, poliza_Veh, clase_Veh, marca_Veh, color_Veh, capacidad_Veh, tipo_Veh, modelo_veh} = req.body;
      const nuevoVehiculo  = new models.Vehiculo({
        nroPlaca_Veh,
        poliza_Veh,
        clase_Veh,
        marca_Veh,
        color_Veh,
        capacidad_Veh,
        tipo_Veh, 
        modelo_veh,
      })

      await nuevoVehiculo.save();
      res.status(200).json({message: 'Vehiculo creado correctamente.'});
    } catch (error) {
      res.status(500).send({message: 'Ocurrio un error'});
      next(Error);
    }
  },
  queryVehiculo: async (req, res, next) => {
    try {
      const { id } = req.params;
      const vehiculoById = await models.Vehiculo.findById(id);
      if(!vehiculoById){
        res.status(404).send({message: 'No se ha encontrado ningun vehiculo.'});
      } else {
        res.status(200).json({vehiculoById})
      }
    } catch (error) {
      res.status(500).send({message: 'Ocurrio un error'});
      next(error);
    }
  },
  listVehiculo: async (req, res, next) => {
    try {
      const listVehiculo = await models.Vehiculo.find({})
      .sort({createdAt:-1})
      res.status(200).json({listVehiculo});
    } catch (error) {
      res.status(500).send({message: 'Ocurrio un error'});
      next(error);
    }
  },
  updateVehiculo: async (req, res, next) => {
    try {
      const { id } = req.params;
      const updateVehiculo = await models.Vehiculo.findByIdAndUpdate(id, req.body, {
      new: true
    })
    if(!updateVehiculo){
      res.status(404).send({message: 'No se ha encontrado al vehiculo'})
    } else {
      res.status(200).json({message: 'Vehiculo actualizado correctamente.'})
    }
    } catch (error) {
      res.status(500).send({message: 'Ocurrio un error'});
      next(error);
    }
  },
  removeVehiculo: async (req, res, next) => {
    try {
      const { id } = req.params;
      const vehiculoDeleted = await models.Vehiculo.findByIdAndDelete(id);
      if(!vehiculoDeleted) {
        res.status(404).send({message: 'No se ha encontrado ningun registro.'});
      } else {
        res.status(200).send({message: 'Vehiculo eliminado correctamente.'})
      }
    } catch (error) {
      res.status(500).send({message: 'Ocurrio un error'});
      next(error);
    }
  }
}
