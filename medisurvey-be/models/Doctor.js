require('dotenv').config();  
const { Sequelize, DataTypes } = require('sequelize'); 
const sequelize = require('../config/database'); 

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
  password: {  
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'doctor'  
  }
}, {
  tableName: 'doctors', 
  timestamps: true,     
  createdAt: 'created_at',
  updatedAt: 'updated_at'  
});

module.exports = Doctor;
