import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api', userRoutes);

// A simple test endpoint
app.get('/', (req, res) => {
  res.send('Backend is up and running.');
});

// Synchronize models and start the server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Synchronize all defined models with the database
    await sequelize.sync(); // Use { force: true } during development to reset tables

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
