import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import cardRoutes from './routes/cardRoutes'
import path from 'path';

dotenv.config();
// TODO Check this file 

const app = express();
connectDB();
app.use(express.json());
app.use('/api/cards', cardRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
