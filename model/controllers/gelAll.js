const listContacts = require('../helpers/listContacts')

const getAll = async (req, res, next) => {
  try {
    const list = await listContacts()
    res.status(200).json({
      list
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAll