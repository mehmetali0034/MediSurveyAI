const File = require('../models/File');
const Doctor = require('../models/Doctor');
const Form = require('../models/Form');
const { Op } = require('sequelize');

const fileController = {
  getAllFiles: async (req, res) => {
    try {
      let whereCondition = {};
      
      if (req.user.role === 'doctor') {
        const doctor = await Doctor.findOne({
          where: { id: req.user.id }
        });
        
        if (!doctor) {
          return res.status(404).json({ message: 'Doktor bulunamadı' });
        }
        
        if (doctor.created_by) {
          whereCondition = {
            created_by: {
              [Op.in]: [req.user.id, doctor.created_by]
            }
          };
        } else {
          whereCondition = {
            created_by: req.user.id
          };
        }
      } else if (req.user.role === 'admin') {
        const doctors = await Doctor.findAll({
          where: {
            created_by: req.user.id
          },
          attributes: ['id']
        });

        const doctorIds = doctors.map(doctor => doctor.id);
        doctorIds.push(req.user.id); 

        whereCondition = {
          created_by: {
            [Op.in]: doctorIds
          }
        };
      }

      const files = await File.findAll({
        where: whereCondition,
        include: [
          {
            model: Form,
            attributes: ['id', 'name', 'description', 'type']
          }
        ]
      });
      res.json(files);
    } catch (error) {
      console.error('Get All Files Error:', error);
      res.status(500).json({ message: error.message });
    }
  },

  getFile: async (req, res) => {
    try {
      let whereCondition = {
        id: req.params.id
      };

      if (req.user.role === 'doctor') {
        const doctor = await Doctor.findOne({
          where: { id: req.user.id }
        });
        
        if (!doctor) {
          return res.status(404).json({ message: 'Doktor bulunamadı' });
        }
        
        if (doctor.created_by) {
          whereCondition.created_by = {
            [Op.in]: [req.user.id, doctor.created_by]
          };
        } else {
          whereCondition.created_by = req.user.id;
        }
      } else if (req.user.role === 'admin') {
        const doctors = await Doctor.findAll({
          where: {
            created_by: req.user.id
          },
          attributes: ['id']
        });

        const doctorIds = doctors.map(doctor => doctor.id);
        doctorIds.push(req.user.id); 

        whereCondition.created_by = {
          [Op.in]: doctorIds
        };
      }

      const file = await File.findOne({
        where: whereCondition,
        include: [
          {
            model: Form,
            attributes: ['id', 'name', 'description', 'type']
          }
        ]
      });

      if (!file) {
        return res.status(404).json({ message: 'Dosya bulunamadı' });
      }
      res.json(file);
    } catch (error) {
      console.error('Get File Error:', error);
      res.status(500).json({ message: error.message });
    }
  },

  createFile: async (req, res) => {
    try {
      console.log('File creation req.user:', req.user);
      console.log('File creation request body:', JSON.stringify(req.body));
      
      const creatorId = req.user.id;
      if (!creatorId) {
        console.error('Dosya oluştururken kullanıcı kimliği bulunamadı:', req.user);
        return res.status(400).json({ message: 'Kullanıcı kimliği bulunamadı' });
      }
      
      console.log('File will be created with created_by:', creatorId);
      
      const file = await File.create({
        ...req.body,
        created_by: creatorId
      });
      
      const fileWithForms = await File.findOne({
        where: { id: file.id },
        include: [
          {
            model: Form,
            attributes: ['id', 'name', 'description', 'type']
          }
        ]
      });
      
      console.log('Dosya başarıyla oluşturuldu:', file.id);
      res.status(201).json(fileWithForms);
    } catch (error) {
      console.error('Create File Error:', error);
      console.error('Create File Error Stack:', error.stack);
      console.error('Request user:', req.user);
      console.error('Request body:', req.body);
      res.status(400).json({ message: error.message });
    }
  },

  updateFile: async (req, res) => {
    try {
      let whereCondition = {
        id: req.params.id
      };

      if (req.user.role === 'doctor') {
        whereCondition.created_by = req.user.id;
      } else if (req.user.role === 'admin') {
        const doctors = await Doctor.findAll({
          where: {
            created_by: req.user.id
          },
          attributes: ['id']
        });

        const doctorIds = doctors.map(doctor => doctor.id);
        doctorIds.push(req.user.id); 

        whereCondition.created_by = {
          [Op.in]: doctorIds
        };
      }

      const file = await File.findOne({
        where: whereCondition
      });

      if (!file) {
        return res.status(404).json({ message: 'Dosya bulunamadı' });
      }
      await file.update(req.body);
      
      const updatedFile = await File.findOne({
        where: { id: file.id },
        include: [
          {
            model: Form,
            attributes: ['id', 'name', 'description', 'type']
          }
        ]
      });
      
      res.json(updatedFile);
    } catch (error) {
      console.error('Update File Error:', error);
      res.status(400).json({ message: error.message });
    }
  },

  deleteFile: async (req, res) => {
    try {
      console.log('Dosya silme isteği, id:', req.params.id, 'user:', req.user.id);
      
      let whereCondition = {
        id: req.params.id
      };

      if (req.user.role === 'doctor') {
        whereCondition.created_by = req.user.id;
      } else if (req.user.role === 'admin') {
        const doctors = await Doctor.findAll({
          where: {
            created_by: req.user.id
          },
          attributes: ['id']
        });

        const doctorIds = doctors.map(doctor => doctor.id);
        doctorIds.push(req.user.id);

        whereCondition.created_by = {
          [Op.in]: doctorIds
        };
      }

      const file = await File.findOne({
        where: whereCondition,
        include: [
          {
            model: Form,
            attributes: ['id', 'name', 'description', 'type']
          }
        ]
      });

      if (!file) {
        return res.status(404).json({ message: 'Dosya bulunamadı' });
      }
      
      try {
        await file.destroy();
        console.log('Dosya başarıyla silindi, id:', req.params.id);
        res.json({ message: 'Dosya başarıyla silindi' });
      } catch (deleteError) {
        console.error('Dosya silme hatası (referans kısıtlaması):', deleteError);
        if (deleteError.name === 'SequelizeForeignKeyConstraintError') {
          return res.status(400).json({ 
            message: 'Bu dosya kullanımda olduğu için silinemiyor. Önce bu dosyaya bağlı formları silmelisiniz.',
            details: deleteError.message 
          });
        }
        throw deleteError; 
      }
    } catch (error) {
      console.error('Delete File Error:', error);
      console.error('Delete File Error Stack:', error.stack);
      res.status(500).json({ message: error.message });
    }
  },

  getAllFilesForTenant: async (req, res) => {
    try {
      console.log('Tenant dosyaları getiriliyor, tenant_id:', req.user.tenant_id);
      
      if (!req.user.tenant_id) {
        console.error('Tenant ID bulunamadı, kullanıcı:', req.user);
        return res.status(400).json({ message: 'Tenant ID bulunamadı' });
      }

      const doctors = await Doctor.findAll({
        where: {
          tenant_id: req.user.tenant_id
        },
        attributes: ['id']
      });
      
      console.log('Bulunan doktor sayısı:', doctors.length);
      
      if (doctors.length === 0) {
        console.log('Bu tenant ID\'ye bağlı doktor bulunamadı:', req.user.tenant_id);
        return res.json([]);  
      }

      const doctorIds = doctors.map(doctor => doctor.id);
      console.log('Doktor ID\'leri:', doctorIds);

      const files = await File.findAll({
        where: {
          created_by: {
            [Op.in]: doctorIds
          }
        },
        include: [
          {
            model: Form,
            attributes: ['id', 'name', 'description', 'type']
          }
        ]
      });
      
      console.log('Bulunan dosya sayısı:', files.length);
      res.json(files);
    } catch (error) {
      console.error('Get All Files for Tenant Error:', error);
      console.error('Tenant kullanıcı bilgileri:', req.user);
      res.status(500).json({ message: error.message });
    }
  },

  getFileForTenant: async (req, res) => {
    try {
      const doctors = await Doctor.findAll({
        where: {
          tenant_id: req.user.tenant_id
        },
        attributes: ['id']
      });

      const doctorIds = doctors.map(doctor => doctor.id);

      const file = await File.findOne({
        where: {
          id: req.params.id,
          created_by: {
            [Op.in]: doctorIds
          }
        },
        include: [
          {
            model: Form,
            attributes: ['id', 'name', 'description', 'type']
          }
        ]
      });

      if (!file) {
        return res.status(404).json({ message: 'Dosya bulunamadı' });
      }
      res.json(file);
    } catch (error) {
      console.error('Get File for Tenant Error:', error);
      res.status(500).json({ message: error.message });
    }
  },

  updateFileForTenant: async (req, res) => {
    try {
      const doctors = await Doctor.findAll({
        where: {
          tenant_id: req.user.tenant_id
        },
        attributes: ['id']
      });

      const doctorIds = doctors.map(doctor => doctor.id);

      const file = await File.findOne({
        where: {
          id: req.params.id,
          created_by: {
            [Op.in]: doctorIds
          }
        }
      });

      if (!file) {
        return res.status(404).json({ message: 'Dosya bulunamadı' });
      }
      await file.update(req.body);
      
      const updatedFile = await File.findOne({
        where: { id: file.id },
        include: [
          {
            model: Form,
            attributes: ['id', 'name', 'description', 'type']
          }
        ]
      });
      
      res.json(updatedFile);
    } catch (error) {
      console.error('Update File for Tenant Error:', error);
      res.status(400).json({ message: error.message });
    }
  },

  deleteFileForTenant: async (req, res) => {
    try {
      console.log('Tenant dosya silme isteği, id:', req.params.id, 'tenant_id:', req.user.tenant_id);
      
      if (!req.user.tenant_id) {
        console.error('Tenant ID bulunamadı, kullanıcı:', req.user);
        return res.status(400).json({ message: 'Tenant ID bulunamadı' });
      }

      const doctors = await Doctor.findAll({
        where: {
          tenant_id: req.user.tenant_id
        },
        attributes: ['id']
      });
      
      console.log('Bulunan doktor sayısı:', doctors.length);
      
      if (doctors.length === 0) {
        console.log('Bu tenant ID\'ye bağlı doktor bulunamadı:', req.user.tenant_id);
        return res.status(404).json({ message: 'Bu tenant ID\'ye bağlı doktor bulunamadı' });
      }

      const doctorIds = doctors.map(doctor => doctor.id);
      console.log('Doktor ID\'leri:', doctorIds);

      const file = await File.findOne({
        where: {
          id: req.params.id,
          created_by: {
            [Op.in]: doctorIds
          }
        },
        include: [
          {
            model: Form,
            attributes: ['id', 'name', 'description', 'type']
          }
        ]
      });

      if (!file) {
        return res.status(404).json({ message: 'Dosya bulunamadı' });
      }
      
      try {
        await file.destroy();
        console.log('Dosya başarıyla silindi, id:', req.params.id);
        res.json({ message: 'Dosya başarıyla silindi' });
      } catch (deleteError) {
        console.error('Dosya silme hatası (referans kısıtlaması):', deleteError);
        if (deleteError.name === 'SequelizeForeignKeyConstraintError') {
          return res.status(400).json({ 
            message: 'Bu dosya kullanımda olduğu için silinemiyor. Önce bu dosyaya bağlı formları silmelisiniz.',
            details: deleteError.message 
          });
        }
        throw deleteError; 
      }
    } catch (error) {
      console.error('Delete File for Tenant Error:', error);
      console.error('Delete File Error Stack:', error.stack);
      console.error('Tenant kullanıcı bilgileri:', req.user);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = fileController; 