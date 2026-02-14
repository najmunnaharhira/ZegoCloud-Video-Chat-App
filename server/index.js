import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generateToken04 } from './zegoToken.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const PORT = parseInt(process.env.PORT, 10) || 5000;

const app = express();

// CORS: allow env list or in dev allow all
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean)
  : [];
const corsOptions = {
  origin: isProduction && allowedOrigins.length > 0
    ? (origin, cb) => {
        if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
        return cb(null, false);
      }
    : true,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Production: serve static client build
if (isProduction) {
  const clientBuild = join(__dirname, '..', 'client', 'dist');
  if (existsSync(clientBuild)) {
    app.use(express.static(clientBuild));
  }
}

// Products data
const productsPath = join(__dirname, 'data', 'products.json');
function getProducts() {
  try {
    const data = readFileSync(productsPath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

app.get('/api/products', (req, res) => {
  try {
    res.json(getProducts());
  } catch (err) {
    res.status(500).json({ error: 'Failed to load products' });
  }
});

app.get('/api/zego-token', (req, res) => {
  const appID = parseInt(process.env.ZEGO_APP_ID, 10);
  const serverSecret = process.env.ZEGO_SERVER_SECRET;
  const userID = (req.query.userID || req.query.userId || '').trim().slice(0, 64) || `user_${Math.random().toString(36).slice(2, 11)}`;

  if (!serverSecret || !Number.isInteger(appID) || appID <= 0) {
    res.status(503).json({
      error: 'Video call is not configured',
      hint: 'Set ZEGO_APP_ID and ZEGO_SERVER_SECRET (32 chars) in server .env',
    });
    return;
  }

  if (serverSecret.length !== 32) {
    res.status(500).json({ error: 'ZEGO_SERVER_SECRET must be exactly 32 characters' });
    return;
  }

  try {
    const effectiveTime = 3600;
    const token = generateToken04(appID, userID, serverSecret, effectiveTime, '');
    res.json({ token, appID, userID });
  } catch (err) {
    if (!isProduction) {
      console.error('Zego token error:', err.message);
    }
    res.status(500).json({ error: 'Token generation failed' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() });
});

// SPA fallback: in production serve index.html for non-API routes
if (isProduction) {
  const clientBuild = join(__dirname, '..', 'client', 'dist');
  if (existsSync(clientBuild)) {
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api')) return next();
      res.sendFile(join(clientBuild, 'index.html'));
    });
  }
}

app.listen(PORT, '0.0.0.0', () => {
  if (!isProduction) {
    console.log(`Server running at http://localhost:${PORT}`);
    if (!process.env.ZEGO_APP_ID || !process.env.ZEGO_SERVER_SECRET) {
      console.warn('Zego: set ZEGO_APP_ID and ZEGO_SERVER_SECRET in .env for video calls.');
    }
  }
});
