import models from '../models';

export default {
  addConductor: async (req, res, next) => {
    try {
      const {nombre_Con, apellidos_Con, nroLicencia_Con, categoria_Con} = req.body;
      const nuevoConductor  = new models.Conductor({
        nombre_Con,
        apellidos_Con,
        nroLicencia_Con,
        categoria_Con
      })

      await nuevoConductor.save();
      res.status(200).json({message: 'Conductor creado correctamente.'});
    } catch (error) {
      res.status(500).send({message: 'Ocurrio un error'});
      next(Error);
    }
  },
  queryConductor: async (req, res, next) => {
    try {
      const { id } = req.params;
      const conductorById = await models.Conductor.findById(id);
      if(!conductorById){
        res.status(404).send({message: 'No se ha encontrado ningun conductor.'});
      } else {
        res.status(200).json({conductorById})
      }
    } catch (error) {
      res.status(500).send({message: 'Ocurrio un error'});
      next(error);
    }
  },
  listConductor: async (req, res, next) => {
    try {
      const listConductores = await models.Conductor.find({})
      .sort({createdAt:-1})
      res.status(200).json({listConductores});
    } catch (error) {
      res.status(500).send({message: 'Ocurrio un error'});
      next(error);
    }
  },
  updateConductor: async (req, res, next) => {
    try {
      const { id } = req.params;
      const conductorUpdate = await models.Conductor.findByIdAndUpdate(id, req.body, {
      new: true
    })
    if(!conductorUpdate){
      res.status(404).send({message: 'No se ha encontrado al conductor.'})
    } else {
      res.status(200).json({message: 'Conductor actualizado correctamente.'})
    }
    } catch (error) {
      res.status(500).send({message: 'Ocurrio un error'});
      next(error);
    }
  },
  removeConductor: async (req, res, next) => {
    try {
      const { id } = req.params;
      const conductorDeleted = await models.Conductor.findByIdAndDelete(id);
      if(!conductorDeleted) {
        res.status(404).send({message: 'No se ha encontrado ningun registro.'});
      } else {
        res.status(200).send({message: 'Conductor eliminado correctamente.'});
      }
    } catch (error) {
      res.status(500).send({message: 'Ocurrio un error'});
      next(error);
    }
  }
}
