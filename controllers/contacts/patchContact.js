const Contact = require('../../model/contacts.model')
const { schemaJoiPatch } = require('../../midlewares/validation/valid-contact')

const patchContact = async (req, res, next) => {
  const { favorite } = req.body
  const { contactId } = req.params
  try {
    const { error } = schemaJoiPatch.validate(req.body)
    if (error) {
      return res.status(400).json({ message: 'missing field favorite' })
    }
    const contactUpdated = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
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

module.exports = patchContact
