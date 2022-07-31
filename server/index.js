require('dotenv').config();
let cors = require('cors');
let cookieParser = require('cookie-parser')
const express = require('express');
const sequelize = require('./db');

const model = require('./models/user-token');
const router = require('./routers');
// ----------IMPORTS----------------------------


// ----------APP--------------------------------
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api', router);
// ----------APP--------------------------------


// ----------APP SATR---------------------------
const start = async () => {
    try {
        await sequelize.authenticate(); //подключение к БД
        await sequelize.sync({alter: true});  //сверяем БД с теми моделями что мы описали
        await app.listen(PORT, () => console.log(`SERVER START ON PORT - http://localhost:${PORT}`));  //запуск сервера
    } catch (e) {
        console.log(`ERROR - ${e}`) //отлавливаем ошибку при подключении
    }
}
start();

app.get('/', (req ,res) => {
    res.json('SERVER START');
})
// ----------APP SATR---------------------------

