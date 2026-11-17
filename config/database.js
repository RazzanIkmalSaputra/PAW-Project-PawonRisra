const { Sequelize } = require('sequelize');
require('dotenv').config(); // Wajib ada di baris paling atas

const sequelize = new Sequelize(
    process.env.DB_NAME,      // Nama database (pawon_risra_db)
    process.env.DB_USERNAME,  // User database (harus 'postgres')
    process.env.DB_PASSWORD,  // Password database kamu
    {
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false
    }
);

module.exports = sequelize;