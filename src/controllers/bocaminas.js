const Bocaminas = require("../models/Bocaminas");

module.exports = {
    listaBocaminas : async (req, res) => {
        const bocaminas = await Bocaminas.find().populate('cooperativa', {nombre_Coop:1});
        res.json({ bocaminas });
    },

    getBocaminaById  : async(req, res) => {
      const { id } = req.params;
      const BocById = await Bocaminas.findById(id)
      res.status(200).json({BocById});
    },

    crearBocamina : async (req, res) => {
        const { cooperativa, nombre_Boc, lat_Boc, long_Boc, cota_Boc } = req.body;
        const nuevaBocamina = new Bocaminas({
            cooperativa,
            nombre_Boc,
            lat_Boc,
            long_Boc,
            cota_Boc,
        });
        await nuevaBocamina.save();
        res.status(200).send({message: 'Bocamina creado corectamente.'});
    },

    actualizarBocamina : async (req, res) => {
      const { id } = req.params;
      await Bocaminas.findByIdAndUpdate(id, req.body, {
          new:true
      })
      res.status(200).send({message: "Bocamina actualizado correctamente."});

    },

    eliminarBocamina : async(req, res) => {
        const { id } = req.params;
        await Bocaminas.findByIdAndRemove(id)
        res.status(200).send({message: "Bocamina eliminado exitosamente."});
    },

    asignarSocio : async (req, res) => {
        const { _id } = req.params;
        const { socio } = req.body;
        const socActualizado = await Bocaminas.findByIdAndUpdate({_id :_id}, {$push: {socios_Boc1: socio }});

        res.send(`${socActualizado.nombre_Boc} actualizado`);
    },

    eliminarSocio : async (req, res) => {
        const { _id } = req.params;
        const { socio } = req.body; 
        const socActualizado = await Bocaminas.findByIdAndUpdate({_id :_id}, {$pull: {socios_Boc1: socio }});

        res.send(`${socActualizado.nombre_Boc} actualizado`);
    }
}
