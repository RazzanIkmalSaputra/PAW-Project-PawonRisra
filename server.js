const express = require('express');
const path = require('path');
const config = require('./config');
const logger = require('./middlewares/logger');
const routes = require('./routes');
const sequelize = require('./config/database');
const productRoutes = require('./routes/api');
const chatRoutes = require('./routes/chat.routes');

const app = express();

// 1. MIDDLEWARE GLOBAL (Wajib ditaruh di atas sebelum routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// 2. VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 3. ROUTES
app.use(productRoutes);
app.use('/api/chat', chatRoutes);
app.use('/', routes);

// 4. SINKRONISASI DATABASE
sequelize.sync({ alter: true })
  .then(() => console.log('Database PostgreSQL terhubung dan tersinkronisasi.'))
  .catch(err => console.error('Gagal terhubung ke database:', err));

// 5. HANDLER 404
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ sukses: false, pesan: 'Endpoint tidak ditemukan' });
  }
  res.status(404).send('Halaman tidak ditemukan');
});

// 6. START SERVER
app.listen(config.port, () => {
  console.log(`Server jalan di http://localhost:${config.port}`);
});