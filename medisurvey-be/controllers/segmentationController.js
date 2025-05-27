const axios = require('axios');
const Segmentation = require('../models/Segmentation');
const File = require('../models/File');

const SEGMENTATION_SERVICE_URL = process.env.SEGMENTATION_SERVICE_URL || 'http://0.0.0.0:4000';

const segmentationController = {
    // Yeni segmentasyon işlemi başlat
    async createSegmentation(req, res) {
        try {
            const { patientId, imageId } = req.body;

            // Görüntü dosyasını bul
            const imageFile = await File.findByPk(imageId);
            if (!imageFile) {
                return res.status(404).json({ error: 'Görüntü bulunamadı' });
            }

            // AI servisine görüntüyü gönder
            const formData = new FormData();
            formData.append('file', imageFile.data);

            const response = await axios.post(`${SEGMENTATION_SERVICE_URL}/segment`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Segmentasyon sonucunu kaydet
            const segmentation = await Segmentation.create({
                patientId,
                imageId,
                segmentationMask: response.data.segmentation_mask,
                status: 'completed'
            });

            res.status(201).json(segmentation);
        } catch (error) {
            console.error('Segmentasyon hatası:', error);
            res.status(500).json({ error: 'Segmentasyon işlemi başarısız oldu' });
        }
    },

    // Segmentasyon sonuçlarını getir
    async getSegmentation(req, res) {
        try {
            const { id } = req.params;
            const segmentation = await Segmentation.findByPk(id);
            
            if (!segmentation) {
                return res.status(404).json({ error: 'Segmentasyon bulunamadı' });
            }

            res.json(segmentation);
        } catch (error) {
            console.error('Segmentasyon getirme hatası:', error);
            res.status(500).json({ error: 'Segmentasyon bilgileri alınamadı' });
        }
    },

    // Hasta için tüm segmentasyonları getir
    async getPatientSegmentations(req, res) {
        try {
            const { patientId } = req.params;
            const segmentations = await Segmentation.findAll({
                where: { patientId },
                include: [{
                    model: File,
                    attributes: ['id', 'filename', 'fileType']
                }]
            });

            res.json(segmentations);
        } catch (error) {
            console.error('Hasta segmentasyonları getirme hatası:', error);
            res.status(500).json({ error: 'Hasta segmentasyonları alınamadı' });
        }
    },

    // Segmentasyonu sil
    async deleteSegmentation(req, res) {
        try {
            const { id } = req.params;
            const segmentation = await Segmentation.findByPk(id);
            
            if (!segmentation) {
                return res.status(404).json({ error: 'Segmentasyon bulunamadı' });
            }

            await segmentation.destroy();
            res.status(204).send();
        } catch (error) {
            console.error('Segmentasyon silme hatası:', error);
            res.status(500).json({ error: 'Segmentasyon silinemedi' });
        }
    }
};

module.exports = segmentationController; 