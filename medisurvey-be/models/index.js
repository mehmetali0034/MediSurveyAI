const Tenant = require('./Tenant');
const Doctor = require('./Doctor');
const Patient = require('./Patient');
const File = require('./File');
const Form = require('./Form');

Tenant.hasMany(Doctor, { foreignKey: 'tenant_id' });
Doctor.belongsTo(Tenant, { foreignKey: 'tenant_id' });

Doctor.hasMany(Patient, { foreignKey: 'doctorId' });
Patient.belongsTo(Doctor, { foreignKey: 'doctorId' });

// Patient-File ilişkisi JSON olarak tutulacağı için ORM ilişkisi kaldırıldı
// Patient.belongsTo(File, { foreignKey: 'fileId' });
// File.hasMany(Patient, { foreignKey: 'fileId' });

// File - Form ilişkisi
File.hasMany(Form, { foreignKey: 'file_id' });
Form.belongsTo(File, { foreignKey: 'file_id' });

module.exports = { Tenant, Doctor, Patient, File, Form };
