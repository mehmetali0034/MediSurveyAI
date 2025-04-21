const { Patient, Doctor, File } = require('../models');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const addPatient = async (req, res) => {
  try { 
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey'); 
    const doctorId = decoded.id;
    const role = decoded.role;

    if (role !== 'admin' && role !== 'doctor') {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok!' });
    }

    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doktor bulunamadı!' });
    }

    const { firstName, lastName, email, dateOfBirth, gender, primaryPhone, secondaryPhone, fileIds } = req.body;

    let parsedFileIds = fileIds;
    if (typeof fileIds === 'string') {
      try {
        parsedFileIds = JSON.parse(fileIds);
      } catch (e) {
        parsedFileIds = [fileIds];
      }
    } else if (!Array.isArray(fileIds) && fileIds) {
      parsedFileIds = [fileIds];
    } else if (!fileIds) {
      parsedFileIds = [];
    }

    const newPatient = await Patient.create({
      firstName,
      lastName,
      email,
      dateOfBirth,
      gender,
      primaryPhone,
      secondaryPhone,
      fileIds: parsedFileIds,
      doctorId: doctorId, 
    });

    let files = [];
    if (parsedFileIds && parsedFileIds.length > 0) {
      files = await File.findAll({
        where: { 
          id: { 
            [Op.in]: parsedFileIds 
          } 
        }
      });
    }

    const patientWithFiles = {
      ...newPatient.toJSON(),
      Files: files,
      Doctor: doctor
    };

    res.status(201).json({ status: 'success', patient: patientWithFiles });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ message: error.message });
  }
};

const addPatientByTenant = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token bulunamadı!' });
    }

    const decoded = jwt.verify(token, 'secretkey');
    if (decoded.role) {
      return res.status(403).json({ message: 'Bu işlem sadece tenant tarafından yapılabilir!' });
    }

    const tenantId = decoded.id;

    const { firstName, lastName, email, dateOfBirth, gender, primaryPhone, secondaryPhone, fileIds, doctorId } = req.body;

    let parsedFileIds = fileIds;
    if (typeof fileIds === 'string') {
      try {
        parsedFileIds = JSON.parse(fileIds);
      } catch (e) {
        parsedFileIds = [fileIds];
      }
    } else if (!Array.isArray(fileIds) && fileIds) {
      parsedFileIds = [fileIds];
    } else if (!fileIds) {
      parsedFileIds = [];
    }

    const newPatient = await Patient.create({
      firstName,
      lastName,
      email,
      dateOfBirth,
      gender,
      primaryPhone,
      secondaryPhone,
      fileIds: parsedFileIds,
      doctorId
    });

    const doctor = await Doctor.findByPk(doctorId);
    let files = [];
    if (parsedFileIds && parsedFileIds.length > 0) {
      files = await File.findAll({
        where: { 
          id: { 
            [Op.in]: parsedFileIds 
          } 
        }
      });
    }

    const patientWithFiles = {
      ...newPatient.toJSON(),
      Files: files,
      Doctor: doctor
    };

    res.status(201).json({ status: 'success', patient: patientWithFiles });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ message: error.message });
  }
};

