const express = require('express');
const router = express.Router();

// Şimdilik test için basit bir cevap döndürelim
router.get('/', (req, res) => {
  res.json({ message: "Tüm kişiler listelendi" });
});

router.get('/:contactId', (req, res) => {
  res.json({ message: `Kişi getirildi: ${req.params.contactId}` });
});

router.post('/', (req, res) => {
  res.json({ message: "Yeni kişi eklendi" });
});

router.delete('/:contactId', (req, res) => {
  res.json({ message: "Kişi silindi" });
});

router.patch('/:contactId', (req, res) => {
  res.json({ message: "Kişi güncellendi" });
});

module.exports = router;
