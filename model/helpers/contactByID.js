const listContacts = require('../helpers/listContacts')

const getContactById = async (contactId) => {
  try {
    const data = await listContacts()
    const contact = data.find(({ id }) => id.toString() === String(contactId))
    if (!contact) {
      return null
    }
    return contact
  } catch (error) {
    console.log(error)
  }
}

module.exports = getContactById
