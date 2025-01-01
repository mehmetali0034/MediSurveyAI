const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

        // Kullanıcının rolü admin değilse işlem yapılmaz
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: "Bu işlemi yapma yetkiniz yok!" });
        }

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Yetkisiz erişim!" });
    }
};

module.exports = { isAdmin };