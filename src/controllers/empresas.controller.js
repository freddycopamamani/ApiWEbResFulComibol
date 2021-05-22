import models from '../models';

export default {
  addEmpresa: async (req, res, next) => {
    try {
      const {
        nombreComercial_Emp, 
        nroMatricula_Emp, 
        ciudad_Emp, 
        tipoDeSociedad_Emp, 
        representanteLegal_Emp, 
        ciRepresentanteLegal_Emp,
        direccion_Emp
      } = req.body;
      const nuevaEmpresa  = new models.Empresa({
        nombreComercial_Emp,
        nroMatricula_Emp,
        ciudad_Emp,
        tipoDeSociedad_Emp,
        representanteLegal_Emp,
        ciRepresentanteLegal_Emp,
        direccion_Emp
      })

      await nuevaEmpresa.save();
      res.status(200).json({message: 'Empresa creado correctamente.'});
    } catch (error) {
      res.status(500).send({message: 'Ocurrio un error'});
      next(Error);
    }
  },
  queryEmpresa: async (req, res, next) => {
    try {
      const { id } = req.params;
      const EmpresaById = await models.Empresa.findById(id);
      if(!EmpresaById){
        res.status(404).send({message: 'No se ha encontrado ninguna empresa.'});
      } else {
        res.status(200).json({EmpresaById})
      }
    } catch (error) {
      res.status(500).send({message: 'Ocurrio un error'});
      next(error);
    }
  },
  listEmpresa: async (req, res, next) => {
    try {
      const listEmpresas = await models.Empresa.find({})
      .sort({createdAt:-1})
      res.status(200).json({listEmpresas});
    } catch (error) {
      res.status(500).send({message: 'Ocurrio un error'});
      next(error);
    }
  },
  updateEmpresa: async (req, res, next) => {
    try {
      const { id } = req.params;
      const empresaUpdated = await models.Empresa.findByIdAndUpdate(id, req.body, {
      new: true
    })
    if(!empresaUpdated){
      res.status(404).send({message: 'No se ha encontrado a la empresa.'})
    } else {
      res.status(200).json({message: 'Empresa actualizado correctamente.'})
    }
    } catch (error) {
      res.status(500).send({message: 'Ocurrio un error'});
      next(error);
    }
  },
  removeEmpresa: async (req, res, next) => {
    try {
      const { id } = req.params;
      const empresaDeleted = await models.Empresa.findByIdAndDelete(id);
      if(!empresaDeleted) {
        res.status(404).send({message: 'No se ha encontrado ningun registro.'});
      } else {
        res.status(200).send({message: 'Empresa eliminado correctamente.'});
      }
    } catch (error) {
      res.status(500).send({message: 'Ocurrio un error'});
      next(error);
    }
  }
}
