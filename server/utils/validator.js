/**
 * Input validator — no third-party libraries
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASS_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,64}$/;
const USER_RE = /^[a-zA-Z0-9_\-.]{3,32}$/;

/**
 * Remove dangerous HTML/SQL characters from a string
 */
function sanitize(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/[<>]/g, '')           // basic XSS
        .replace(/['";\\]/g, '')        // basic SQLi (better-sqlite3 uses params anyway)
        .trim()
        .slice(0, 2000);                // max length
}

function validateEmail(email) {
    return typeof email === 'string' && EMAIL_RE.test(email.trim());
}

function validatePassword(password) {
    return typeof password === 'string' && PASS_RE.test(password);
}

function validateUsername(username) {
    return typeof username === 'string' && USER_RE.test(username.trim());
}

function validateContact({ name, email, message }) {
    const errors = [];
    if (!name || sanitize(name).length < 2) errors.push('İsim en az 2 karakter olmalı');
    if (!validateEmail(email)) errors.push('Geçerli e-posta giriniz');
    if (!message || sanitize(message).length < 5) errors.push('Mesaj en az 5 karakter olmalı');
    return errors;
}

module.exports = { sanitize, validateEmail, validatePassword, validateUsername, validateContact };
