const Tenant = require('./Tenant');
const Doctor = require('./Doctor');
const Patient = require('./Patient');
const File = require('./File');

Tenant.hasMany(Doctor, { foreignKey: 'tenant_id' });
Doctor.belongsTo(Tenant, { foreignKey: 'tenant_id' });

Doctor.hasMany(Patient, { foreignKey: 'doctorId' });
Patient.belongsTo(Doctor, { foreignKey: 'doctorId' });

// File - Patient ilişkisi
Patient.belongsTo(File, { foreignKey: 'fileId' });
File.hasMany(Patient, { foreignKey: 'fileId' });

module.exports = { Tenant, Doctor, Patient, File };
