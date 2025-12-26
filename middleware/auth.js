const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const SECRET_KEY = process.env.JWT_SECRET || 'fallback_secret_for_safety';

// POST /login
router.post('/', (req, res) => {
    const { username, password } = req.body;
    
    pool.query('SELECT * FROM "user" WHERE username = $1', [username])
    .then(result => {
        const users = result.rows;
        if (users.length === 0) {
            return res.status(401).send({ message: '사용자가 존재하지 않습니다.' });
        }
        
        const user = users[0];
        bcrypt.compare(password, user.password, (err, isValid) => {
            if (err || !isValid) {
                return res.status(401).send({ message: '비밀번호가 잘못되었습니다.' });
            }
            
            const token = jwt.sign(
                { id: user.id, username: user.username, role: user.role }, 
                SECRET_KEY, 
                { expiresIn: '1h' }
            );
            res.json({ token, username: user.username, role: user.role });
        });
    })
    .catch(err => {
        console.error("Login DB Error:", err);
        res.status(500).send({ message: '데이터베이스 오류' });
    });
});

module.exports = router;