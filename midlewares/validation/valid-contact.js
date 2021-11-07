const Joi = require('joi')

const schemaJoi = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),

  phone: Joi.string().required(),

  favorite: Joi.boolean()

})

const schemaJoiPatch = Joi.object({
  favorite: Joi.boolean().required()
})

module.exports = { schemaJoi, schemaJoiPatch }
