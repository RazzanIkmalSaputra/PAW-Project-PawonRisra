// controllers/product.controller.js
const Product = require('../models/product.model');

// ==========================================
// ENDPOINT REST API (Untuk Postman / Thunder Client)
// ==========================================

// READ ALL - Menampilkan semua produk
exports.getAllProductsAPI = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({ sukses: true, data: products });
  } catch (error) {
    res.status(500).json({ sukses: false, pesan: error.message });
  }
};

// READ ONE - Menampilkan satu produk berdasarkan ID
exports.getProductByIdAPI = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ pesan: 'Produk tidak ditemukan' });
    res.json({ sukses: true, data: product });
  } catch (error) {
    res.status(500).json({ sukses: false, pesan: error.message });
  }
};

// CREATE - Menambah produk baru
exports.createProductAPI = async (req, res) => {
  try {
    const { nama, kategori, harga, keunggulan } = req.body;
    const newProduct = await Product.create({ nama, kategori, harga, keunggulan });
    res.status(201).json({ sukses: true, pesan: 'Produk berhasil ditambahkan', data: newProduct });
  } catch (error) {
    res.status(500).json({ sukses: false, pesan: error.message });
  }
};

// UPDATE - Memperbarui produk
exports.updateProductAPI = async (req, res) => {
  try {
    const { nama, kategori, harga, keunggulan } = req.body;
    const product = await Product.findByPk(req.params.id);
    
    if (!product) return res.status(404).json({ pesan: 'Produk tidak ditemukan' });

    await product.update({ nama, kategori, harga, keunggulan });
    res.json({ sukses: true, pesan: 'Produk berhasil diperbarui', data: product });
  } catch (error) {
    res.status(500).json({ sukses: false, pesan: error.message });
  }
};

// DELETE - Menghapus produk
exports.deleteProductAPI = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ pesan: 'Produk tidak ditemukan' });

    await product.destroy();
    res.json({ sukses: true, pesan: 'Produk berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ sukses: false, pesan: error.message });
  }
};