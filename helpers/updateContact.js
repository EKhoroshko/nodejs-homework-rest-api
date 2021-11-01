const fs = require('fs/promises')
const getContactById = require('./contactByID')
const listContacts = require('./listContacts')
const path = require('path')
const contactsPath = path.resolve('model/contacts.json')

const updateContact = async (contactId, body) => {
  try {
    const contact = await getContactById(contactId)
    if (!contact) {
      return
    }
    const changeContact = { ...contact, ...body }
    const list = await listContacts()
    const newList = list.filter(({ id }) => id.toString() !== contactId.toString())
    newList.push(changeContact)
    await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2))
    return changeContact
  } catch (error) {
    console.log(error)
  }
}

module.exports = updateContact
