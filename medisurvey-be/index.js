const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/database');
const Auth = require('./routes/auth');
const doctorRoutes = require('./routes/doctor');
const tenantRoutes = require('./routes/tenants');
const patientRoutes = require('./routes/patient');
const fileRoutes = require('./routes/fileRoutes');
const formRoutes = require('./routes/formRoutes');
const formAnswersRoutes = require('./routes/formAnswersRoutes');

const Tenant = require('./models/Tenant');
const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const File = require('./models/File');
const Form = require('./models/Form');
const FormAnswers = require('./models/FormAnswers');

Doctor.belongsTo(Tenant, { foreignKey: 'tenant_id' });
Tenant.hasMany(Doctor, { foreignKey: 'tenant_id' });

Patient.belongsTo(Doctor, { foreignKey: 'doctorId' });
Doctor.hasMany(Patient, { foreignKey: 'doctorId' });

File.belongsTo(Doctor, { foreignKey: 'created_by' });
Doctor.hasMany(File, { foreignKey: 'created_by' });

Form.belongsTo(Doctor, { foreignKey: 'created_by' });
Doctor.hasMany(Form, { foreignKey: 'created_by' });

Form.belongsTo(File, { foreignKey: 'file_id', onDelete: 'CASCADE' });
File.hasMany(Form, { foreignKey: 'file_id', onDelete: 'CASCADE' });

FormAnswers.belongsTo(Doctor, { foreignKey: 'created_by' });
Doctor.hasMany(FormAnswers, { foreignKey: 'created_by' });

FormAnswers.belongsTo(Form, { foreignKey: 'form_id', onDelete: 'CASCADE' });
Form.hasMany(FormAnswers, { foreignKey: 'form_id', onDelete: 'CASCADE' });

FormAnswers.belongsTo(Patient, { foreignKey: 'patient_id' });
Patient.hasMany(FormAnswers, { foreignKey: 'patient_id' });

dotenv.config();

const init = async () => {
    try {
        await db.authenticate();
        console.log('Veritabanına başarıyla bağlanıldı!');
        
        console.log('Tablolar oluşturuluyor...');
        
        console.log('Tenant tablosu oluşturuluyor...');
        await Tenant.sync({ force: false });
        
        console.log('Doctor tablosu oluşturuluyor...');
        await Doctor.sync({ force: false });
        
        console.log('Patient tablosu oluşturuluyor...');
        await Patient.sync({ force: false });
        
        console.log('File tablosu oluşturuluyor...');
        await File.sync({ force: false });
        
        console.log('Form tablosu oluşturuluyor...');
        await Form.sync({ force: false });
        
        console.log('FormAnswers tablosu oluşturuluyor...');
        await FormAnswers.sync({ force: false });
        
        console.log('Tüm tablolar başarıyla oluşturuldu!');
    } catch (error) {
        console.error('Hata oluştu:', error.message);
        console.error('Detaylar:', error);
    }
};

init();


const app = express();

app.use(cors());
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use('/api/doctors', doctorRoutes); 
app.use('/api/patients', patientRoutes); 
app.use('/api/tenants', tenantRoutes); 
app.use('/api/auth', Auth); 
app.use('/api/files', fileRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/form-answers', formAnswersRoutes);

const PORT = process.env.PORT || 3232;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
