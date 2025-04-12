const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Kullanıcı bilgisi bulunamadı' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    next();
  };
};

module.exports = checkRole; 