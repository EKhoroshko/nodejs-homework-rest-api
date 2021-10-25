const express = require('express')
const router = express.Router()
const listContacts = require('../../model/controllers/listContacts')
const getContactById = require('../../model/controllers/contactByID')
const addContact = require('../../model/controllers/addContact')
const removeContact = require('../../model/controllers/removeContact')

router.get('/', async (req, res, next) => {
  const list = await listContacts()
  res.status(200).json({
    list
  })
})

router.get('/:contactId', async (req, res, next) => {
  const chooseContact = await getContactById(req.params.contactId)
  if (chooseContact) {
    res.status(200).json({
      chooseContact
    })
  } else {
    return res.status(404).json({
      message: 'Not found',
    })
  }
})

router.post('/', async (req, res, next) => {
  const newContact = await addContact(req.body)
  res.json({ newContact })
})

router.delete('/:contactId', async (req, res, next) => {
  const deleteContact = await removeContact(req.params.contactId)
  if (deleteContact) {
    return res.status(200).json({
      message: 'contact deleted',
    })
  } else {
    return res.status(404).json({
      message: 'Not found',
    })
  }
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
