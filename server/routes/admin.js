const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { requireAdmin } = require('../middleware/authMiddleware');
const os = require('os');

// All admin routes require admin JWT ─────────────────────────
router.use(requireAdmin);

// GET /api/admin/stats — server + DB stats
router.get('/stats', (req, res) => {
    const userCount = db.prepare(`SELECT COUNT(*) as cnt FROM users`).get().cnt;
    const contactCount = db.prepare(`SELECT COUNT(*) as cnt FROM contacts`).get().cnt;
    const unreadCount = db.prepare(`SELECT COUNT(*) as cnt FROM contacts WHERE is_read = 0`).get().cnt;
    const logCount = db.prepare(`SELECT COUNT(*) as cnt FROM logs`).get().cnt;
    const recentErrors = db.prepare(`SELECT COUNT(*) as cnt FROM logs WHERE type='ERROR' AND created_at > datetime('now','-1 hour')`).get().cnt;

    res.json({
        success: true,
        stats: {
            users: userCount,
            contacts: contactCount,
            unread: unreadCount,
            totalLogs: logCount,
            recentErrors,
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            platform: os.platform(),
            nodeVersion: process.version,
            hostname: os.hostname(),
        },
    });
});

// GET /api/admin/logs — paginated log viewer
router.get('/logs', (req, res) => {
    const { type, page = 1, limit = 50 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);
    const where = type ? `WHERE type = ?` : '';
    const params = type ? [type, parseInt(limit), offset] : [parseInt(limit), offset];

    const logs = db.prepare(`SELECT * FROM logs ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`).all(...params);
    const total = db.prepare(`SELECT COUNT(*) as cnt FROM logs ${where}`).get(...(type ? [type] : [])).cnt;

    res.json({ success: true, logs, total, page: parseInt(page), limit: parseInt(limit) });
});

// GET /api/admin/users — all users
router.get('/users', (req, res) => {
    const users = db.prepare(`
    SELECT id, username, email, role, created_at, last_login, is_active FROM users ORDER BY created_at DESC
  `).all();
    res.json({ success: true, users });
});

// PATCH /api/admin/users/:id — toggle active, change role
router.patch('/users/:id', (req, res) => {
    const { is_active, role } = req.body;
    if (req.params.id == req.user.id) return res.status(400).json({ success: false, error: 'Kendi hesabınızı düzenleyemezsiniz.' });

    if (is_active !== undefined) db.prepare(`UPDATE users SET is_active = ? WHERE id = ?`).run(is_active ? 1 : 0, req.params.id);
    if (role) db.prepare(`UPDATE users SET role = ? WHERE id = ?`).run(role, req.params.id);

    res.json({ success: true, message: 'Kullanıcı güncellendi.' });
});

// GET /api/admin/contacts — all messages
router.get('/contacts', (req, res) => {
    const contacts = db.prepare(`SELECT * FROM contacts ORDER BY created_at DESC`).all();
    res.json({ success: true, contacts });
});

// PATCH /api/admin/contacts/:id/read
router.patch('/contacts/:id/read', (req, res) => {
    db.prepare(`UPDATE contacts SET is_read = 1 WHERE id = ?`).run(req.params.id);
    res.json({ success: true });
});

// DELETE /api/admin/contacts/:id
router.delete('/contacts/:id', (req, res) => {
    db.prepare(`DELETE FROM contacts WHERE id = ?`).run(req.params.id);
    res.json({ success: true, message: 'Mesaj silindi.' });
});

// GET /api/admin/sessions — active sessions
router.get('/sessions', (req, res) => {
    const sessions = db.prepare(`
    SELECT s.id, s.user_id, u.email, s.ip, s.created_at, s.expires_at, s.revoked
    FROM sessions s JOIN users u ON s.user_id = u.id
    ORDER BY s.created_at DESC LIMIT 100
  `).all();
    res.json({ success: true, sessions });
});

module.exports = router;
