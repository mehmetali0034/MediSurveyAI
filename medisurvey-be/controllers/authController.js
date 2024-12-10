const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor.js'); // Doktor modelini çağırıyoruz

const register = async (req, res) => {
    try {
        const { name, surname, specialty, phone, email, password, confirmPassword } = req.body; // confirmPassword ekliyoruz

        // Şifrelerin eşleşip eşleşmediğini kontrol et
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Parolalar eşleşmiyor!" });
        }

        const doctor = await Doctor.findOne({ where: { email } });
        if (doctor) {
            return res.status(500).json({ message: "Bu email hesabı zaten bulunmakta !!" });
        }

        if (password.length < 6) {
            return res.status(500).json({ message: "Parolanız 6 karakterden küçük olmamalı !!" });
        }

        const passwordHash = await bcrypt.hash(password, 12); // Hashlenmiş şifreyi kontrol edin

        const newDoctor = await Doctor.create({ name, surname, specialty, phone, email, password: passwordHash });

        const doctorToken = jwt.sign({ id: newDoctor.id }, process.env.SECRET_TOKEN, { expiresIn: '1h' });

        res.status(201).json({
            status: "OK",
            newDoctor,
            doctorToken
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
            return res.status(500).json({ message: "Böyle bir doktor bulunamadı....." });
        }

        const comparePassword = await bcrypt.compare(password, doctor.password); // true veya false döner, doğru karşılaştırma yapılıyor mu kontrol edin

        if (!comparePassword) {
            return res.status(500).json({ message: "Parolanız Yanlış...." });
        }
        const token = jwt.sign({ id: doctor.id }, process.env.SECRET_TOKEN, { expiresIn: '1h' });

        res.status(201).json({
            status: "OK",
            doctor,
            token
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { register, login };
