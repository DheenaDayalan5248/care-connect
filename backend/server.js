// CareConnect Backend Server
// Express app bootstrapping and MongoDB connection

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const MONGO_URI = process.env.MONGO_URI || '';
const connectDB = async () => {
  if (!MONGO_URI) {
    console.warn('MONGO_URI not set. Server will run but database operations will fail until configured.');
    return;
  }
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'careconnect-backend' });
});

app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/doctors', require('./src/routes/doctors'));
app.use('/api/appointments', require('./src/routes/appointments'));
app.use('/api/made-by', require('./src/routes/madeBy'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});