const Tenant = require('./Tenant');
const Doctor = require('./Doctor');

Doctor.belongsTo(Tenant, { foreignKey: 'tenant_id' });
Tenant.hasMany(Doctor, { foreignKey: 'tenant_id' });


module.exports = { Tenant, Doctor };
