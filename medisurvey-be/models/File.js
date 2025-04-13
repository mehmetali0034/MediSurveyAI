const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const File = sequelize.define('File', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
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
  }
}, {
  timestamps: true,
  underscored: true,
  tableName: 'Files'
});

module.exports = File; 