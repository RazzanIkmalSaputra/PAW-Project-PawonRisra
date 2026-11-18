// controllers/HomeController.js
const Product = require('../models/product.model'); // Panggil model database yang baru

exports.index = async (req, res) => {
    try {
        // Gunakan .findAll() bawaan Sequelize, bukan .getAll() lagi
        const dataProduk = await Product.findAll();

        res.render('index', {
            judul: 'Beranda - Pawon Risra',
            namaToko: 'Pawon Risra',
            produk: dataProduk // Kirim data dari database ke views/index.ejs
        });
    } catch (error) {
        console.error("Error mengambil data produk:", error);
        res.status(500).send("Terjadi kesalahan pada server saat memuat halaman beranda.");
    }
};