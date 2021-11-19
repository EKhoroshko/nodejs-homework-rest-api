const Contact = require('../../model/contacts.model')

const getAll = async (req, res, next) => {
  try {
    const { _id } = req.user
    const list = await Contact.find({ owner: _id }).populate('owner', '_id email')
    res.status(200).json({
      list
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll
