const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.resolve('model/contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    const listContacts = JSON.parse(data)
    return listContacts
  } catch (error) {
    console.log(error)
  }
}

module.exports = listContacts
