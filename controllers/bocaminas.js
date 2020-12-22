const Bocaminas = require("../models/Bocaminas");

module.exports = {
    listaBocaminas : async (req, res) => {
        const bocaminas = await Bocaminas.find();
        res.json(bocaminas);
    },

    crearBocamina : async (req, res) => {
        const { nombre_Boc, lat_Boc, long_Boc, cota_Boc } = req.body;
        const nuevaBocamina = new Bocaminas({
            nombre_Boc,
            lat_Boc,
            long_Boc,
            cota_Boc,
        });
        await nuevaBocamina.save();
        res.send('Bocamina creado corectamente.');
    },

    actualizarBocamina : async (req, res) => {
        const { _id } = req.params;
        const dataBocamina = req.body;
        await Bocaminas.findByIdAndUpdate({_id: _id}, dataBocamina)
        res.status(200).send({mensaje: "Bocamina actualizado correctamente."});

    },

    eliminarBocamina : async(req, res) => {
        const { _id } = req.params;
        await Bocaminas.findByIdAndRemove(_id)
        res.send("Bocamina eliminado exitosamente.");
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