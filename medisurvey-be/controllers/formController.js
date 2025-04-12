const Form = require('../models/Form');
const Doctor = require('../models/Doctor');
const { Op } = require('sequelize');

const formController = {
  getAllForms: async (req, res) => {
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

      const forms = await Form.findAll({
        where: whereCondition
      });
      res.json(forms);
    } catch (error) {
      console.error('Get All Forms Error:', error);
      res.status(500).json({ message: error.message });
    }
  },

  getForm: async (req, res) => {
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

      const form = await Form.findOne({
        where: whereCondition
      });

      if (!form) {
        return res.status(404).json({ message: 'Form bulunamadı' });
      }
      res.json(form);
    } catch (error) {
      console.error('Get Form Error:', error);
      res.status(500).json({ message: error.message });
    }
  },

  createForm: async (req, res) => {
    try {
      console.log('Form creation req.user:', req.user);
      console.log('Form creation request body:', JSON.stringify(req.body));
      
      const creatorId = req.user.id;
      if (!creatorId) {
        console.error('Form oluştururken kullanıcı kimliği bulunamadı:', req.user);
        return res.status(400).json({ message: 'Kullanıcı kimliği bulunamadı' });
      }
      
      console.log('Form will be created with created_by:', creatorId);
      
      const formData = {
        ...req.body,
        created_by: creatorId
      };

      if (formData.fileId && !formData.file_id) {
        console.log('fileId alanı file_id olarak dönüştürülüyor:', formData.fileId);
        formData.file_id = formData.fileId;
        delete formData.fileId;
      }
      
      if (!formData.file_id) {
        console.error('Form oluşturulurken gerekli file_id alanı eksik:', formData);
        return res.status(400).json({ message: 'file_id alanı gereklidir' });
      }
      
      console.log('Form oluşturulacak veriler:', formData);
      const form = await Form.create(formData);
      
      console.log('Form başarıyla oluşturuldu:', form.id);
      res.status(201).json(form);
    } catch (error) {
      console.error('Create Form Error:', error);
      console.error('Create Form Error Stack:', error.stack);
      console.error('Request user:', req.user);
      console.error('Request body:', req.body);
      res.status(400).json({ message: error.message });
    }
  },

  updateForm: async (req, res) => {
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

      const form = await Form.findOne({
        where: whereCondition
      });

      if (!form) {
        return res.status(404).json({ message: 'Form bulunamadı' });
      }
      await form.update(req.body);
      res.json(form);
    } catch (error) {
      console.error('Update Form Error:', error);
      res.status(400).json({ message: error.message });
    }
  },

  deleteForm: async (req, res) => {
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

      const form = await Form.findOne({
        where: whereCondition
      });

      if (!form) {
        return res.status(404).json({ message: 'Form bulunamadı' });
      }
      await form.destroy();
      res.json({ message: 'Form başarıyla silindi' });
    } catch (error) {
      console.error('Delete Form Error:', error);
      res.status(500).json({ message: error.message });
    }
  },

  getAllFormsForTenant: async (req, res) => {
    try {
      console.log('Tenant formları getiriliyor, tenant_id:', req.user.tenant_id);
      
      if (!req.user.tenant_id) {
        console.error('Tenant ID bulunamadı, kullanıcı:', req.user);
        return res.status(400).json({ message: 'Tenant ID bulunamadı' });
      }
      
      // Tenant'ın doktorlarını bul
      const doctors = await Doctor.findAll({
        where: {
          tenant_id: req.user.tenant_id
        },
        attributes: ['id']
      });
      
      console.log('Bulunan doktor sayısı:', doctors.length);
      
      if (doctors.length === 0) {
        console.log('Bu tenant ID\'ye bağlı doktor bulunamadı:', req.user.tenant_id);
        return res.json([]);  // Boş array dön
      }

      const doctorIds = doctors.map(doctor => doctor.id);
      console.log('Doktor ID\'leri:', doctorIds);

      const forms = await Form.findAll({
        where: {
          created_by: {
            [Op.in]: doctorIds
          }
        }
      });
      
      console.log('Bulunan form sayısı:', forms.length);
      res.json(forms);
    } catch (error) {
      console.error('Get All Forms for Tenant Error:', error);
      console.error('Tenant kullanıcı bilgileri:', req.user);
      res.status(500).json({ message: error.message });
    }
  },

  getFormForTenant: async (req, res) => {
    try {
      const doctors = await Doctor.findAll({
        where: {
          tenant_id: req.user.tenant_id
        },
        attributes: ['id']
      });

      const doctorIds = doctors.map(doctor => doctor.id);

      const form = await Form.findOne({
        where: {
          id: req.params.id,
          created_by: {
            [Op.in]: doctorIds
          }
        }
      });

      if (!form) {
        return res.status(404).json({ message: 'Form bulunamadı' });
      }
      res.json(form);
    } catch (error) {
      console.error('Get Form for Tenant Error:', error);
      res.status(500).json({ message: error.message });
    }
  },

  updateFormForTenant: async (req, res) => {
    try {
      const doctors = await Doctor.findAll({
        where: {
          tenant_id: req.user.tenant_id
        },
        attributes: ['id']
      });

      const doctorIds = doctors.map(doctor => doctor.id);

      const form = await Form.findOne({
        where: {
          id: req.params.id,
          created_by: {
            [Op.in]: doctorIds
          }
        }
      });

      if (!form) {
        return res.status(404).json({ message: 'Form bulunamadı' });
      }
      await form.update(req.body);
      res.json(form);
    } catch (error) {
      console.error('Update Form for Tenant Error:', error);
      res.status(400).json({ message: error.message });
    }
  },

  deleteFormForTenant: async (req, res) => {
    try {
      const doctors = await Doctor.findAll({
        where: {
          tenant_id: req.user.tenant_id
        },
        attributes: ['id']
      });

      const doctorIds = doctors.map(doctor => doctor.id);

      const form = await Form.findOne({
        where: {
          id: req.params.id,
          created_by: {
            [Op.in]: doctorIds
          }
        }
      });

      if (!form) {
        return res.status(404).json({ message: 'Form bulunamadı' });
      }
      await form.destroy();
      res.json({ message: 'Form başarıyla silindi' });
    } catch (error) {
      console.error('Delete Form for Tenant Error:', error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = formController; 