const Contact = require('../../model/contacts.model')
const { schemaJoi } = require('../../midlewares/validation/valid-contact')

const putContact = async (req, res, next) => {
  try {
    const { error } = schemaJoi.validate(req.body)
    if (error) {
      return res.status(400).json({ message: 'missing fields' })
    }
    const contactUpdated = await Contact.findByIdAndUpdate(req.params.contactId, req.body, { new: true })
    if (contactUpdated) {
      res.status(200).json({
        contactUpdated
      })
    } else {
      res.status(404).json({
        message: 'Not found',
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = putContact
