const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/database.js');
const Auth = require('./routes/auth.js');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

app.use('/api', Auth); // Tüm auth rotalarını '/api' altında yönlendir

const PORT = process.env.PORT || 3232;
db();

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
