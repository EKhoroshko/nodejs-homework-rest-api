const removeContact = require('../../helpers/removeContact')

const deleteContact = async (req, res, next) => {
  try {
    const deleteContact = await removeContact(req.params.contactId)
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
