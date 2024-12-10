require('dotenv').config();  // .env dosyasını yükle
const { Sequelize, DataTypes } = require('sequelize');

// Veritabanı bağlantısı .env dosyasından alınıyor
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,  // DB_PORT eklemek iyi bir uygulamadır
    logging: false, // SQL sorgularını konsola yazdırmayı engeller (isteğe bağlı)
  }
);

// Doktor modelini tanımlıyoruz
const Doctor = sequelize.define('Doctor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    specialty: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {  // Şifre alanı
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'doctors', // Tablo adı
    timestamps: true,     // `createdAt` ve `updatedAt` alanları otomatik oluşturulacak
    createdAt: 'created_at', // Alan adını özelleştirir
    updatedAt: 'updated_at'  // Alan adını özelleştirir
});




module.exports = Doctor;  // Modeli dışarıya aktar
