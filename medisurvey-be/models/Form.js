const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Form = sequelize.define('Form', {
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
  file_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Files',
      key: 'id'
    },
    field: 'file_id'
  }
}, {
  timestamps: true,
  underscored: true,
  tableName: 'Forms'
});

module.exports = Form; 