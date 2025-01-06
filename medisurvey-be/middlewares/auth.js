// middleware/auth.js
const jwt = require('jsonwebtoken');
const Tenant = require('../models/Tenant'); 

const adminDoctorOnlyMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(403).json({ error: 'Token gerekli.' });

  try {
    const decoded = jwt.verify(token, 'secretkey');

    if (decoded.role !== 'admin') {
      return res.status(403).json({ error: 'Bu işlem sadece admin doktorlara izinlidir.' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Geçersiz token.' });
  }
};

const tenantOnlyMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(403).json({ error: 'Token gerekli.' });

  try {
    const decoded = jwt.verify(token, 'secretkey');

    const tenantExists = await Tenant.findByPk(decoded.id);

    if (!tenantExists) {
      return res.status(403).json({ error: 'Bu işlem sadece geçerli tenantlara izinlidir.' });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Geçersiz token.' });
  }
};

module.exports = {adminDoctorOnlyMiddleware, tenantOnlyMiddleware};
