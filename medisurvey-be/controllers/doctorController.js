const { Doctor, Tenant } = require('../models');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const getAllDoctorsByTenant = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token bulunamadı.' });
    }

    const decoded = jwt.verify(token, 'secretkey');
    if (decoded.role) {
      return res.status(403).json({ error: 'Bu işlem sadece tenant tarafından yapılabilir!' });
    }

    const tenantId = decoded.id;

    const tenant = await Tenant.findByPk(tenantId);
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant bulunamadı.' });
    }

    const adminDoctors = await Doctor.findAll({
      where: { 
        tenant_id: tenantId,
        role: 'admin',
        created_by: null 
      },
      attributes: ['id', 'name', 'surname', 'email', 'role', 'specialization', 'phone_number', 'tenant_id', 'created_by']
    });

    const adminIds = adminDoctors.map(admin => admin.id);

    const normalDoctors = await Doctor.findAll({
      where: {
        created_by: {
          [Op.in]: adminIds
        },
        role: 'doctor'
      },
      attributes: ['id', 'name', 'surname', 'email', 'role', 'specialization', 'phone_number', 'tenant_id', 'created_by']
    });

    const result = {
      tenant: {
        id: tenant.id,
        name: tenant.name
      },
      doctors: {
        admins: adminDoctors.map(admin => ({
          ...admin.dataValues,
          normalDoctors: normalDoctors.filter(doc => doc.created_by === admin.id)
        }))
      }
    };

    return res.status(200).json(result);
  } catch (error) {
    console.error('Detaylı Hata:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Geçersiz token.' });
    }
    res.status(500).json({ 
      error: 'Doktor bilgileri alınırken bir hata oluştu.', 
      details: error.message 
    });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token bulunamadı.' });
    }

    const decoded = jwt.verify(token, 'secretkey');
    const { id } = decoded;

    const requestingDoctor = await Doctor.findByPk(id);
    if (!requestingDoctor) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    let whereClause = {};
    if (requestingDoctor.role === 'admin') {
      whereClause = { created_by: id };
    } else {
      whereClause = { id: requestingDoctor.id };
    }

    const doctors = await Doctor.findAll({
      where: whereClause
    });

    res.status(200).json(doctors);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Doktor bilgileri alınırken bir hata oluştu.' });
  }
};

const getDoctorInfo = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token bulunamadı.' });
    }

    const decoded = jwt.verify(token, 'secretkey');
    const jwtDoctorId = decoded.id;

    const requestingDoctor = await Doctor.findByPk(jwtDoctorId);
    if (!requestingDoctor) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    const doctorId = req.params.doctorId;

    const doctor = await Doctor.findOne({ 
      where: { id: doctorId },
      attributes: ['id', 'name', 'surname', 'email', 'role', 'specialization', 'phone_number', 'tenant_id', 'created_by']
    });

    if (!doctor) {
      return res.status(404).json({ error: 'Doktor bulunamadı.' });
    }

    if (requestingDoctor.role === 'admin') {
      if (doctorId !== jwtDoctorId && doctor.created_by !== jwtDoctorId) {
        return res.status(403).json({ error: 'Bu doktor bilgilerine erişim yetkiniz yok.' });
      }

      if (doctorId === jwtDoctorId) {
        const subDoctors = await Doctor.findAll({
          where: { created_by: jwtDoctorId },
          attributes: ['id', 'name', 'surname', 'email', 'role', 'specialization', 'phone_number', 'tenant_id', 'created_by']
        });

        return res.status(200).json({
          doctor: doctor,
          subDoctors: subDoctors
        });
      }
    } else {
      if (doctorId !== jwtDoctorId) {
        return res.status(403).json({ error: 'Sadece kendi bilgilerinize erişebilirsiniz.' });
      }
    }

    res.status(200).json({ doctor: doctor });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Doktor bilgileri alınırken bir hata oluştu.' });
  }
};

