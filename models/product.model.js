// models/product.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kategori: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  harga: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  keunggulan: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status_stok: {
    type: DataTypes.ENUM('Tersedia', 'Habis'),
    defaultValue: 'Tersedia',
    allowNull: false
  },
  // TAMBAHAN BARU UNTUK UPLOAD GAMBAR
  gambar: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

module.exports = Product;