require('dotenv').config(); 
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// CORS 설정
app.use(cors({
    origin: '*', // 실제 배포시에는 Vercel 주소로 변경 추천
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 라우터 연결
const authRouter = require('./routes/auth');
const customerRouter = require('./routes/customers');

app.use('/login', authRouter);
app.use('/customers', customerRouter);

// 기본 상태 확인
app.get('/', (req, res) => {
    res.status(200).send({ message: 'API Server is running with clean architecture.' }); 
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));