const getPatientInfo = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey'); 
    const doctorId = decoded.id;
    const role = decoded.role;

    const { id } = req.params;
    const patient = await Patient.findOne({
      where: { id },
      include: [Doctor]
    });

    if (!patient) {
      return res.status(404).json({ message: 'Hasta bulunamadı!' });
    }

    if (role === 'doctor') {
      if (patient.doctorId !== doctorId) {
        return res.status(403).json({ message: 'Bu hasta bilgisine erişim yetkiniz yok!' });
      }
    } else if (role === 'admin') {
      const doctorsUnderAdmin = await Doctor.findAll({
        where: { created_by: doctorId },
        attributes: ['id']
      });
      const allowedDoctorIds = [doctorId, ...doctorsUnderAdmin.map(d => d.id)];
      
      if (!allowedDoctorIds.includes(patient.doctorId)) {
        return res.status(403).json({ message: 'Bu hasta bilgisine erişim yetkiniz yok!' });
      } 
    }

    let files = [];
    if (patient.fileIds && patient.fileIds.length > 0) {
      files = await File.findAll({
        where: { 
          id: { 
            [Op.in]: patient.fileIds 
          } 
        }
      });
    }

    const patientWithFiles = {
      ...patient.toJSON(),
      Files: files
    };

    res.status(200).json({ status: 'success', patient: patientWithFiles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPatientInfoByTenant = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token bulunamadı!' });
    }

    const decoded = jwt.verify(token, 'secretkey');

    if (decoded.role) {
      return res.status(403).json({ message: 'Bu işlem sadece tenant tarafından yapılabilir!' });
    }

    const tenantId = decoded.id;

    const { id } = req.params;
    const patient = await Patient.findOne({
      where: { id },
      include: [
        {
          model: Doctor,
          where: { tenant_id: tenantId }
        }
      ]
    });

    if (!patient) {
      return res.status(404).json({ message: 'Hasta bulunamadı veya bu hastaya erişim yetkiniz yok!' });
    }

    let files = [];
    if (patient.fileIds && patient.fileIds.length > 0) {
      files = await File.findAll({
        where: { 
          id: { 
            [Op.in]: patient.fileIds 
          } 
        }
      });
    }

    const patientWithFiles = {
      ...patient.toJSON(),
      Files: files
    };

    res.status(200).json({ status: 'success', patient: patientWithFiles });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ message: error.message });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
    const doctorId = decoded.id;
    const role = decoded.role;

    let patients;

    if (role === 'admin') {
      const doctorsUnderAdmin = await Doctor.findAll({
        where: { created_by: doctorId },
        attributes: ['id']
      });
      const allowedDoctorIds = [doctorId, ...doctorsUnderAdmin.map(d => d.id)];
      
      patients = await Patient.findAll({
        where: {
          doctorId: {
            [Op.in]: allowedDoctorIds
          }
        },
        include: [Doctor]
      });
    } else if (role === 'doctor') {
      patients = await Patient.findAll({
        where: { doctorId: doctorId },
        include: [Doctor]
      });
    } else {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok!' });
    }

    const patientsWithFiles = await Promise.all(patients.map(async (patient) => {
      let files = [];
      if (patient.fileIds && patient.fileIds.length > 0) {
        files = await File.findAll({
          where: { 
            id: { 
              [Op.in]: patient.fileIds 
            } 
          }
        });
      }
      return {
        ...patient.toJSON(),
        Files: files
      };
    }));

    res.status(200).json({ status: 'success', patients: patientsWithFiles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllPatientsByTenant = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token bulunamadı!' });
    }

    const decoded = jwt.verify(token, 'secretkey');
    if (decoded.role) {
      return res.status(403).json({ message: 'Bu işlem sadece tenant tarafından yapılabilir!' });
    }

    const tenantId = decoded.id;

    const adminDoctors = await Doctor.findAll({
      where: { 
        tenant_id: tenantId,
        role: 'admin'
      },
      attributes: ['id']
    });

    const adminIds = adminDoctors.map(admin => admin.id);

    const patients = await Patient.findAll({
      include: [
        {
          model: Doctor,
          where: { 
            [Op.or]: [
              { id: { [Op.in]: adminIds } }, 
              { 
                created_by: { [Op.in]: adminIds }, 
                tenant_id: tenantId
              }
            ]
          }
        }
      ]
    });

    const patientsWithFiles = await Promise.all(patients.map(async (patient) => {
      let files = [];
      if (patient.fileIds && patient.fileIds.length > 0) {
        files = await File.findAll({
          where: { 
            id: { 
              [Op.in]: patient.fileIds 
            } 
          }
        });
      }
      return {
        ...patient.toJSON(),
        Files: files
      };
    }));

    res.status(200).json({ 
      status: 'success', 
      count: patientsWithFiles.length,
      patients: patientsWithFiles 
    });
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

    const { id } = req.params;
    const updateData = req.body;

    if (updateData.fileIds !== undefined) {
      let parsedFileIds = updateData.fileIds;
      if (typeof updateData.fileIds === 'string') {
        try {
          parsedFileIds = JSON.parse(updateData.fileIds);
        } catch (e) {
          parsedFileIds = [updateData.fileIds];
        }
      } else if (!Array.isArray(updateData.fileIds) && updateData.fileIds) {
        parsedFileIds = [updateData.fileIds];
      } else if (!updateData.fileIds) {
        parsedFileIds = [];
      }
      updateData.fileIds = parsedFileIds;
    }

    const patient = await Patient.findOne({
      where: { id },
      include: [Doctor]
    });

    if (!patient) {
      return res.status(404).json({ message: 'Hasta bulunamadı!' });
    }

    if (role === 'doctor') {
      if (patient.doctorId !== doctorId) {
        return res.status(403).json({ message: 'Bu hastayı güncelleme yetkiniz yok!' });
      }
    } else if (role === 'admin') {
      const doctorsUnderAdmin = await Doctor.findAll({
        where: { created_by: doctorId },
        attributes: ['id']
      });
      const allowedDoctorIds = [doctorId, ...doctorsUnderAdmin.map(d => d.id)];
      
      if (!allowedDoctorIds.includes(patient.doctorId)) {
        return res.status(403).json({ message: 'Bu hastayı güncelleme yetkiniz yok!' });
      }
    }

    await patient.update(updateData);
    
    const updatedPatient = await Patient.findOne({
      where: { id },
      include: [Doctor]
    });
    
    let files = [];
    if (updatedPatient.fileIds && updatedPatient.fileIds.length > 0) {
      files = await File.findAll({
        where: { 
          id: { 
            [Op.in]: updatedPatient.fileIds 
          } 
        }
      });
    }

    const patientWithFiles = {
      ...updatedPatient.toJSON(),
      Files: files
    };
    
    res.status(200).json({ status: 'success', patient: patientWithFiles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePatientByTenant = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token bulunamadı!' });
    }

    const decoded = jwt.verify(token, 'secretkey');
    if (decoded.role) {
      return res.status(403).json({ message: 'Bu işlem sadece tenant tarafından yapılabilir!' });
    }

    const tenantId = decoded.id;

    const { id } = req.params;
    const updateData = req.body;

    if (updateData.fileIds !== undefined) {
      let parsedFileIds = updateData.fileIds;
      if (typeof updateData.fileIds === 'string') {
        try {
          parsedFileIds = JSON.parse(updateData.fileIds);
        } catch (e) {
          parsedFileIds = [updateData.fileIds];
        }
      } else if (!Array.isArray(updateData.fileIds) && updateData.fileIds) {
        parsedFileIds = [updateData.fileIds];
      } else if (!updateData.fileIds) {
        parsedFileIds = [];
      }
      updateData.fileIds = parsedFileIds;
    }

    const patient = await Patient.findOne({
      where: { id },
      include: [
        {
          model: Doctor,
          where: { tenant_id: tenantId }
        }
      ]
    });

    if (!patient) {
      return res.status(404).json({ message: 'Hasta bulunamadı veya bu hastaya erişim yetkiniz yok!' });
    }

    await patient.update(updateData);
    
    const updatedPatient = await Patient.findOne({
      where: { id },
      include: [
        {
          model: Doctor,
          where: { tenant_id: tenantId }
        }
      ]
    });
    
    let files = [];
    if (updatedPatient.fileIds && updatedPatient.fileIds.length > 0) {
      files = await File.findAll({
        where: { 
          id: { 
            [Op.in]: updatedPatient.fileIds 
          } 
        }
      });
    }

    const patientWithFiles = {
      ...updatedPatient.toJSON(),
      Files: files
    };
    
    res.status(200).json({ status: 'success', patient: patientWithFiles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey'); 
    const doctorId = decoded.id;
    const role = decoded.role;

    const { id } = req.params;

    const patient = await Patient.findOne({
      where: { id },
      include: [Doctor]
    });

    if (!patient) {
      return res.status(404).json({ message: 'Hasta bulunamadı!' });
    }

    if (role === 'doctor') {
      if (patient.doctorId !== doctorId) {
        return res.status(403).json({ message: 'Bu hastayı silme yetkiniz yok!' });
      }
    } else if (role === 'admin') {
      const doctorsUnderAdmin = await Doctor.findAll({
        where: { created_by: doctorId },
        attributes: ['id']
      });
      const allowedDoctorIds = [doctorId, ...doctorsUnderAdmin.map(d => d.id)];
      
      if (!allowedDoctorIds.includes(patient.doctorId)) {
        return res.status(403).json({ message: 'Bu hastayı silme yetkiniz yok!' });
      }
    }

    await patient.destroy();
    res.status(200).json({ message: 'Hasta başarıyla silindi!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePatientByTenant = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token bulunamadı!' });
    }

    const decoded = jwt.verify(token, 'secretkey');
    if (decoded.role) {
      return res.status(403).json({ message: 'Bu işlem sadece tenant tarafından yapılabilir!' });
    }

    const tenantId = decoded.id;

    const { id } = req.params;

    const patient = await Patient.findOne({
      where: { id },
      include: [
        {
          model: Doctor,
          where: { tenant_id: tenantId }
        }
      ]
    });

    if (!patient) {
      return res.status(404).json({ message: 'Hasta bulunamadı veya bu hastaya erişim yetkiniz yok!' });
    }

    await patient.destroy();
    res.status(200).json({ message: 'Hasta başarıyla silindi!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addPatient,
  addPatientByTenant,
  getPatientInfo,
  getPatientInfoByTenant,
  updatePatient,
  updatePatientByTenant,
  deletePatient,
  deletePatientByTenant,
  getAllPatients,
  getAllPatientsByTenant,
};
