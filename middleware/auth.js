const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'fallback_secret_for_safety';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (token == null) {
        return res.status(401).send({ message: '인증 토큰이 필요합니다.' }); 
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).send({ message: '유효하지 않거나 만료된 토큰입니다.' }); 
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;