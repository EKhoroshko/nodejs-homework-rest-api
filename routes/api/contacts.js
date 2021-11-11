const express = require('express')
const router = express.Router()
const gelAll = require('../../controllers/contacts/gelAll')
const getByID = require('../../controllers/contacts/getByID')
const postNewContact = require('../../controllers/contacts/postNewContact')
const deleteContact = require('../../controllers/contacts/deleteContsct')
const putContact = require('../../controllers/contacts/putContact')
const patchContact = require('../../controllers/contacts/patchContact')

router.get('/', gelAll)

router.get('/:contactId', getByID)

router.post('/', postNewContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId', putContact)

router.patch('/:contactId/favorite', patchContact)

module.exports = router
