const { Doctor, Tenant } = require('../models');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const getAllDoctorsByTenant = async (req, res) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token bulunamadı.' });
    }

    const decoded = jwt.verify(token, 'secretkey');
    // Sadece tenant token'ı ile işlem yapılabilir
    if (decoded.role) {
      return res.status(403).json({ error: 'Bu işlem sadece tenant tarafından yapılabilir!' });
    }

    const tenantId = decoded.id;

    // Önce tenant'ı kontrol edelim
    const tenant = await Tenant.findByPk(tenantId);
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant bulunamadı.' });
    }

    // Önce bu tenant'a ait admin doktorları bulalım
    const adminDoctors = await Doctor.findAll({
      where: { 
        tenant_id: tenantId,
        role: 'admin',
        created_by: null // Tenant tarafından oluşturulan adminler
      },
      attributes: ['id', 'name', 'surname', 'email', 'role', 'specialization', 'phone_number', 'tenant_id', 'created_by']
    });

    // Admin doktorların ID'lerini alalım
    const adminIds = adminDoctors.map(admin => admin.id);

    // Bu admin doktorların eklediği normal doktorları bulalım
    const normalDoctors = await Doctor.findAll({
      where: {
        created_by: {
          [Op.in]: adminIds
        },
        role: 'doctor'
      },
      attributes: ['id', 'name', 'surname', 'email', 'role', 'specialization', 'phone_number', 'tenant_id', 'created_by']
    });

    // Sonuçları düzenli bir şekilde yapılandıralım
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

    // Önce isteği yapan doktoru bulalım
    const requestingDoctor = await Doctor.findByPk(jwtDoctorId);
    if (!requestingDoctor) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    const doctorId = req.params.doctorId;

    // İstenen doktoru bulalım
    const doctor = await Doctor.findOne({ 
      where: { id: doctorId },
      attributes: ['id', 'name', 'surname', 'email', 'role', 'specialization', 'phone_number', 'tenant_id', 'created_by']
    });

    if (!doctor) {
      return res.status(404).json({ error: 'Doktor bulunamadı.' });
    }

    // Yetki kontrolü
    if (requestingDoctor.role === 'admin') {
      // Admin kendi bilgilerine ve kendi oluşturduğu doktorların bilgilerine erişebilir
      if (doctorId !== jwtDoctorId && doctor.created_by !== jwtDoctorId) {
        return res.status(403).json({ error: 'Bu doktor bilgilerine erişim yetkiniz yok.' });
      }

      // Eğer alt doktor bilgisi isteniyorsa, o doktorun alt doktorlarını da getirelim
      if (doctorId === jwtDoctorId) {
        // Admin kendi bilgilerini istiyorsa, kendi oluşturduğu doktorları da getirelim
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
      // Normal doktor sadece kendi bilgilerine erişebilir
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
    // Sadece tenant token'ı ile işlem yapılabilir
    if (decoded.role) {
      return res.status(403).json({ error: 'Bu işlem sadece tenant tarafından yapılabilir!' });
    }

    const tenantId = decoded.id;
    const doctorId = req.params.doctorId;

    // Önce tenant'ı kontrol edelim
    const tenant = await Tenant.findByPk(tenantId);
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant bulunamadı.' });
    }

    // Önce bu tenant'a ait admin doktorları bulalım
    const adminDoctors = await Doctor.findAll({
      where: { 
        tenant_id: tenantId,
        role: 'admin',
        created_by: null // Tenant tarafından oluşturulan adminler
      },
      attributes: ['id']
    });

    // Admin doktorların ID'lerini alalım
    const adminIds = adminDoctors.map(admin => admin.id);

    // İstenen doktoru bulalım
    const doctor = await Doctor.findOne({
      where: { 
        id: doctorId,
        [Op.or]: [
          { id: { [Op.in]: adminIds } }, // Admin doktorlar
          { 
            created_by: { [Op.in]: adminIds }, // Admin doktorların oluşturduğu doktorlar
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

    // Önce isteği yapan doktoru bulalım
    const requestingDoctor = await Doctor.findByPk(jwtDoctorId);
    if (!requestingDoctor) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    // Güncellenecek doktoru bulalım
    const doctorToUpdate = await Doctor.findOne({ where: { id: doctorId } });
    if (!doctorToUpdate) {
      return res.status(404).json({ error: 'Doktor bulunamadı.' });
    }

    // Yetki kontrolü
    if (requestingDoctor.role === 'admin') {
      // Admin doktor, kendisini veya kendi oluşturduğu doktorları güncelleyebilir
      if (doctorId !== jwtDoctorId && doctorToUpdate.created_by !== jwtDoctorId) {
        return res.status(403).json({ error: 'Bu doktoru güncelleme yetkiniz yok.' });
      }
    } else {
      // Normal doktor sadece kendisini güncelleyebilir
      if (doctorId !== jwtDoctorId) {
        return res.status(403).json({ error: 'Sadece kendi bilgilerinizi güncelleyebilirsiniz.' });
      }
    }

    // Şifre değiştirme işlemi varsa
    if (oldPassword || newPassword || confirmNewPassword) {
      // Tüm şifre alanları zorunlu
      if (!oldPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ error: 'Şifre değiştirmek için eski şifre, yeni şifre ve yeni şifre tekrarı gereklidir.' });
      }

      // Yeni şifrelerin eşleşme kontrolü
      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: 'Yeni şifreler eşleşmiyor.' });
      }

      // Eski şifre kontrolü
      const isOldPasswordValid = await bcrypt.compare(oldPassword, doctorToUpdate.password);
      if (!isOldPasswordValid) {
        return res.status(400).json({ error: 'Eski şifre yanlış.' });
      }

      // Yeni şifreyi hashle
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      doctorToUpdate.password = hashedNewPassword;
    }

    doctorToUpdate.name = name || doctorToUpdate.name;
    doctorToUpdate.surname = surname || doctorToUpdate.surname;
    doctorToUpdate.specialization = specialization || doctorToUpdate.specialization;
    doctorToUpdate.phone_number = phone_number || doctorToUpdate.phone_number;

    await doctorToUpdate.save();

    // Şifreyi response'dan çıkar
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
    // Sadece tenant token'ı ile işlem yapılabilir
    if (decoded.role) {
      return res.status(403).json({ error: 'Bu işlem sadece tenant tarafından yapılabilir!' });
    }

    const tenantId = decoded.id;
    const doctorId = req.params.doctorId;
    const { name, surname, specialization, phone_number, oldPassword, newPassword, confirmNewPassword } = req.body;

    // Önce tenant'ı kontrol edelim
    const tenant = await Tenant.findByPk(tenantId);
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant bulunamadı.' });
    }

    // Önce bu tenant'a ait admin doktorları bulalım
    const adminDoctors = await Doctor.findAll({
      where: { 
        tenant_id: tenantId,
        role: 'admin',
        created_by: null // Tenant tarafından oluşturulan adminler
      },
      attributes: ['id']
    });

    // Admin doktorların ID'lerini alalım
    const adminIds = adminDoctors.map(admin => admin.id);

    // Güncellenecek doktoru bulalım
    const doctorToUpdate = await Doctor.findOne({
      where: { 
        id: doctorId,
        [Op.or]: [
          { id: { [Op.in]: adminIds } }, // Admin doktorlar
          { 
            created_by: { [Op.in]: adminIds }, // Admin doktorların oluşturduğu doktorlar
            tenant_id: tenantId
          }
        ]
      }
    });

    if (!doctorToUpdate) {
      return res.status(404).json({ error: 'Doktor bulunamadı veya bu doktora erişim yetkiniz yok.' });
    }

    // Doktor admin mi kontrol edelim
    if (doctorToUpdate.role === 'admin' && doctorToUpdate.created_by !== null) {
      return res.status(403).json({ error: 'Başka bir admin tarafından oluşturulan admin doktoru güncelleyemezsiniz.' });
    }

    // Şifre değiştirme işlemi varsa
    if (oldPassword || newPassword || confirmNewPassword) {
      // Tüm şifre alanları zorunlu
      if (!oldPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ error: 'Şifre değiştirmek için eski şifre, yeni şifre ve yeni şifre tekrarı gereklidir.' });
      }

      // Yeni şifrelerin eşleşme kontrolü
      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: 'Yeni şifreler eşleşmiyor.' });
      }

      // Eski şifre kontrolü
      const isOldPasswordValid = await bcrypt.compare(oldPassword, doctorToUpdate.password);
      if (!isOldPasswordValid) {
        return res.status(400).json({ error: 'Eski şifre yanlış.' });
      }

      // Yeni şifreyi hashle
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      doctorToUpdate.password = hashedNewPassword;
    }

    doctorToUpdate.name = name || doctorToUpdate.name;
    doctorToUpdate.surname = surname || doctorToUpdate.surname;
    doctorToUpdate.specialization = specialization || doctorToUpdate.specialization;
    doctorToUpdate.phone_number = phone_number || doctorToUpdate.phone_number;

    await doctorToUpdate.save();

    // Güncellenmiş doktoru tüm bilgileriyle birlikte getirelim (şifre hariç)
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

    // Önce isteği yapan doktoru bulalım
    const requestingDoctor = await Doctor.findByPk(jwtDoctorId);
    if (!requestingDoctor) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }

    const doctorId = req.params.doctorId;

    // Silinecek doktoru bulalım
    const doctorToDelete = await Doctor.findOne({ 
      where: { id: doctorId },
      attributes: ['id', 'role', 'created_by', 'tenant_id']
    });

    if (!doctorToDelete) {
      return res.status(404).json({ error: 'Silinecek doktor bulunamadı.' });
    }

    // Kendini silmeye çalışıyorsa engelle
    if (doctorId === jwtDoctorId) {
      return res.status(403).json({ error: 'Kendinizi silemezsiniz.' });
    }

    // Admin doktor kontrolü
    if (requestingDoctor.role === 'admin') {
      // Admin sadece kendi oluşturduğu doktorları silebilir
      if (doctorToDelete.created_by !== jwtDoctorId) {
        return res.status(403).json({ error: 'Bu doktoru silme yetkiniz yok. Sadece kendi oluşturduğunuz doktorları silebilirsiniz.' });
      }

      // Admin başka bir admini silemez
      if (doctorToDelete.role === 'admin') {
        return res.status(403).json({ error: 'Admin doktorları silemezsiniz.' });
      }

      // Alt doktorları bul
      const subDoctors = await Doctor.findAll({
        where: { created_by: doctorId }
      });

      // Alt doktorları sil
      for (const subDoctor of subDoctors) {
        await subDoctor.destroy();
      }

      await doctorToDelete.destroy();

      return res.status(200).json({ 
        message: subDoctors.length > 0 ? 'Doktor alt doktorlarıyla birlikte silindi.' : 'Doktor silindi.' 
      });
    } else {
      // Normal doktor hiçbir şey silemez
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
    // Sadece tenant token'ı ile işlem yapılabilir
    if (decoded.role) {
      return res.status(403).json({ error: 'Bu işlem sadece tenant tarafından yapılabilir!' });
    }

    const tenantId = decoded.id;
    const doctorId = req.params.doctorId;

    // Önce tenant'ı kontrol edelim
    const tenant = await Tenant.findByPk(tenantId);
    if (!tenant) {
      return res.status(404).json({ error: 'Tenant bulunamadı.' });
    }

    // Silinecek doktoru bulalım
    const doctorToDelete = await Doctor.findOne({
      where: { id: doctorId },
      attributes: ['id', 'role', 'created_by', 'tenant_id']
    });

    if (!doctorToDelete) {
      return res.status(404).json({ error: 'Silinecek doktor bulunamadı.' });
    }

    // Doktorun tenant'a ait olup olmadığını kontrol et
    if (doctorToDelete.tenant_id !== tenantId) {
      return res.status(403).json({ error: 'Bu doktor sizin tenant\'ınıza ait değil!' });
    }

    // Eğer doktor admin ise, başka bir admin tarafından oluşturulup oluşturulmadığını kontrol et
    if (doctorToDelete.role === 'admin') {
      // created_by null ise tenant tarafından oluşturulmuş demektir
      if (doctorToDelete.created_by !== null) {
        return res.status(403).json({ error: 'Başka bir admin tarafından oluşturulan admin doktoru silemezsiniz!' });
      }
    }

    // Alt doktorları bul
    const subDoctors = await Doctor.findAll({
      where: { created_by: doctorId }
    });

    // Alt doktorları sil
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
