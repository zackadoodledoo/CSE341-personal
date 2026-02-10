const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');
const validation = require('../middleware/validate');

router.get('/', contactsController.getAll);

router.get('/:id', contactsController.getSingle);

router.get('/', validation.saveContact, contactsController.createContact);

router.get('/:id', validation.savedContact, contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;
