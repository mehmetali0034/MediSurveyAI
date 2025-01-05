const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Doctor, Tenant } = require('../models');

const adminRegisterDoctor = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
    const tenant_id = decoded.id;

    const { name, surname, email, password, confirm_password, specialization, phone_number } = req.body;

    if (password !== confirm_password) {
      return res.status(400).json({ error: 'Şifreler eşleşmiyor.' });
    }

    const existingDoctor = await Doctor.findOne({ where: { email } });
    if (existingDoctor) {
      return res.status(400).json({ error: 'Bu e-posta adresi zaten bir doktor tarafından kullanılıyor.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = await Doctor.create({
      name,
      surname,
      email,
      password: hashedPassword,
      role: 'admin',
      specialization,
      phone_number,
      tenant_id: tenant_id,
    });

    const newToken = jwt.sign(
      {
        id: newDoctor.id,
        tenant_id: newDoctor.tenant_id,
        role: newDoctor.role,
      },
      'secretkey',
      { expiresIn: '1h' }
    );

    res.status(201).json({ doctor: newDoctor, token: newToken });
  } catch (error) {
    res.status(500).json({ error: 'Admin doktor kaydı sırasında bir hata oluştu.', details: error.message });
  }
};

const registerDoctor = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
    const tenant_id = decoded.tenant_id;

    const { name, surname, email, password, confirm_password, specialization, phone_number } = req.body;

    if (password !== confirm_password) {
      return res.status(400).json({ error: 'Şifreler eşleşmiyor.' });
    }

    const existingDoctor = await Doctor.findOne({ where: { email } });
    if (existingDoctor) {
      return res.status(400).json({ error: 'Bu e-posta adresi zaten bir doktor tarafından kullanılıyor.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = await Doctor.create({
      name,
      surname,
      email,
      password: hashedPassword,
      role: 'doctor',
      specialization,
      phone_number,
      tenant_id: tenant_id,
    });

    const newToken = jwt.sign(
      {
        id: newDoctor.id,
        tenant_id: newDoctor.tenant_id,
        role: newDoctor.role,
      },
      'secretkey',
      { expiresIn: '1h' }
    );

    res.status(201).json({ doctor: newDoctor, token: newToken });
  } catch (error) {
    res.status(500).json({ error: 'Doktor kaydı sırasında bir hata oluştu.', details: error.message });
  }
};

const registerTenant = async (req, res) => {
  try {
    const { name, address, phone_number, email, plan_type } = req.body;

    const existingTenantByEmail = await Tenant.findOne({ where: { email } });
    if (existingTenantByEmail) {
      return res.status(400).json({ error: 'Bu e-posta adresi zaten kullanılıyor.' });
    }

    const existingTenantByPhone = await Tenant.findOne({ where: { phone_number } });
    if (existingTenantByPhone) {
      return res.status(400).json({ error: 'Bu telefon numarası zaten bir kurum tarafından kullanılıyor.' });
    }

    const newTenant = await Tenant.create({
      name,
      address,
      phone_number,
      email,
      plan_type,
    });

    const token = jwt.sign({ id: newTenant.id }, 'secretkey', { expiresIn: '1h' });

    res.status(201).json({ tenant: newTenant, token });
  } catch (error) {
    res.status(500).json({ error: 'Kurum kaydı sırasında bir hata oluştu.', details: error.message });
  }
};

const loginTenant = async (req, res) => {
  try {
    const { email, phone_number } = req.body;
    const tenant = await Tenant.findOne({ where: { email, phone_number } });

    if (!tenant) {
      return res.status(400).json({ error: 'Kurum bilgileri bulunamadı.' });
    }

    const token = jwt.sign({ id: tenant.id }, 'secretkey', { expiresIn: '1h' });

    const responseData = {
      token,
      tenant: {
        id: tenant.id,
        name: tenant.name,
        email: tenant.email,
        address: tenant.address,
        phone_number: tenant.phone_number,
        plan_type: tenant.plan_type,
      },
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ error: 'Kurum girişi sırasında bir hata oluştu.', details: error.message });
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await Doctor.findOne({ where: { email } });

    if (!doctor) {
      return res.status(400).json({ error: 'E-posta adresi kayıtlı değil.' });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Şifre hatalı.' });
    }

    const token = jwt.sign(
      {
        id: doctor.id,
        tenant_id: doctor.tenant_id,
        role: doctor.role,
      },
      'secretkey',
      { expiresIn: '1h' }
    );

    const responseData = {
      token,
      doctor: {
        id: doctor.id,
        email: doctor.email,
        role: doctor.role,
        specialization: doctor.specialization,
        name: doctor.name,
        surname: doctor.surname,
        tenant_id: doctor.tenant_id,
      },
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ error: 'Doktor girişi sırasında bir hata oluştu.', details: error.message });
  }
};

module.exports = { adminRegisterDoctor, registerDoctor, loginDoctor, registerTenant, loginTenant };
