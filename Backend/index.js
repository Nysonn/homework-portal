import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session'; // <-- import express-session
import sequelize from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import homeworkRoutes from './routes/homeworkRoutes.js';
import aiRecommendationRouter from './routes/aiRecommendation.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,               
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      httpOnly: true,
      secure: false,   // set to true in production if using HTTPS
      sameSite: 'lax', // or 'none' if you have cross-site front-end/back-end
    },
  })
);

// Routes
app.use('/api/homework', homeworkRoutes);
app.use("/api/ai-recommendation", aiRecommendationRouter);
app.use('/api', userRoutes);

// Example endpoint to check session details
app.get('/api/session', (req, res) => {
  if (req.session.user) {
    res.json({ user: req.session.user });
  } else {
    res.status(401).json({ error: "No active session" });
  }
});

// Backend Test
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
