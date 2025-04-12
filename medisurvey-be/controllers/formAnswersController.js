const FormAnswers = require('../models/FormAnswers');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const { Op } = require('sequelize');

const formAnswersController = {
  getAllFormAnswers: async (req, res) => {
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

      const formAnswers = await FormAnswers.findAll({
        where: whereCondition
      });
      res.json(formAnswers);
    } catch (error) {
      console.error('Get All Form Answers Error:', error);
      res.status(500).json({ message: error.message });
    }
  },


  getFormAnswer: async (req, res) => {
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

      const formAnswer = await FormAnswers.findOne({
        where: whereCondition
      });

      if (!formAnswer) {
        return res.status(404).json({ message: 'Form cevabı bulunamadı' });
      }
      res.json(formAnswer);
    } catch (error) {
      console.error('Get Form Answer Error:', error);
      res.status(500).json({ message: error.message });
    }
  },

  createFormAnswer: async (req, res) => {
    try {
      console.log('Form Answer creation req.user:', req.user);
      
      const creatorId = req.user.id;
      if (!creatorId) {
        return res.status(400).json({ message: 'Kullanıcı kimliği bulunamadı' });
      }
      
      const patientId = req.body.patientId || req.body.patient_id;
      if (!patientId) {
        return res.status(400).json({ message: 'Hasta kimliği bulunamadı' });
      }

      const patient = await Patient.findOne({
        where: {
          id: patientId
        }
      });

      if (!patient) {
        return res.status(404).json({ message: 'Hasta bulunamadı' });
      }

      console.log('Form Answer will be created with created_by:', creatorId);
      
      const formAnswerData = {
        ...req.body,
        created_by: creatorId,
        type: 'for patients'
      };

      if (formAnswerData.fileId && !formAnswerData.file_id) {
        formAnswerData.file_id = formAnswerData.fileId;
        delete formAnswerData.fileId;
      }

      if (formAnswerData.patientId && !formAnswerData.patient_id) {
        formAnswerData.patient_id = formAnswerData.patientId;
        delete formAnswerData.patientId;
      }

      if (formAnswerData.levelAnswers && !formAnswerData.level_answers) {
        formAnswerData.level_answers = formAnswerData.levelAnswers;
        delete formAnswerData.levelAnswers;
      }
      
      const formAnswer = await FormAnswers.create(formAnswerData);
      res.status(201).json(formAnswer);
    } catch (error) {
      console.error('Create Form Answer Error:', error);
      res.status(400).json({ message: error.message });
    }
  },

  updateFormAnswer: async (req, res) => {
    try {
      const formAnswer = await FormAnswers.findOne({
        where: {
          id: req.params.id,
          created_by: req.user.id
        }
      });
      if (!formAnswer) {
        return res.status(404).json({ message: 'Form cevabı bulunamadı' });
      }

      const updateData = { ...req.body };

      if (updateData.fileId && !updateData.file_id) {
        updateData.file_id = updateData.fileId;
        delete updateData.fileId;
      }

      if (updateData.patientId && !updateData.patient_id) {
        updateData.patient_id = updateData.patientId;
        delete updateData.patientId;
      }

      if (updateData.levelAnswers && !updateData.level_answers) {
        updateData.level_answers = updateData.levelAnswers;
        delete updateData.levelAnswers;
      }

      await formAnswer.update(updateData);
      res.json(formAnswer);
    } catch (error) {
      console.error('Update Form Answer Error:', error);
      res.status(400).json({ message: error.message });
    }
  },

  deleteFormAnswer: async (req, res) => {
    try {
      const formAnswer = await FormAnswers.findOne({
        where: {
          id: req.params.id,
          created_by: req.user.id
        }
      });
      if (!formAnswer) {
        return res.status(404).json({ message: 'Form cevabı bulunamadı' });
      }
      await formAnswer.destroy();
      res.json({ message: 'Form cevabı başarıyla silindi' });
    } catch (error) {
      console.error('Delete Form Answer Error:', error);
      res.status(500).json({ message: error.message });
    }
  },

  getAllFormAnswersForTenant: async (req, res) => {
    try {
      console.log('Tenant form cevapları getiriliyor, tenant_id:', req.user.tenant_id);
      
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
        return res.json([]);  // Boş array dön
      }

      const doctorIds = doctors.map(doctor => doctor.id);
      console.log('Doktor ID\'leri:', doctorIds);

      const formAnswers = await FormAnswers.findAll({
        where: {
          created_by: {
            [Op.in]: doctorIds
          }
        }
      });
      
      console.log('Bulunan form cevapları sayısı:', formAnswers.length);
      res.json(formAnswers);
    } catch (error) {
      console.error('Get All Form Answers for Tenant Error:', error);
      console.error('Tenant kullanıcı bilgileri:', req.user);
      res.status(500).json({ message: error.message });
    }
  },

  getFormAnswerForTenant: async (req, res) => {
    try {
      const doctors = await Doctor.findAll({
        where: {
          tenant_id: req.user.tenant_id
        },
        attributes: ['id']
      });

      const doctorIds = doctors.map(doctor => doctor.id);

      const formAnswer = await FormAnswers.findOne({
        where: {
          id: req.params.id,
          created_by: {
            [Op.in]: doctorIds
          }
        },
        include: [{
          model: Patient,
          attributes: ['id', 'firstName', 'lastName']
        }]
      });
      
      if (!formAnswer) {
        return res.status(404).json({ message: 'Form cevabı bulunamadı' });
      }
      res.json(formAnswer);
    } catch (error) {
      console.error('Get Form Answer for Tenant Error:', error);
      res.status(500).json({ message: error.message });
    }
  },

  updateFormAnswerForTenant: async (req, res) => {
    try {
      const doctors = await Doctor.findAll({
        where: {
          tenant_id: req.user.tenant_id
        },
        attributes: ['id']
      });

      const doctorIds = doctors.map(doctor => doctor.id);

      const formAnswer = await FormAnswers.findOne({
        where: {
          id: req.params.id,
          created_by: {
            [Op.in]: doctorIds
          }
        }
      });
      
      if (!formAnswer) {
        return res.status(404).json({ message: 'Form cevabı bulunamadı' });
      }

      const updateData = { ...req.body };

      if (updateData.fileId && !updateData.file_id) {
        updateData.file_id = updateData.fileId;
        delete updateData.fileId;
      }

      if (updateData.patientId && !updateData.patient_id) {
        updateData.patient_id = updateData.patientId;
        delete updateData.patientId;
      }

      if (updateData.levelAnswers && !updateData.level_answers) {
        updateData.level_answers = updateData.levelAnswers;
        delete updateData.levelAnswers;
      }

      await formAnswer.update(updateData);
      res.json(formAnswer);
    } catch (error) {
      console.error('Update Form Answer for Tenant Error:', error);
      res.status(400).json({ message: error.message });
    }
  },


  deleteFormAnswerForTenant: async (req, res) => {
    try {
      const doctors = await Doctor.findAll({
        where: {
          tenant_id: req.user.tenant_id
        },
        attributes: ['id']
      });

      const doctorIds = doctors.map(doctor => doctor.id);

      const formAnswer = await FormAnswers.findOne({
        where: {
          id: req.params.id,
          created_by: {
            [Op.in]: doctorIds
          }
        }
      });
      
      if (!formAnswer) {
        return res.status(404).json({ message: 'Form cevabı bulunamadı' });
      }
      await formAnswer.destroy();
      res.json({ message: 'Form cevabı başarıyla silindi' });
    } catch (error) {
      console.error('Delete Form Answer for Tenant Error:', error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = formAnswersController; 