const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');
const Order = require('../models/order.model');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, './uploads'); },
    filename: function (req, file, cb) { cb(null, Date.now() + path.extname(file.originalname)); }
});
const upload = multer({ storage: storage });

const cekAdmin = (req, res, next) => {
    if (req.session && req.session.isAdmin) next();
    else res.redirect('/admin/login');
};

// ================= ROUTE LOGIN =================
router.get('/admin/login', (req, res) => {
    res.render('admin-login', { error: null });
});

router.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'risra123') {
        req.session.isAdmin = true;
        res.redirect('/admin/dashboard');
    } else {
        res.render('admin-login', { error: 'Username atau password salah!' });
    }
});

// ================= ROUTE LOGOUT =================
router.get('/admin/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/'); 
});


// ================= ROUTE CRUD WEB ADMIN (DIPUSATKAN KE 1 FILE EJS) =================

router.get('/admin/dashboard', cekAdmin, async (req, res) => {
    const produk = await Product.findAll({ order: [['id', 'DESC']] });
    res.render('admin', { action: 'dashboard', produk });
});

// === 👇 TAMBAHKAN DUA RUTE PESANAN INI TEPAT DI BAWAH DASHBOARD 👇 ===
router.get('/admin/pesanan', cekAdmin, async (req, res) => {
    const pesanan = await Order.findAll({ order: [['id', 'DESC']] });
    res.render('admin', { action: 'pesanan', pesanan });
});

router.get('/admin/pesanan/:id/status/:status', cekAdmin, async (req, res) => {
    const pesanan = await Order.findByPk(req.params.id);
    if (pesanan) {
        await pesanan.update({ status_pesanan: req.params.status });
    }
    res.redirect('/admin/pesanan');
});
// ===================================================================

router.get('/admin/tambah', cekAdmin, (req, res) => {
    res.render('admin', { action: 'tambah' });
});

router.post('/admin/tambah', cekAdmin, upload.single('gambar'), async (req, res) => {
    try {
        const { nama, kategori, harga, keunggulan, status_stok } = req.body;
        const gambar = req.file ? '/uploads/' + req.file.filename : null;
        await Product.create({ nama, kategori, harga, keunggulan, status_stok, gambar });
        res.redirect('/admin/dashboard');
    } catch (error) {
        res.status(500).send('Gagal: ' + error.message);
    }
});

router.get('/admin/edit/:id', cekAdmin, async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.send('Produk tidak ditemukan');
    res.render('admin', { action: 'edit', product });
});
    
router.post('/admin/edit/:id', cekAdmin, upload.single('gambar'), async (req, res) => {
    try {
        const { nama, kategori, harga, keunggulan, status_stok } = req.body;
        const product = await Product.findByPk(req.params.id);
        let gambar = product.gambar; 
        if (req.file) gambar = '/uploads/' + req.file.filename;

        await product.update({ nama, kategori, harga, keunggulan, status_stok, gambar });
        res.redirect('/admin/dashboard');
    } catch (error) {
        res.status(500).send('Gagal: ' + error.message);
    }
});

router.get('/admin/hapus/:id', cekAdmin, async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (product) await product.destroy();
    res.redirect('/admin/dashboard');
});

module.exports = router;