const getDoctorInfoByTenant = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token bulunamadı.' });
    }

    const decoded = jwt.verify(token, 'secretkey');
    if (decoded.role) {
      return res.status(403).json({ error: 'Bu işlem sadece tenant tarafından yapılabilir!' });
    }

    const tenantId = decoded.id;
    const doctorId = req.params.doctorId;

    const tenant = await Tenant.findByPk(tenantId);
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant bulunamadı.' });
    }

    const adminDoctors = await Doctor.findAll({
      where: { 
        tenant_id: tenantId,
        role: 'admin',
        created_by: null 
      },
      attributes: ['id']
    });

    const adminIds = adminDoctors.map(admin => admin.id);

    const doctor = await Doctor.findOne({
      where: { 
        id: doctorId,
        [Op.or]: [
          { id: { [Op.in]: adminIds } }, 
          { 
            created_by: { [Op.in]: adminIds }, 
            tenant_id: tenantId
          }
        ]
      },
      attributes: ['id', 'name', 'surname', 'email', 'role', 'specialization', 'phone_number', 'tenant_id', 'created_by']
    });

    if (!doctor) {
      return res.status(404).json({ error: 'Doktor bulunamadı veya bu doktora erişim yetkiniz yok.' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Doktor bilgileri alınırken bir hata oluştu.' });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
    const jwtDoctorId = decoded.id;

    const doctorId = req.params.doctorId;
    const { name, surname, specialization, phone_number, oldPassword, newPassword, confirmNewPassword } = req.body;

    const requestingDoctor = await Doctor.findByPk(jwtDoctorId);
    if (!requestingDoctor) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    const doctorToUpdate = await Doctor.findOne({ where: { id: doctorId } });
    if (!doctorToUpdate) {
      return res.status(404).json({ error: 'Doktor bulunamadı.' });
    }

    if (requestingDoctor.role === 'admin') {
      if (doctorId !== jwtDoctorId && doctorToUpdate.created_by !== jwtDoctorId) {
        return res.status(403).json({ error: 'Bu doktoru güncelleme yetkiniz yok.' });
      }
    } else {
      if (doctorId !== jwtDoctorId) {
        return res.status(403).json({ error: 'Sadece kendi bilgilerinizi güncelleyebilirsiniz.' });
      }
    }

    if (oldPassword || newPassword || confirmNewPassword) {
      if (!oldPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ error: 'Şifre değiştirmek için eski şifre, yeni şifre ve yeni şifre tekrarı gereklidir.' });
      }

      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: 'Yeni şifreler eşleşmiyor.' });
      }

      const isOldPasswordValid = await bcrypt.compare(oldPassword, doctorToUpdate.password);
      if (!isOldPasswordValid) {
        return res.status(400).json({ error: 'Eski şifre yanlış.' });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      doctorToUpdate.password = hashedNewPassword;
    }

    doctorToUpdate.name = name || doctorToUpdate.name;
    doctorToUpdate.surname = surname || doctorToUpdate.surname;
    doctorToUpdate.specialization = specialization || doctorToUpdate.specialization;
    doctorToUpdate.phone_number = phone_number || doctorToUpdate.phone_number;

    await doctorToUpdate.save();

    const doctorResponse = {
      id: doctorToUpdate.id,
      name: doctorToUpdate.name,
      surname: doctorToUpdate.surname,
      email: doctorToUpdate.email,
      role: doctorToUpdate.role,
      specialization: doctorToUpdate.specialization,
      phone_number: doctorToUpdate.phone_number,
      tenant_id: doctorToUpdate.tenant_id,
      created_by: doctorToUpdate.created_by
    };

    res.status(200).json({ 
      message: 'Doktor başarıyla güncellendi.', 
      doctor: doctorResponse 
    });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Doktor güncellenirken bir hata oluştu.' });
  }
};

