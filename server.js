const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// .env dosyasındaki değişkenleri yükler
// (Bunu en üste koymak önemlidir)
dotenv.config();

// Express uygulamasını oluştur
const app = express();

// Middleware'ler (Ara yazılımlar)
app.use(cors()); // Farklı kaynaklardan (React projeniz gibi) gelen isteklere izin verir
app.use(express.json()); // Gelen isteklerin body'sindeki JSON verisini okumak için

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