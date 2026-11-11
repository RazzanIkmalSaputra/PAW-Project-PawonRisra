const express = require('express');
const path = require('path');
const config = require('./config');
const logger = require('./middlewares/logger');
const routes = require('./routes');
const sequelize = require('./config/database');
const productRoutes = require('./routes/api');

const app = express();
app.use(productRoutes);

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

sequelize.sync({ alter: true }) // Gunakan { force: true } jika ingin mereset tabel tiap kali restart
  .then(() => console.log('Database PostgreSQL terhubung dan tersinkronisasi.'))
  .catch(err => console.error('Gagal terhubung ke database:', err));

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use('/', routes);

// 404 untuk semua yang tidak cocok dengan route di atas
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ sukses: false, pesan: 'Endpoint tidak ditemukan' });
  }
  res.status(404).send('Halaman tidak ditemukan');
});

app.listen(config.port, () => {
  console.log(`Server jalan di http://localhost:${config.port}`);
});