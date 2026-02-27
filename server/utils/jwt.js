const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET;
const EXPIRES = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Generate a JWT token with a unique jti (JWT ID) for revocation
 */
function generateToken(payload) {
    const jti = crypto.randomUUID();
    return {
        token: jwt.sign({ ...payload, jti }, SECRET, { expiresIn: EXPIRES }),
        jti,
    };
}

/**
 * Verify a JWT token — returns decoded payload or throws
 */
function verifyToken(token) {
    return jwt.verify(token, SECRET);
}

module.exports = { generateToken, verifyToken };
