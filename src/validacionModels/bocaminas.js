const Joi = require("@hapi/joi");

const schemaBoc = Joi.object({
    nombre_Boc: Joi.string().required(),
    lat_Boc: Joi.string(),
    long_Boc: Joi.string(),
    cota_Boc: Joi.string(),
});

module.exports = schemaBoc;