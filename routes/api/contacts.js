const express = require('express')
const router = express.Router()
const authenticate = require('../../midlewares/auth-validation/authenticate')
const gelAll = require('../../controllers/contacts/gelAll')
const getByID = require('../../controllers/contacts/getByID')
const postNewContact = require('../../controllers/contacts/postNewContact')
const deleteContact = require('../../controllers/contacts/deleteContsct')
const putContact = require('../../controllers/contacts/putContact')
const patchContact = require('../../controllers/contacts/patchContact')

router.get('/', authenticate, gelAll)

router.get('/:contactId', authenticate, getByID)

router.post('/', authenticate, postNewContact)

router.delete('/:contactId', deleteContact)

router.put('/:contactId', authenticate, putContact)

router.patch('/:contactId/favorite', authenticate, patchContact)

module.exports = router
