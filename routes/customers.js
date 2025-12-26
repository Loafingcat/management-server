const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticateToken = require('../middleware/auth');

// 조회 (GET /customers)
router.get('/', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send({ message: '권한 없음' });

    const searchQuery = req.query.search; 
    let sql = "SELECT * FROM customer";
    let params = [];
    
    if (searchQuery) {
        sql += " WHERE id::text LIKE $1 OR name LIKE $2 OR job LIKE $3";
        params = [`%${searchQuery}%`, `%${searchQuery}%`, `%${searchQuery}%`];
    }
    
    pool.query(sql + " ORDER BY id ASC", params)
    .then(result => res.send(result.rows))
    .catch(err => res.status(500).send("DB 오류"));
});

// 추가 (POST /customers)
router.post('/', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send({ message: '권한 없음' });
    const { id, name, job } = req.body;
    pool.query('INSERT INTO customer (id, name, job) VALUES ($1, $2, $3) RETURNING id', [id, name, job])
    .then(result => res.status(201).send({ message: '등록 성공', id: result.rows[0].id }))
    .catch(err => res.status(400).send({ message: '추가 실패' }));
});

// 수정 (PUT /customers/:id)
router.put('/:id', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send({ message: '권한 없음' });
    const { name, job } = req.body;
    pool.query('UPDATE customer SET name = $1, job = $2 WHERE id = $3', [name, job, req.params.id])
    .then(result => res.send({ message: '수정 완료' }))
    .catch(err => res.status(500).send("수정 실패"));
});

// 삭제 (DELETE /customers/:id)
router.delete('/:id', authenticateToken, (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send({ message: '권한 없음' });
    pool.query('DELETE FROM customer WHERE id = $1', [req.params.id])
    .then(result => res.send({ message: '삭제 완료' }))
    .catch(err => res.status(500).send("삭제 실패"));
});

module.exports = router;