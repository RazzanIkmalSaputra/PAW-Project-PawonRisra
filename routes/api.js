// routes/product.routes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/Product.controller');

// Rute REST API CRUD Database
router.get('/api/produk', productController.getAllProductsAPI);
router.get('/api/produk/:id', productController.getProductByIdAPI);
router.post('/api/produk', productController.createProductAPI);
router.put('/api/produk/:id', productController.updateProductAPI);
router.delete('/api/produk/:id', productController.deleteProductAPI);

module.exports = router;