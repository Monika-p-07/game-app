import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import gameRoutes from './routes/games';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4005;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/stone-paper-scissors';

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/games', gameRoutes);

// Database connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