const updateDoctorByTenant = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token bulunamadı.' });
    }

    const decoded = jwt.verify(token, 'secretkey');
    if (decoded.role) {
      return res.status(403).json({ error: 'Bu işlem sadece tenant tarafından yapılabilir!' });
    }

    const tenantId = decoded.id;
    const doctorId = req.params.doctorId;
    const { name, surname, specialization, phone_number, oldPassword, newPassword, confirmNewPassword } = req.body;


    const tenant = await Tenant.findByPk(tenantId);
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant bulunamadı.' });
    }

    const adminDoctors = await Doctor.findAll({
      where: { 
        tenant_id: tenantId,
        role: 'admin',
        created_by: null 
      },
      attributes: ['id']
    });


    const adminIds = adminDoctors.map(admin => admin.id);


    const doctorToUpdate = await Doctor.findOne({
      where: { 
        id: doctorId,
        [Op.or]: [
          { id: { [Op.in]: adminIds } }, 
          { 
            created_by: { [Op.in]: adminIds },
            tenant_id: tenantId
          }
        ]
      }
    });

    if (!doctorToUpdate) {
      return res.status(404).json({ error: 'Doktor bulunamadı veya bu doktora erişim yetkiniz yok.' });
    }


    if (doctorToUpdate.role === 'admin' && doctorToUpdate.created_by !== null) {
      return res.status(403).json({ error: 'Başka bir admin tarafından oluşturulan admin doktoru güncelleyemezsiniz.' });
    }


    if (oldPassword || newPassword || confirmNewPassword) {

      if (!oldPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ error: 'Şifre değiştirmek için eski şifre, yeni şifre ve yeni şifre tekrarı gereklidir.' });
      }


      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: 'Yeni şifreler eşleşmiyor.' });
      }


      const isOldPasswordValid = await bcrypt.compare(oldPassword, doctorToUpdate.password);
      if (!isOldPasswordValid) {
        return res.status(400).json({ error: 'Eski şifre yanlış.' });
      }


      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      doctorToUpdate.password = hashedNewPassword;
    }

    doctorToUpdate.name = name || doctorToUpdate.name;
    doctorToUpdate.surname = surname || doctorToUpdate.surname;
    doctorToUpdate.specialization = specialization || doctorToUpdate.specialization;
    doctorToUpdate.phone_number = phone_number || doctorToUpdate.phone_number;

    await doctorToUpdate.save();


    const updatedDoctor = {
      id: doctorToUpdate.id,
      name: doctorToUpdate.name,
      surname: doctorToUpdate.surname,
      email: doctorToUpdate.email,
      role: doctorToUpdate.role,
      specialization: doctorToUpdate.specialization,
      phone_number: doctorToUpdate.phone_number,
      tenant_id: doctorToUpdate.tenant_id,
      created_by: doctorToUpdate.created_by
    };

    res.status(200).json({ 
      message: 'Doktor başarıyla güncellendi.', 
      doctor: updatedDoctor 
    });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Doktor güncellenirken bir hata oluştu.' });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token bulunamadı.' });
    }

    const decoded = jwt.verify(token, 'secretkey');
    const jwtDoctorId = decoded.id;


    const requestingDoctor = await Doctor.findByPk(jwtDoctorId);
    if (!requestingDoctor) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    const doctorId = req.params.doctorId;


    const doctorToDelete = await Doctor.findOne({ 
      where: { id: doctorId },
      attributes: ['id', 'role', 'created_by', 'tenant_id']
    });

    if (!doctorToDelete) {
      return res.status(404).json({ error: 'Silinecek doktor bulunamadı.' });
    }


    if (doctorId === jwtDoctorId) {
      return res.status(403).json({ error: 'Kendinizi silemezsiniz.' });
    }


    if (requestingDoctor.role === 'admin') {

      if (doctorToDelete.created_by !== jwtDoctorId) {
        return res.status(403).json({ error: 'Bu doktoru silme yetkiniz yok. Sadece kendi oluşturduğunuz doktorları silebilirsiniz.' });
      }


      if (doctorToDelete.role === 'admin') {
        return res.status(403).json({ error: 'Admin doktorları silemezsiniz.' });
      }


      const subDoctors = await Doctor.findAll({
        where: { created_by: doctorId }
      });


      for (const subDoctor of subDoctors) {
        await subDoctor.destroy();
      }

      await doctorToDelete.destroy();

      return res.status(200).json({ 
        message: subDoctors.length > 0 ? 'Doktor alt doktorlarıyla birlikte silindi.' : 'Doktor silindi.' 
      });
    } else {

      return res.status(403).json({ error: 'Doktor silme yetkiniz yok.' });
    }
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Doktor silinirken bir hata oluştu.' });
  }
};

const deleteDoctorByTenant = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token bulunamadı.' });
    }

    const decoded = jwt.verify(token, 'secretkey');

    if (decoded.role) {
      return res.status(403).json({ error: 'Bu işlem sadece tenant tarafından yapılabilir!' });
    }

    const tenantId = decoded.id;
    const doctorId = req.params.doctorId;


    const tenant = await Tenant.findByPk(tenantId);
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant bulunamadı.' });
    }


    const doctorToDelete = await Doctor.findOne({
      where: { id: doctorId },
      attributes: ['id', 'role', 'created_by', 'tenant_id']
    });

    if (!doctorToDelete) {
      return res.status(404).json({ error: 'Silinecek doktor bulunamadı.' });
    }


    if (doctorToDelete.tenant_id !== tenantId) {
      return res.status(403).json({ error: 'Bu doktor sizin tenant\'ınıza ait değil!' });
    }


    if (doctorToDelete.role === 'admin') {

      if (doctorToDelete.created_by !== null) {
        return res.status(403).json({ error: 'Başka bir admin tarafından oluşturulan admin doktoru silemezsiniz!' });
      }
    }


    const subDoctors = await Doctor.findAll({
      where: { created_by: doctorId }
    });


    for (const subDoctor of subDoctors) {
      await subDoctor.destroy();
    }

    await doctorToDelete.destroy();

    return res.status(200).json({ 
      message: subDoctors.length > 0 ? 'Doktor alt doktorlarıyla birlikte silindi.' : 'Doktor silindi.' 
    });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).json({ error: 'Doktor silinirken bir hata oluştu.' });
  }
};

module.exports = { getAllDoctors, getAllDoctorsByTenant, updateDoctor, updateDoctorByTenant, deleteDoctor, deleteDoctorByTenant, getDoctorInfo, getDoctorInfoByTenant };
