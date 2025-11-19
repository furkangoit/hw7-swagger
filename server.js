const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. Rota dosyasını içeri aktar (Dosya yolunun doğru olduğundan emin ol!)
// Eğer dosyan 'routes/api/contacts.js' ise bu yol doğrudur.
const contactsRouter = require('./routes/api/contacts');

dotenv.config();

const app = express();

// 2. Temel Middleware'ler
app.use(cors());
app.use(express.json()); // JSON verilerini okumak için

// 3. ROTAYI BAĞLAMA (En Kritik Adım)
// '/api/contacts' adresine gelen istekleri contactsRouter'a yönlendir
app.use('/api/contacts', contactsRouter);

// 4. Swagger için (Eğer Swagger kuruluysa bu satırları aç)
const swaggerUi = require('swagger-ui-express');
 const swaggerDocument = require('./docs/swagger.json'); // Dosya varsa
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// --- HATALARI JSON OLARAK DÖNDÜRME BÖLÜMÜ ---

// 5. 404 Hatası Yakalayıcı (Route bulunamazsa buraya düşer)
// HTML yerine JSON dönmesini sağlayan kod budur.
app.use((req, res) => {
  res.status(404).json({ message: 'Not found - Böyle bir rota yok' });
});

// 6. 500 Genel Hata Yakalayıcı (Sunucu içi hata olursa)
app.use((err, req, res, next) => {
  console.error(err.stack); // Hatayı terminale/loglara yaz
  res.status(500).json({ message: err.message });
});

// 7. Sunucuyu Başlat
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: port ${PORT}`);
});