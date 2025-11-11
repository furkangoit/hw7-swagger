const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs'); // Dosya sistemini okumak için 'fs' modülünü ekleyin (Node.js'te varsayılan)
const path = require('path'); // Dosya yolları için 'path' modülünü ekleyin (Node.js'te varsayılan)

// .env dosyasındaki değişkenleri yükler
// (Bunu en üste koymak önemlidir)
dotenv.config();

// Express uygulamasını oluştur
const app = express();

// Middleware'ler (Ara yazılımlar)
app.use(cors()); // Farklı kaynaklardan (React projeniz gibi) gelen isteklere izin verir
app.use(express.json()); // Gelen isteklerin body'sindeki JSON verisini okumak için

// --- YENİ GÜVENLİ KOD ---
const swaggerFilePath = path.join(__dirname, 'docs', 'swagger.json');

// Sadece 'swagger.json' dosyası varsa ve boş değilse Swagger rotasını ekle
if (fs.existsSync(swaggerFilePath)) {
  try {
    const swaggerDocument = require(swaggerFilePath);
    if (Object.keys(swaggerDocument).length > 0) {
      app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
      console.log("Swagger UI /api-docs adresinde başarıyla yüklendi.");
    } else {
      console.warn("Swagger UI yüklenemedi: docs/swagger.json dosyası boş.");
    }
  } catch (error) {
    console.error("Swagger dokümanı okunurken hata oluştu:", error);
  }
} else {
  console.warn("Swagger UI yüklenemedi: docs/swagger.json dosyası bulunamadı.");
}
// --- YENİ GÜVENLİ KOD BİTİŞİ ---

// Basit bir test rotası
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API sunucusu çalışıyor!' });
});

// Portu belirle (önce .env'den okur, bulamazsa 3000'i kullanır)
const PORT = process.env.PORT || 3000;

// Sunucuyu dinlemeye başla
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde başarıyla başlatıldı.`);
});