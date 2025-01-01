require('dotenv').config();  // dotenv'i yükle

const { Sequelize } = require('sequelize');

// Sequelize yapılandırması
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,  // DB_PORT eklemek iyi bir uygulamadır
    }
);



module.exports = sequelize;
