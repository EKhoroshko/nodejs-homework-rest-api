const getContactById = require('../helpers/contactByID')

const getByID = async (req, res, next) => {
  try {
    const chooseContact = await getContactById(req.params.contactId)
    if (chooseContact) {
      res.status(200).json({
        ...chooseContact
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