const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// Load environment variables
dotenv.config();

// Connect to MySQL via Sequelize (this backend is MySQL-only)
const sequelize = require('./config/mysql');

(async () => {
  try {
    await sequelize.authenticate();
    // Import models to ensure they are registered (models/index.js will do this)
    const models = require('./models');
    // Sync all models
    await models.sequelize.sync();
    console.log('MySQL Connected and synchronized');
  } catch (error) {
    console.error('Unable to connect to MySQL:', error.message);
    process.exit(1);
  }
})();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'E-Commerce API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

