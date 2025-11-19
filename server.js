const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs'); // Yeni eklediğimiz paket
const path = require('path');

const contactsRouter = require('./routes/api/contacts');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotaları bağla
app.use('/api/contacts', contactsRouter);

// --- SWAGGER AYARLARI (KESİN ÇÖZÜM) ---
// JSON yerine doğrudan YAML dosyasını yüklüyoruz
try {
  const swaggerPath = path.join(__dirname, 'docs', 'openapi.yaml');
  const swaggerDocument = YAML.load(swaggerPath);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log("Swagger başarıyla yüklendi.");
} catch (error) {
  console.error("Swagger yüklenirken hata oluştu:", error.message);
}
// --------------------------------------

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: port ${PORT}`);
});