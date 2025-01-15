const { Patient } = require('../models');
const jwt = require('jsonwebtoken');

const addPatient = async (req, res) => {
  try { 
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey'); 
    const doctorId = decoded.id;
    const role = decoded.role;

    if (role !== 'admin' && role !== 'doctor') {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok!' });
    }

    const { firstName, lastName, email, dateOfBirth, gender, primaryPhone, secondaryPhone, file } = req.body;

    const newPatient = await Patient.create({
      firstName,
      lastName,
      email,
      dateOfBirth,
      gender,
      primaryPhone,
      secondaryPhone,
      file,
      doctorId: doctorId, 
    });

    res.status(201).json({ status: 'success', patient: newPatient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPatientInfo = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey'); 
    const doctorId = decoded.id;
    const role = decoded.role;

    if (role !== 'admin' && role !== 'doctor') {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok!' });
    }

    const { id } = req.params;
    const patient = await Patient.findOne({
      where: { id },
    });

    if (!patient) {
      return res.status(404).json({ message: 'Hasta bulunamadı!' });
    }

    if (role === 'doctor' && patient.doctorId !== doctorId) {
      return res.status(403).json({ message: 'Bu hasta bilgisine erişim yetkiniz yok!' });
    }

    res.status(200).json({ status: 'success', patient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
    const doctorId = decoded.id;
    const role = decoded.role;

    if (role !== 'admin' && role !== 'doctor') {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok!' });
    }

    if (role === 'admin') {
      // Admin, tüm hastaları görebilir
      const patients = await Patient.findAll();
      res.status(200).json({ status: 'success', patients });
    } else if (role === 'doctor') {
      // Doktor, sadece kendi hastalarını görebilir
      const patients = await Patient.findAll({
        where: { doctorId: doctorId }
      });
      res.status(200).json({ status: 'success', patients });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey'); 
    const doctorId = decoded.id;
    const role = decoded.role;

    if (role !== 'admin' && role !== 'doctor') {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok!' });
    }

    const { id } = req.params;
    const { firstName, lastName, email, dateOfBirth, gender, primaryPhone, secondaryPhone, file } = req.body;

    const patient = await Patient.findOne({
      where: { id },
    });

    if (!patient) {
      return res.status(404).json({ message: 'Hasta bulunamadı!' });
    }

    if (role === 'doctor' && patient.doctorId !== doctorId) {
      return res.status(403).json({ message: 'Bu hastayı güncelleme yetkiniz yok!' });
    }

    await patient.update({
      firstName,
      lastName,
      email,
      dateOfBirth,
      gender,
      primaryPhone,
      secondaryPhone,
      file,
    });

    res.status(200).json({ status: 'success', patient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey'); 
    const { role, id: doctorId } = decoded;

    if (role !== 'admin' && role !== 'doctor') {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok!' });
    }

    const { id } = req.params;

    const patient = await Patient.findOne({
      where: { id },
    });

    if (!patient) {
      return res.status(404).json({ message: 'Hasta bulunamadı!' });
    }

    if (role === 'doctor' && patient.doctorId !== doctorId) {
      return res.status(403).json({ message: 'Bu hastayı silme yetkiniz yok!' });
    }

    await patient.destroy();

    res.status(200).json({ message: 'Hasta başarıyla silindi!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addPatient,
  getPatientInfo,
  updatePatient,
  deletePatient,
  getAllPatients,
};
