const Contact = require('../../model/contacts.model')

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const deleteContact = await Contact.findByIdAndRemove(contactId)
    if (deleteContact) {
      return res.status(200).json({
        message: 'contact deleted',
      })
    } else {
      return res.status(404).json({
        message: 'Not found',
      })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = deleteContact
