const { Doctor } = require('../models');
const jwt = require('jsonwebtoken');

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.findAll();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Doktor bilgileri alınırken bir hata oluştu.' });
  }
};
const getDoctorInfo = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
    const jwtTenantId = decoded.id;

    const doctorId = req.params.doctorId;

    const doctor = await Doctor.findOne({ where: { id: doctorId } });

    if (!doctor) {
      return res.status(404).json({ error: 'Doktor bulunamadı.' });
    }

    if (doctor.tenant_id !== jwtTenantId) {
      return res.status(403).json({ error: 'Bu doktora erişim yetkiniz yok.' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Doktor bilgileri alınırken bir hata oluştu.' });
  }
};
const updateDoctor = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
    const jwtTenantId = decoded.id;

    const doctorId  = req.params.doctorId;

    const doctorToUpdate = await Doctor.findOne({ where: { id: doctorId } });
    const { name, surname, specialization, phone_number } = req.body;

    if (!doctorToUpdate) {
      return res.status(404).json({ error: 'Doktor bulunamadı.' });
    }

    if (doctorToUpdate.tenant_id !== jwtTenantId) {
      return res.status(403).json({ error: 'Bu doktora erişim yetkiniz yok.' });
    }

    doctorToUpdate.name = name || doctorToUpdate.name;
    doctorToUpdate.surname = surname || doctorToUpdate.surname;
    doctorToUpdate.specialization = specialization || doctorToUpdate.specialization;
    doctorToUpdate.phone_number = phone_number || doctorToUpdate.phone_number;

    await doctorToUpdate.save();

    res.status(200).json({ message: 'Doktor başarıyla güncellendi.', doctor: doctorToUpdate });
  } catch (error) {
    res.status(500).json({ error: 'Doktor güncellenirken bir hata oluştu.' });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
    const jwtTenantId = decoded.id;

    const doctorId  = req.params.doctorId;

    const doctorToDelete = await Doctor.findOne({ where: { id: doctorId } });

    if (!doctorToDelete) {
      return res.status(404).json({ error: 'Doktor bulunamadı.' });
    }

    if (doctorToDelete.tenant_id !== jwtTenantId) {
      return res.status(403).json({ error: 'Bu doktora erişim yetkiniz yok.' });
    }

    await doctorToDelete.destroy();

    res.status(200).json({ message: 'Doktor başarıyla silindi.' });
  } catch (error) {
    res.status(500).json({ error: 'Doktor silinirken bir hata oluştu.' });
  }
};

module.exports = { getAllDoctors, updateDoctor, deleteDoctor ,getDoctorInfo};
