const db = require('../db/database');
const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '..', 'logs');
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir, { recursive: true });

const streams = {
    access: fs.createWriteStream(path.join(logsDir, 'access.log'), { flags: 'a' }),
    error: fs.createWriteStream(path.join(logsDir, 'error.log'), { flags: 'a' }),
    security: fs.createWriteStream(path.join(logsDir, 'security.log'), { flags: 'a' }),
    auth: fs.createWriteStream(path.join(logsDir, 'auth.log'), { flags: 'a' }),
};

const TYPE_STREAM = { ACCESS: 'access', ERROR: 'error', SECURITY: 'security', AUTH: 'auth' };

/**
 * Write a log entry to both file and DB
 */
function log({ type = 'ACCESS', method, path: reqPath, status, ip, userAgent, userId, message, duration }) {
    const ts = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const line = `[${ts}] ${type.padEnd(8)} ${method || ''} ${reqPath || ''} ${status || ''} IP:${ip || '-'} (${duration || 0}ms) ${message || ''}\n`;
    const stream = streams[TYPE_STREAM[type]] || streams.access;
    stream.write(line);

    // Also write to DB (non-blocking)
    try {
        db.prepare(`
      INSERT INTO logs (type, method, path, status, ip, user_agent, user_id, message, duration)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(type, method, reqPath, status, ip, userAgent, userId || null, message || null, duration || 0);
    } catch (_) { /* never crash on log failure */ }
}

/**
 * Express middleware — logs every HTTP request
 */
function httpLogger(req, res, next) {
    const start = Date.now();
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    res.on('finish', () => {
        const duration = Date.now() - start;
        const type = res.statusCode >= 500 ? 'ERROR'
            : res.statusCode >= 400 ? 'ACCESS'
                : 'ACCESS';
        log({
            type, duration,
            method: req.method,
            path: req.path,
            status: res.statusCode,
            ip,
            userAgent: req.headers['user-agent'],
            userId: req.user?.id,
        });
    });

    next();
}

/**
 * Log a specific security event
 */
function securityLog(ip, message) {
    log({ type: 'SECURITY', ip, message });
}

/**
 * Log an auth event (login, logout, register)
 */
function authLog(ip, message, userId) {
    log({ type: 'AUTH', ip, message, userId });
}

module.exports = { httpLogger, log, securityLog, authLog };
