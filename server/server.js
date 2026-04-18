// Fix OpenSSL legacy key support for Node 18+
process.env.OPENSSL_CONF = '/dev/null';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';

import authRoutes from './routes/authRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import postRoutes from './routes/postRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 4000);

// ✅ Allowed origins (VERY IMPORTANT)
const allowedOrigins = [
  process.env.CLIENT_URL, // production (Vercel)
  'http://localhost:5173',
  'http://127.0.0.1:5173'
].filter(Boolean);

// ✅ CORS FIX (SAFE + PRODUCTION READY)
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, curl, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log('❌ Blocked by CORS:', origin);
        return callback(null, false); // ✅ IMPORTANT FIX (no crash)
      }
    },
    credentials: true
  })
);

// ✅ Security
app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);

// ✅ Performance
app.use(compression());

// ✅ Body parsing
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// ✅ Root route (IMPORTANT FIX)
app.get('/', (_req, res) => {
  res.send('🚀 Shrusara Backend API is running');
});

// ✅ Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/videos', videoRoutes);

// ✅ Error handler (MUST be last)
app.use(errorHandler);

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Shrusara API running on port ${port}`);
  console.log(`🌍 Allowed Origins:`, allowedOrigins);
});