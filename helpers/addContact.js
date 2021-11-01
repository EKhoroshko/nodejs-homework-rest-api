const fs = require('fs/promises')
const crypto = require('crypto')
const listContacts = require('./listContacts')
const path = require('path')
const contactsPath = path.resolve('model/contacts.json')

const addContact = async (body) => {
  try {
    const data = await listContacts()
    const newUser = { id: crypto.randomUUID(), ...body }
    data.push(newUser)
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2))
    return newUser
  } catch (error) {
    console.log(error)
  }
}

module.exports = addContact
