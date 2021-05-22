const Socios = require("../models/Socios");

module.exports = {
    listaSocios : async (req, res) => {
        const socios = await Socios.find().populate('bocamina', {nombre_Boc:1});
        res.json({socios});
    },

    getSocioById  : async(req, res) => {
      const { id } = req.params;
      const SocById = await Socios.findById(id).populate('bocamina', {nombre_Boc:1});
      res.status(200).json({SocById});
    },

    crearSocio : async (req, res) => {
        const { bocamina, nombre_Soc, apellidos_Soc, ci_Soc, numCelular_Soc } = req.body;
        const nuevoSocio = new Socios({
            bocamina,
            nombre_Soc,
            apellidos_Soc,
            ci_Soc,
            numCelular_Soc
        });
        await nuevoSocio.save();
        res.status(200).send({message: "Socio creado correctamente."});
    },

    actualizarSocio : async (req, res) => {
        const { id } = req.params;
        await Socios.findByIdAndUpdate(id, req.body, {
          new:true
        })
        res.status(200).send({message: "Socio actualizado correctamente."});

    },

    eliminarSocio : async(req, res) => {
        const { id } = req.params;
        await Socios.findByIdAndRemove(id)
        res.status(200).send({message: "Socio eliminado correctamente."});
    }
}
