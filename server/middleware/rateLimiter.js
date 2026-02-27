const db = require('../db/database');
const { securityLog } = require('./logger');

/**
 * Custom rate limiter using SQLite — no third-party library.
 * windowMs: milliseconds for the window
 * max: maximum hits allowed per window
 */
function rateLimiter({ windowMs = 15 * 60 * 1000, max = 100, message = 'Çok fazla istek. Lütfen bekleyin.' } = {}) {
    // Cleanup old entries every 5 minutes
    setInterval(() => {
        const cutoff = new Date(Date.now() - windowMs).toISOString();
        db.prepare(`DELETE FROM rate_limits WHERE window_start < ?`).run(cutoff);
    }, 5 * 60 * 1000);

    return (req, res, next) => {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const endpoint = req.path;
        const windowStart = new Date(Date.now() - windowMs).toISOString();

        // Get or reset existing record
        const existing = db.prepare(`
      SELECT * FROM rate_limits WHERE ip = ? AND endpoint = ? AND window_start > ?
    `).get(ip, endpoint, windowStart);

        if (existing) {
            if (existing.hit_count >= max) {
                securityLog(ip, `Rate limit hit on ${endpoint} (${existing.hit_count} requests)`);
                return res.status(429).json({
                    success: false,
                    error: message,
                    retryAfter: Math.ceil(windowMs / 1000),
                });
            }
            db.prepare(`UPDATE rate_limits SET hit_count = hit_count + 1 WHERE id = ?`).run(existing.id);
        } else {
            // Reset or create
            db.prepare(`
        INSERT INTO rate_limits (ip, endpoint, hit_count, window_start)
        VALUES (?, ?, 1, datetime('now'))
        ON CONFLICT(ip, endpoint) DO UPDATE SET hit_count = 1, window_start = datetime('now')
      `).run(ip, endpoint);
        }

        next();
    };
}

// Pre-configured rate limiters
const authLimiter = rateLimiter({ windowMs: 15 * 60 * 1000, max: 5, message: 'Çok fazla giriş denemesi. 15 dakika sonra tekrar deneyin.' });
const contactLimiter = rateLimiter({ windowMs: 60 * 60 * 1000, max: 10, message: 'Çok fazla mesaj gönderildi. 1 saat sonra tekrar deneyin.' });
const globalLimiter = rateLimiter({ windowMs: 60 * 1000, max: 60, message: 'Çok fazla istek gönderildi.' });

module.exports = { rateLimiter, authLimiter, contactLimiter, globalLimiter };
