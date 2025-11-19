const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// --- Swagger modülleri ---
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');

const contactsRouter = require('./routes/api/contacts');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rotaları bağlama
app.use('/api/contacts', contactsRouter);

// --- SWAGGER KODU (Burası açık olmalı) ---
const swaggerPath = path.join(__dirname, 'docs', 'swagger.json');

if (fs.existsSync(swaggerPath)) {
  const swaggerDocument = require(swaggerPath);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  console.log("Swagger dosyası bulunamadı, dökümantasyon yüklenemedi.");
}
// -----------------------------------------

// 404 Hatası (JSON döner)
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: port ${PORT}`);
});