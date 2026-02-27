const { verifyToken } = require('../utils/jwt');
const db = require('../db/database');

/**
 * Verify JWT — attach req.user on success
 */
function requireAuth(req, res, next) {
    const header = req.headers['authorization'];
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, error: 'Oturum bulunamadı. Lütfen giriş yapın.' });
    }

    const token = header.slice(7);
    try {
        const decoded = verifyToken(token);

        // Check if session was revoked (logout)
        const session = db.prepare(`SELECT revoked FROM sessions WHERE token_id = ?`).get(decoded.jti);
        if (!session || session.revoked) {
            return res.status(401).json({ success: false, error: 'Oturum geçersiz veya sonlandırılmış.' });
        }

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, error: 'Geçersiz veya süresi dolmuş token.' });
    }
}

/**
 * Only allow admin role
 */
function requireAdmin(req, res, next) {
    requireAuth(req, res, () => {
        if (req.user?.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Bu işlem için admin yetkisi gerekli.' });
        }
        next();
    });
}

module.exports = { requireAuth, requireAdmin };
