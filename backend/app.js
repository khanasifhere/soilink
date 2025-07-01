import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import path from 'path';
// import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create app instance
const app = express();

// Handle __dirname in ES module
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
import authRoutes from './routes/authRoutes.js';
import landRoutes from './routes/landRoutes.js';
import cropRoutes from './routes/cropRoutes.js';
import rentalRoutes from './routes/rentalRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/land', landRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/orders', orderRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('🌱 AgriConnect API is running...');
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

export default app;
