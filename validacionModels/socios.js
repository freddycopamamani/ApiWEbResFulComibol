const Joi = require("@hapi/joi");

const schemaSoc = Joi.object({
    nombre_Soc: Joi.string().required(),
    apellidos_Soc: Joi.string().required(),
    ci_Soc: Joi.string().required(),
    numCelular_Soc: Joi.string().required()
});

module.exports = schemaSoc;