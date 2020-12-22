const Socios = require("../models/Socios");

module.exports = {
    listaSocios : async (req, res) => {
        const socios = await Socios.find();
        res.json(socios);
    },

    crearSocio : async (req, res) => {
        const { nombre_Soc, apellidos_Soc, ci_Soc, numCelular_Soc } = req.body;
        const nuevoSocio = new Socios({
            nombre_Soc,
            apellidos_Soc,
            ci_Soc,
            numCelular_Soc
        });
        await nuevoSocio.save();
        res.status(200).send({mensaje: "Socio creado correctamente."});
    },

    actualizarSocio : async (req, res) => {
        const { _id } = req.params;
        const dataSocio = req.body;
        await Socios.findByIdAndUpdate({_id: _id}, dataSocio );
        res.status(200).send({mensaje: "Socio actualizado correctamente."});

    },

    eliminarSocio : async(req, res) => {
        const { _id } = req.params;
        await Socios.findByIdAndRemove(_id)
        res.status(200).send({mensaje: "Socio eliminado correctamente"});
    }
}