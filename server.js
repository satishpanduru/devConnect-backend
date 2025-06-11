import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import postRoutes from './routes/post.js';
import profileRoutes from './routes/userRoutes.js'
import userRoutes from './routes/auth.js'

dotenv.config();
const app = express();
connectDB();

const allowedOrigins = [
  'http://localhost:3000',
  'https://dev-connect-frontend-five.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ msg: 'Backend is awake and working!' });
});

app.get('/', (req,res) => {
    res.send("api is working fine");
})



app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', profileRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
