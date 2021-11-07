const Contact = require('../../model/contacts.model')

const getAll = async (_, res, next) => {
  try {
    const list = await Contact.find()
    res.status(200).json({
      list
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
