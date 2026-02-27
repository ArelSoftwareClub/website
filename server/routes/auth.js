const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const db = require('../db/database');
const { generateToken } = require('../utils/jwt');
const { authLimiter } = require('../middleware/rateLimiter');
const { requireAuth } = require('../middleware/authMiddleware');
const { authLog, securityLog } = require('../middleware/logger');
const { validateEmail, validatePassword, validateUsername, sanitize } = require('../utils/validator');

// ── REGISTER ─────────────────────────────────────────────────
router.post('/register', authLimiter, async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // Validate
        if (!validateUsername(username)) return res.status(400).json({ success: false, error: 'Kullanıcı adı 3-32 karakter, harf/rakam/_ olmalı.' });
        if (!validateEmail(email)) return res.status(400).json({ success: false, error: 'Geçerli bir e-posta adresi giriniz.' });
        if (!validatePassword(password)) return res.status(400).json({ success: false, error: 'Şifre: en az 8 karakter, büyük/küçük harf, rakam ve özel karakter içermeli.' });

        // Check duplicate
        const exists = db.prepare(`SELECT id FROM users WHERE email = ? OR username = ?`).get(email.toLowerCase(), username.toLowerCase());
        if (exists) return res.status(409).json({ success: false, error: 'Bu e-posta veya kullanıcı adı zaten kayıtlı.' });

        // Hash password
        const hashed = await bcrypt.hash(password, 12);

        // Insert user
        const result = db.prepare(`
      INSERT INTO users (username, email, password, role)
      VALUES (?, ?, ?, 'user')
    `).run(sanitize(username).toLowerCase(), email.toLowerCase(), hashed);

        authLog(ip, `New user registered: ${email}`, result.lastInsertRowid);
        res.status(201).json({ success: true, message: 'Kayıt başarılı! Giriş yapabilirsiniz.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Sunucu hatası. Tekrar deneyin.' });
    }
});

// ── LOGIN ─────────────────────────────────────────────────────
router.post('/login', authLimiter, async (req, res) => {
    try {
        const { email, password } = req.body;
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        if (!email || !password) return res.status(400).json({ success: false, error: 'E-posta ve şifre gerekli.' });

        const user = db.prepare(`SELECT * FROM users WHERE email = ?`).get(email.toLowerCase());

        if (!user || !user.is_active) {
            securityLog(ip, `Failed login attempt: ${email}`);
            return res.status(401).json({ success: false, error: 'E-posta veya şifre hatalı.' });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            securityLog(ip, `Failed login (wrong password): ${email}`);
            return res.status(401).json({ success: false, error: 'E-posta veya şifre hatalı.' });
        }

        // Generate token
        const { token, jti } = generateToken({ id: user.id, email: user.email, role: user.role, username: user.username });

        // Store session
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        db.prepare(`INSERT INTO sessions (user_id, token_id, expires_at, ip) VALUES (?, ?, ?, ?)`).run(user.id, jti, expiresAt, ip);

        // Update last login
        db.prepare(`UPDATE users SET last_login = datetime('now') WHERE id = ?`).run(user.id);

        authLog(ip, `User logged in: ${email}`, user.id);

        res.json({
            success: true,
            token,
            user: { id: user.id, username: user.username, email: user.email, role: user.role },
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Sunucu hatası.' });
    }
});

// ── LOGOUT ───────────────────────────────────────────────────
router.post('/logout', requireAuth, (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    db.prepare(`UPDATE sessions SET revoked = 1 WHERE token_id = ?`).run(req.user.jti);
    authLog(ip, `User logged out: ${req.user.email}`, req.user.id);
    res.json({ success: true, message: 'Başarıyla çıkış yapıldı.' });
});

// ── ME ────────────────────────────────────────────────────────
router.get('/me', requireAuth, (req, res) => {
    const user = db.prepare(`SELECT id, username, email, role, created_at, last_login FROM users WHERE id = ?`).get(req.user.id);
    if (!user) return res.status(404).json({ success: false, error: 'Kullanıcı bulunamadı.' });
    res.json({ success: true, user });
});

module.exports = router;
