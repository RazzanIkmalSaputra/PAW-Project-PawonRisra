const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  nama_pelanggan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alamat: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  detail_pesanan: {
    type: DataTypes.TEXT, // Menyimpan teks rangkuman keranjang
    allowNull: false,
  },
  total_harga: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status_pesanan: {
    type: DataTypes.ENUM('Baru', 'Diproses', 'Selesai'),
    defaultValue: 'Baru',
  }
});

module.exports = Order;