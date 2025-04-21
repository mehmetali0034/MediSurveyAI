const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FormAnswers = sequelize.define('FormAnswers', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  questions: {
    type: DataTypes.JSON,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('for me', 'for patients'),
    defaultValue: 'for patients',
    allowNull: false
  },
  created_by: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Doctors',
      key: 'id'
    },
    field: 'created_by'
  },
  form_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Forms',
      key: 'id'
    },
    field: 'form_id'
  },
  patient_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Patients',
      key: 'id'
    },
    field: 'patient_id'
  }
}, {
  timestamps: true,
  underscored: true,
  tableName: 'FormAnswers'
});

module.exports = FormAnswers; 