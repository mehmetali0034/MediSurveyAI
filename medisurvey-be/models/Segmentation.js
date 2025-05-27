const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Segmentation = sequelize.define('Segmentation', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    patientId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Patients',
            key: 'id'
        }
    },
    imageId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Files',
            key: 'id'
        }
    },
    segmentationMask: {
        type: DataTypes.JSON,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'completed'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Segmentation; 