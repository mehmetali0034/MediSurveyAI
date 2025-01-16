const Tenant = require('./Tenant');
const Doctor = require('./Doctor');
const Patient = require('./Patient');

Tenant.hasMany(Doctor, { foreignKey: 'tenant_id' });
Doctor.belongsTo(Tenant, { foreignKey: 'tenant_id' });

Doctor.hasMany(Patient, { foreignKey: 'doctorId' });
Patient.belongsTo(Doctor, { foreignKey: 'doctorId' });

module.exports = { Tenant, Doctor, Patient };
