const express = require('express')
const router = express.Router()
const gelAll = require('../../model/controllers/gelAll')
const getByID = require('../../model/controllers/getByID')
const postNewContact = require('../../model/controllers/postNewContact')
const deleteContact = require('../../model/controllers/deleteContsct')
const patchContact = require('../../model/controllers/patchContact')
const putContact = require('../../model/controllers/putContact')

router.get('/', gelAll)

router.get('/:contactId', getByID)

router.post('/', postNewContact)

router.delete('/:contactId', deleteContact)

router.patch('/:contactId', patchContact)

router.put('/:contactId', putContact)

module.exports = router
