const Contact = require('../../model/contacts.model')

const getByID = async (req, res, next) => {
  const { contactId } = req.params
  try {
    const chooseContact = await Contact.findOne({ _id: contactId })
    if (chooseContact) {
      res.status(200).json({
        chooseContact
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

module.exports = getByID
