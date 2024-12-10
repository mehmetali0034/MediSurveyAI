require('dotenv').config();  // dotenv'i yükle

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,  // DB_PORT eklemek iyi bir uygulamadır
});

const db = async () => {
    try {
        await sequelize.authenticate();
        console.log('Veritabanına başarıyla bağlandı!');
    } catch (error) {
        console.error('Veritabanına bağlanırken hata oluştu:', error);
    }
};

module.exports = db;
