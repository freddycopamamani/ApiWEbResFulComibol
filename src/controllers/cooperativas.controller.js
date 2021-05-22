/*const Cooperativas = require("../models/Cooperativa");

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
}*/
import Cooperativas from '../models/Cooperativa';

export const createCooperativa  = async(req, res) => {
    const { nombre_Coop, direccion_Coop, telefono_Coop, razonSocial_Coop } = req.body;
    const nuevaCooperativa = new Cooperativas({
        nombre_Coop,
        direccion_Coop,
        telefono_Coop,
        razonSocial_Coop
    })
    await nuevaCooperativa.save();
    res.status(200).send({message: "Cooperativa creado correctamente."});
}

export const getCooperativas  = async(req, res) => {
    const listaCoop = await Cooperativas.find();
    res.status(200).send({ listaCoop });
}

export const getCooperativaById  = async(req, res) => {
    const { id } = req.params;
    const CoopById = await Cooperativas.findById(id)
    res.status(200).json({CoopById});
}

export const updateCooperativaById  = async(req, res) => {
    const {id } = req.params;
    await Cooperativas.findByIdAndUpdate(id, req.body, {
        new:true
    })
    res.status(200).send({message: "Cooperativa actualizado correctamente."});
}
export const deleteCooperativaById  = async(req, res) => {
    const { _id } = req.params;
    await Cooperativas.findByIdAndDelete(_id);
    res.status(200).send({message : "Cooperativa eliminado correctamente."});
}

export const AsignarBocamina = async (req, res) => {
  const { id } = req.params;
  const { bocamina } = req.body;
  const coopUpdate = await Cooperativas.findByIdAndUpdate(id, {
    $push: { bocaminas_Coop: bocamina}
  });
  res.send(`${coopUpdate.nombre_Coop} updated`);
}

export const EliminarBocDeCoop = async (req, res) => {
  const { id } = req.params;
  const { bocamina } = req.body;
  const coopUpdate = await Cooperativas.findByIdAndUpdate(id, {
    $pull: { bocaminas_Coop: bocamina}
  });
  res.send(`${coopUpdate.nombre_Coop} updated`);
}
