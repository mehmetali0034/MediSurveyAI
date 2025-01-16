const { Tenant } = require('../models');
const jwt = require('jsonwebtoken');

const getAllTenants = async (req, res) => {
  try {
    const tenants = await Tenant.findAll();
    res.status(200).json(tenants);
  } catch (error) {
    res.status(500).json({ error: 'Kurum bilgileri alınırken bir hata oluştu.' });
  }
};

const getTenantInfo = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
    const jwtTenantId = decoded.id;

    const tenantId = req.params.tenantId;

    if (tenantId !== jwtTenantId) {
      return res.status(403).json({ error: 'Bu kuruma erişim yetkiniz yok.' });
    }

    const tenant = await Tenant.findOne({ where: { id: tenantId } });

    if (!tenant) {
      return res.status(404).json({ error: 'Kurum bulunamadı.' });
    }

    res.status(200).json(tenant);
  } catch (error) {
    res.status(500).json({ error: 'Kurum bilgileri alınırken bir hata oluştu.' });
  }
};

const updateTenant = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
    const jwtTenantId = decoded.id;

    const tenantId = req.params.tenantId;
    const { name, address, phone_number, email, plan_type, password, password_confirmation } = req.body;

    if (password && password !== password_confirmation) {
      return res.status(400).json({ error: 'Şifreler uyuşmuyor.' });
    }

    // Erişim yetkisi kontrolü
    if (tenantId !== jwtTenantId) {
      return res.status(403).json({ error: 'Bu kuruma erişim yetkiniz yok.' });
    }

    const tenantToUpdate = await Tenant.findOne({ where: { id: tenantId } });

    if (!tenantToUpdate) {
      return res.status(404).json({ error: 'Kurum bulunamadı.' });
    }

    tenantToUpdate.name = name || tenantToUpdate.name;
    tenantToUpdate.address = address || tenantToUpdate.address;
    tenantToUpdate.phone_number = phone_number || tenantToUpdate.phone_number;
    tenantToUpdate.email = email || tenantToUpdate.email;
    tenantToUpdate.plan_type = plan_type || tenantToUpdate.plan_type;

    if (password) {
      tenantToUpdate.password = await bcrypt.hash(password, 10);
    }

    await tenantToUpdate.save();

    res.status(200).json({ message: 'Kurum başarıyla güncellendi.', tenant: tenantToUpdate });
  } catch (error) {
    res.status(500).json({ error: 'Kurum güncellenirken bir hata oluştu.' });
  }
};

const deleteTenant = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
    const jwtTenantId = decoded.id;

    const tenantId = req.params.tenantId;

    // Erişim yetkisi kontrolü
    if (tenantId !== jwtTenantId) {
      return res.status(403).json({ error: 'Bu kuruma erişim yetkiniz yok.' });
    }

    const tenantToDelete = await Tenant.findOne({ where: { id: tenantId } });

    if (!tenantToDelete) {
      return res.status(404).json({ error: 'Kurum bulunamadı.' });
    }
    await tenantToDelete.destroy();

    res.status(200).json({ message: 'Kurum başarıyla silindi.' });
  } catch (error) {
    res.status(500).json({ error: 'Kurum silinirken bir hata oluştu.' });
  }
};

module.exports = { getAllTenants, updateTenant, deleteTenant ,getTenantInfo};
