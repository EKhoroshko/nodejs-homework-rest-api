const fs = require('fs/promises')
const listContacts = require('./listContacts')
const getContactById = require('../helpers/contactByID')
const path = require('path')
const contactsPath = path.resolve('model/contacts.json')

const removeContact = async (contactId) => {
  try {
    const contact = await getContactById(contactId)
    const data = await listContacts()
    const base = data.filter(({ id }) => id.toString() !== contactId.toString())
    await fs.writeFile(contactsPath, JSON.stringify(base, null, 2))
    return contact
  } catch (error) {
    console.log(error)
  }
}

module.exports = removeContact
