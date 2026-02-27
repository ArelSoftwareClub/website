require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const db = require('./db/database');

const { httpLogger } = require('./middleware/logger');
const { globalLimiter } = require('./middleware/rateLimiter');

const authRoute = require('./routes/auth');
const contactRoute = require('./routes/contact');
const adminRoute = require('./routes/admin');

const app = express();
const PORT = process.env.PORT || 3000;  // Railway injects PORT automatically

// ── SECURITY HEADERS ─────────────────────────────────────────
app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            scriptSrcAttr: ["'unsafe-inline'"],   // allows onclick="..." handlers
            styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            fontSrc: ["'self'", 'https://fonts.gstatic.com'],
            imgSrc: ["'self'", 'data:'],
            connectSrc: ["'self'", 'http://localhost:3000'],
        },
    },
}));

// ── CORS ─────────────────────────────────────────────────────
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'https://arelsoftwareclub.github.io',
    // Railway deployment — update with your actual Railway URL after deploy
    process.env.FRONTEND_URL,
].filter(Boolean);
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) callback(null, true);
        else callback(new Error(`CORS: ${origin} izin verilmedi`));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// ── BODY PARSING ─────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));   // Prevent large payload attacks
app.use(express.urlencoded({ extended: false, limit: '10kb' }));

// ── LOGGING ──────────────────────────────────────────────────
app.use(httpLogger);

// ── GLOBAL RATE LIMIT ────────────────────────────────────────
app.use('/api', globalLimiter);

// ── STATIC FILES ─────────────────────────────────────────────
// Serve the main website
app.use(express.static(path.join(__dirname, '..')));
// Serve admin panel
app.use('/admin', express.static(path.join(__dirname, '..', 'admin')));

// ── API ROUTES ───────────────────────────────────────────────
app.use('/api/auth', authRoute);
app.use('/api/contact', contactRoute);
app.use('/api/admin', adminRoute);

// ── HEALTH CHECK ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
    const dbOk = !!db.prepare(`SELECT 1`).get();
    res.json({
        success: true,
        status: 'OK',
        database: dbOk ? 'connected' : 'error',
        uptime: Math.round(process.uptime()),
        version: process.version,
        timestamp: new Date().toISOString(),
    });
});

// ── 404 ───────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Endpoint bulunamadı.' });
});

// ── GLOBAL ERROR HANDLER ─────────────────────────────────────
app.use((err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);
    const status = err.status || 500;
    res.status(status).json({
        success: false,
        error: process.env.NODE_ENV === 'production' ? 'Sunucu hatası.' : err.message,
    });
});

// ── SEED ADMIN USER ──────────────────────────────────────────
async function seedAdmin() {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@arel.edu.tr';
    const existing = db.prepare(`SELECT id FROM users WHERE email = ?`).get(adminEmail);
    if (!existing) {
        const hashed = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@Arel2026!', 12);
        db.prepare(`INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'admin')`).run('admin', adminEmail, hashed);
        console.log(`🔑 Admin hesabı oluşturuldu: ${adminEmail}`);
    }
}

// ── START ────────────────────────────────────────────────────
seedAdmin().then(() => {
    app.listen(PORT, () => {
        console.log(`\n🚀 Arel Backend Server çalışıyor!`);
        console.log(`   URL    : http://localhost:${PORT}`);
        console.log(`   Admin  : http://localhost:${PORT}/admin`);
        console.log(`   Health : http://localhost:${PORT}/api/health`);
        console.log(`   Mode   : ${process.env.NODE_ENV || 'development'}\n`);
    });
});
