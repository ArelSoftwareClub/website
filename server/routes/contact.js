const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { contactLimiter } = require('../middleware/rateLimiter');
const { log } = require('../middleware/logger');
const { validateContact, sanitize } = require('../utils/validator');

// POST /api/contact — save message to DB
router.post('/', contactLimiter, (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        const errors = validateContact({ name, email, message });
        if (errors.length) return res.status(400).json({ success: false, errors });

        db.prepare(`
      INSERT INTO contacts (name, email, subject, message, ip_address)
      VALUES (?, ?, ?, ?, ?)
    `).run(sanitize(name), email.toLowerCase(), sanitize(subject || ''), sanitize(message), ip);

        log({ type: 'ACCESS', method: 'POST', path: '/api/contact', status: 201, ip, message: `Contact from ${email}` });

        res.status(201).json({ success: true, message: 'Mesajınız alındı. En kısa sürede dönüş yapacağız!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Sunucu hatası.' });
    }
});

module.exports = router;
