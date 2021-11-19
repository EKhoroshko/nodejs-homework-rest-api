const Joi = require('joi')

const authJoi = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
})

module.exports = authJoi
