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
    const { name, address, phone_number, email, plan_type, password, password_confirmation } = req.body;

    // Şifre doğrulama
    if (password !== password_confirmation) {
      return res.status(400).json({ error: 'Şifreler uyuşmuyor.' });
    }

    // Şifreyi hash'leme
    const hashedPassword = await bcrypt.hash(password, 10);

    const tenant = await Tenant.create({
      name,
      address,
      phone_number,
      email,
      plan_type,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: tenant.id }, 'secretkey', { expiresIn: '1h' });

    res.status(201).json({ message: 'Kurum başarıyla oluşturuldu.', tenant ,token});
  } catch (error) {
    res.status(500).json({ error: 'Kurum oluşturulurken bir hata oluştu.' });
  }
};

const loginTenant = async (req, res) => {
  try {
    const { phone_number, password } = req.body;

    const tenant = await Tenant.findOne({ where: { phone_number } });

    if (!tenant) {
      return res.status(404).json({ error: 'Kurum bulunamadı.' });
    }

    const isPasswordValid = await bcrypt.compare(password, tenant.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Geçersiz şifre.' });
    }

    const token = jwt.sign({ id: tenant.id }, 'secretkey', { expiresIn: '1h' });

    res.status(200).json({ message: 'Giriş başarılı.', token });
  } catch (error) {
    res.status(500).json({ error: 'Giriş yapılırken bir hata oluştu.' });
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
