const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const Tenant = require('../models/Tenant');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      console.log('Token bulunamadı');
      return res.status(401).json({ message: 'Yetkilendirme token\'ı bulunamadı' });
    }

    console.log('Token alındı:', token.substring(0, 15) + '...');
    console.log('Doğrulama anahtarı: secretkey');
    
    const decoded = jwt.verify(token, 'secretkey');
    console.log('Decoded token:', JSON.stringify(decoded));
    
    let user;
    
    const userRole = decoded.role || 'tenant';
    console.log('Kullanıcı rolü:', userRole);
    
    if (userRole === 'doctor' || userRole === 'admin') {
      const userId = decoded.id;
      console.log('Aranan doktor/admin id:', userId);
      
      if (!userId) {
        return res.status(401).json({ message: 'Token içinde kullanıcı kimliği (id) bulunamadı' });
      }
      
      user = await Doctor.findOne({ 
        where: { 
          id: userId 
        } 
      });
      
      console.log('Bulunan doktor/admin:', user ? user.id : 'bulunamadı');
    } else if (userRole === 'tenant') {
      const userId = decoded.id;
      console.log('Aranan tenant id:', userId);
      
      if (!userId) {
        return res.status(401).json({ message: 'Token içinde kullanıcı kimliği (id) bulunamadı' });
      }
      
      user = await Tenant.findOne({ 
        where: { 
          id: userId 
        } 
      });
      
      console.log('Bulunan tenant:', user ? user.id : 'bulunamadı');
    } else {
      console.log('Geçersiz rol:', userRole);
      return res.status(401).json({ message: 'Geçersiz kullanıcı rolü' });
    }

    if (!user) {
      console.log('Kullanıcı bulunamadı, id:', decoded.id, 'role:', userRole);
      return res.status(401).json({ message: 'Kullanıcı bulunamadı' });
    }

    if (userRole === 'tenant') {
      req.user = {
        id: user.id,
        role: userRole,
        tenant_id: user.id
      };
      console.log('Tenant kullanıcısı bulundu ve tenant_id atandı:', req.user);
    } else {
      req.user = {
        id: user.id,
        role: userRole,
        tenant_id: user.tenant_id
      };
      console.log('Doktor/Admin kullanıcısı bulundu:', req.user);
    }

    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    console.error('Token içeriği:', req.header('Authorization'));
    
    if (error.name === 'JsonWebTokenError') {
      console.error('JsonWebTokenError detayları:', error.message);
      return res.status(401).json({ message: 'Geçersiz token formatı: ' + error.message });
    } else if (error.name === 'TokenExpiredError') {
      console.error('TokenExpiredError detayları: Token süresi dolmuş', error.expiredAt);
      return res.status(401).json({ message: 'Token süresi dolmuş' });
    }
    
    res.status(401).json({ message: 'Geçersiz token: ' + error.message });
  }
};

module.exports = authMiddleware; 