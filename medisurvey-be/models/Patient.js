const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const Doctor = require('./Doctor');

const Patient = sequelize.define('Patient', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY, 
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'), 
    allowNull: false,
  },
  primaryPhone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  secondaryPhone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  file: {
    type: DataTypes.STRING, 
    allowNull: true,
  },
  doctorId: {
    type: DataTypes.UUID, 
    allowNull: false,
    references: {
      model: Doctor, 
      key: 'id',
    },
  },
}, {
  tableName: 'Patients',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Patient;
