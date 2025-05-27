const MR = require('../models/MR');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/mr';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}).single('mrImage');

// Upload MR image
exports.uploadMR = async (req, res) => {
    try {
        upload(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const { patientId, notes } = req.body;
            const doctorId = req.user.id;

            // Check if patient exists and belongs to the doctor
            const patient = await Patient.findOne({
                where: { id: patientId, doctorId: doctorId }
            });

            if (!patient) {
                return res.status(404).json({ error: 'Patient not found or not authorized' });
            }

            const mr = await MR.create({
                patientId,
                doctorId,
                imageUrl: req.file.path,
                notes,
                status: 'pending'
            });

            return res.status(201).json({
                message: 'MR uploaded successfully',
                mr: mr
            });
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Analyze MR
exports.analyzeMR = async (req, res) => {
    try {
        const { id } = req.params;
        const { segmentType } = req.query; // 'merged', 'femur', 'tibia', 'fibula'
        const doctorId = req.user.id;

        // Validate segment type
        const validTypes = ['merged', 'femur', 'tibia', 'fibula'];
        if (!validTypes.includes(segmentType)) {
            return res.status(400).json({ 
                error: 'Invalid segment type. Must be one of: merged, femur, tibia, fibula' 
            });
        }

        // Get MR record
        const mr = await MR.findOne({
            where: { id, doctorId }
        });

        if (!mr) {
            return res.status(404).json({ error: 'MR not found or not authorized' });
        }

        // Check if file exists
        if (!fs.existsSync(mr.imageUrl)) {
            return res.status(404).json({ error: 'MR image file not found' });
        }

        try {
            const formData = new FormData();
            const fileStream = fs.createReadStream(mr.imageUrl);
            formData.append('file', fileStream, {
                filename: path.basename(mr.imageUrl),
                contentType: 'image/jpeg'
            });
            
            // Add segment_type to query parameters
            const analysisResponse = await axios.post(
                `http://0.0.0.0:4000/segment?segment_type=${segmentType}`,
                formData,
                {
                    headers: {
                        ...formData.getHeaders()
                    }
                }
            );

            // Update MR with analysis results
            await mr.update({
                analysisResult: {
                    ...mr.analysisResult,
                    [segmentType]: analysisResponse.data
                },
                status: 'analyzed'
            });

            return res.json({
                message: 'MR analyzed successfully',
                analysis: analysisResponse.data,
                mr: mr
            });
        } catch (analysisError) {
            console.error('Analysis error:', analysisError);
            await mr.update({ status: 'failed' });
            return res.status(500).json({
                message: 'Analysis failed',
                error: analysisError.message
            });
        }
    } catch (error) {
        console.error('Analysis request error:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get all MRs for a patient
exports.getPatientMRs = async (req, res) => {
    try {
        const { patientId } = req.params;
        const doctorId = req.user.id;

        // Verify doctor has access to this patient
        const patient = await Patient.findOne({
            where: { id: patientId, doctorId: doctorId }
        });

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found or not authorized' });
        }

        const mrs = await MR.findAll({
            where: { patientId },
            order: [['createdAt', 'DESC']]
        });

        res.json(mrs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete MR
exports.deleteMR = async (req, res) => {
    try {
        const { id } = req.params;
        const doctorId = req.user.id;

        const mr = await MR.findOne({
            where: { id, doctorId }
        });

        if (!mr) {
            return res.status(404).json({ error: 'MR not found or not authorized' });
        }

        // Delete the file
        if (fs.existsSync(mr.imageUrl)) {
            fs.unlinkSync(mr.imageUrl);
        }

        await mr.destroy();
        res.json({ message: 'MR deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get MR details
exports.getMRDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const doctorId = req.user.id;

        const mr = await MR.findOne({
            where: { id, doctorId }
        });

        if (!mr) {
            return res.status(404).json({ error: 'MR not found or not authorized' });
        }

        res.json(mr);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all MRs for a doctor
exports.getDoctorMRs = async (req, res) => {
    try {
        const doctorId = req.user.id;
        const role = req.user.role;

        if (role !== 'admin' && role !== 'doctor') {
            return res.status(403).json({ message: 'Bu işlem için yetkiniz yok!' });
        }

        const mrs = await MR.findAll({
            where: { doctorId },
            include: [
                { model: Patient },
                { model: Doctor }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.json({
            status: 'success',
            count: mrs.length,
            mrs: mrs
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
}; 