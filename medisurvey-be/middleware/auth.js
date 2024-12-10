const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; // İstekten JWT token'ı alır
        let decodedData;

        if (token) { // Token varsa
            decodedData = jwt.verify(token, process.env.SECRET_TOKEN); // Token'ı doğrular
            req.userId = decodedData?.id; // Kullanıcı kimliğini ayarlar
        } else { // Token yoksa
            decodedData = jwt.decode(token); // Token'ı çözer
            req.userId = decodedData.sub; // Kullanıcı kimliğini ayarlar
        }
        next(); // Sonraki middleware'e veya rotaya geçer
    } catch (error) { // Hata durumunda hata döndürür
        console.log(error);
    }
};

module.exports = auth;
