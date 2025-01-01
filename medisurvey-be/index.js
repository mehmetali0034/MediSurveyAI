const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/database');
const Auth = require('./routes/auth');

dotenv.config();
const init = async () => {
    try {
        await db.authenticate();
        console.log('Veritabanına başarıyla bağlanıldı!');
        
    } catch (error) {
        console.error('Hata oluştu:', error);
    }
};
init();

const app = express();

app.use(cors());
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use('/api', Auth); 

const PORT = process.env.PORT || 3232;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
