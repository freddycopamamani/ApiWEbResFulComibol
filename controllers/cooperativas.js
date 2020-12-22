const Cooperativas = require("../models/Cooperativa");

module.exports = {
    listaCooperativas : async (req, res) => {
        const cooperativas = await Cooperativas.find();
        res.json(cooperativas);
    },

    crearCooperativa : async (req, res) => {
        const { nombre_Coop, direccion_Coop, telefono_Coop } = req.body;
        const nuevaCooperativa = new Cooperativas({
            nombre_Coop,
            direccion_Coop,
            telefono_Coop
        });
        await nuevaCooperativa.save();
        res.status(200).send({mensaje: "Cooperativa creado correctamente"});
    },

    actualizarCooperativa : async (req, res) => {
        const { _id } = req.params;
        const dataCooperativa = req.body;
        await Cooperativas.findByIdAndUpdate({_id: _id}, dataCooperativa );
        res.status(200).send('Cooperativa actualizado correctamente');

    },

    eliminarCooperativa : async(req, res) => {
        const { _id } = req.params;
        const remove = await Cooperativas.findByIdAndRemove(_id)
        res.send("Cooperativa eliminado exitosamente");
    },

    asignarBocamina : async (req, res) => {
        const { _id } = req.params;
        const { bocamina } = req.body;
        const coopActualizado = await Cooperativas.findByIdAndUpdate({_id :_id}, {$push: {bocaminas_Coop: bocamina }});

        res.send(`${coopActualizado.nombre_Coop} actualizado`);
    },

    eliminarBocamina : async (req, res) => {
        const { _id } = req.params;
        const { bocamina } = req.body;
        const coopActualizado = await Cooperativas.findByIdAndUpdate({_id :_id}, {$pull: {bocaminas_Coop: bocamina }});

        res.send(`${coopActualizado.nombre_Coop} actualizado`);
    }
}