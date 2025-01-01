const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor'); 


const register = async (req, res) => {
    try {
        const { name, surname, specialty, phone, email, password, confirmPassword, role } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Parolalar eşleşmiyor!" });
        }

        const doctor = await Doctor.findOne({ where: { email } });
        if (doctor) {
            return res.status(400).json({ message: "Bu email hesabı zaten bulunmakta!" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Parolanız 6 karakterden küçük olmamalı!" });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const userRole = role || 'sub-doctor';

        const newDoctor = await Doctor.create({ 
            name, 
            surname, 
            specialty, 
            phone, 
            email, 
            password: passwordHash, 
            role: userRole 
        });

        const doctorToken = jwt.sign({ id: newDoctor.id, role: newDoctor.role }, process.env.SECRET_TOKEN, { expiresIn: '1h' });

        res.status(201).json({
            status: "OK",
            newDoctor,
            token: doctorToken
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const doctor = await Doctor.findOne({ where: { email } });
        if (!doctor) {
            return res.status(400).json({ message: "Böyle bir doktor bulunamadı." });
        }

        const isPasswordValid = await bcrypt.compare(password, doctor.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Parolanız yanlış!" });
        }

        const token = jwt.sign({ id: doctor.id, role: doctor.role }, process.env.SECRET_TOKEN, { expiresIn: '1h' });

        res.status(200).json({
            status: "OK",
            doctor: {
                id: doctor.id,
                name: doctor.name,
                role: doctor.role 
            },
            token
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


module.exports = { register, login };
