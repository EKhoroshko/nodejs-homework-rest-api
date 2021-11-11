const Contact = require('../../model/contacts.model')
const { schemaJoi } = require('../../midlewares/validation/valid-contact')

const postNewContact = async (req, res, next) => {
  try {
    const { error } = schemaJoi.validate(req.body)
    if (error) {
      return res.status(400).json({ message: 'missing required name field' })
    }
    const newContact = await Contact.create(req.body)
    res.status(201).json({ newContact })
  } catch (error) {
    next(error)
  }
}

module.exports = postNewContact
