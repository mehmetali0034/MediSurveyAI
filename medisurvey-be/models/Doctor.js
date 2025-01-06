const { DataTypes } = require('sequelize');
const db = require('../config/database');
const Tenant = require('./Tenant');
const { v4: uuidv4 } = require('uuid');

const Doctor = db.define('Doctor', {
  id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'doctor',
  },
  specialization: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tenant_id: {
    type: DataTypes.UUID, 
    references: {
      model: Tenant,
      key: 'id'
    },
    allowNull: false,
  },
}, {});

Doctor.belongsTo(Tenant, { foreignKey: 'tenant_id' });

module.exports = Doctor;
