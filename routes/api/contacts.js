const express = require('express');
const router = express.Router();

// Simple stub endpoints so the server can run during development
router.get('/', (req, res) => {
  res.json({ message: 'Contacts list (stub)' });
});

router.get('/:contactId', (req, res) => {
  res.json({ message: 'Contact detail (stub)', contactId: req.params.contactId });
});

module.exports = router;
