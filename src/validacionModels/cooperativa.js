const Joi = require('@hapi/joi');

const schemaCoop = Joi.object({
    nombre_Coop: Joi.string().required(),
    direccion_Coop: Joi.string().required(),
    telefono_Coop: Joi.number().required(),
});

module.exports = schemaCoop;