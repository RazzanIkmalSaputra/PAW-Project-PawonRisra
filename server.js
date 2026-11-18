const express = require('express');
const path = require('path');
const config = require('./config');
const logger = require('./middlewares/logger');
const routes = require('./routes');
const sequelize = require('./config/database');
const productRoutes = require('./routes/api');
const chatRoutes = require('./routes/chat.routes');

const Order = require('./models/order.model');

const session = require('express-session');

const app = express();

// 1. MIDDLEWARE GLOBAL (Wajib ditaruh di atas sebelum routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Mengizinkan folder uploads diakses oleh publik untuk menampilkan gambar
app.use('/uploads', express.static('uploads'));

// 2. VIEW ENGINE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Konfigurasi Session untuk Login Admin
app.use(session({
  secret: 'kunci-rahasia-pawon-risra',
  resave: false,
  saveUninitialized: true
}));

// Pastikan aplikasi bisa membaca form data (Penting untuk login)
app.use(express.urlencoded({ extended: true }));

// API Simpan Pesanan ke Database
app.post('/api/checkout', async (req, res) => {
  try {
    const { nama_pelanggan, alamat, detail_pesanan, total_harga } = req.body;
    await Order.create({ nama_pelanggan, alamat, detail_pesanan, total_harga });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Rute Admin
const adminRoutes = require('./routes/admin.routes');
app.use(adminRoutes);

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