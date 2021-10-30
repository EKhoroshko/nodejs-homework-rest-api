const express = require('express')
const router = express.Router()
const listContacts = require('../../model/controllers/listContacts')
const getContactById = require('../../model/controllers/contactByID')
const addContact = require('../../model/controllers/addContact')
const removeContact = require('../../model/controllers/removeContact')
const updateContact = require('../../model/controllers/updateContact')
const schemaJoi = require('../../model/validation/valid-contact')

router.get('/', async (req, res, next) => {
  try {
    const list = await listContacts()
    res.status(200).json({
      list
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
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
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = schemaJoi.validate(req.body)
    if (error) {
      return res.status(400).json({ message: 'missing required name field' })
    }
    const newContact = await addContact(req.body)
    res.status(201).json({ newContact })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    const { error } = schemaJoi.validate(req.body)
    if (error) {
      return res.status(400).json({ message: 'missing fields' })
    }
    const contactUpdated = await updateContact(req.params.contactId, req.body)
    if (contactUpdated) {
      res.status(200).json({
        ...contactUpdated
      })
    } else {
      res.status(404).json({
        message: 'Not found',
      })
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = schemaJoi.validate(req.body)
    if (error) {
      return res.status(400).json({ message: 'missing fields' })
    }
    const contactUpdated = await updateContact(req.params.contactId, req.body)
    if (contactUpdated) {
      res.status(200).json({
        ...contactUpdated
      })
    } else {
      res.status(404).json({
        message: 'Not found',
      })
    }
  } catch (error) {
    next(error)
  }
})

module.exports = router
