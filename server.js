import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import postRoutes from './routes/post.js';
import profileRoutes from './routes/userRoutes.js'

import userRoutes from './routes/auth.js'

dotenv.config();
const app = express();

app.use(cors({
    origin:['http://localhost:3000', 'https://dev-connect-frontend-five.vercel.app'],
    creadentials: true
}));
app.use(express.json());

app.get('/', (req,res) => {
    res.send("api is working fine");
})

connectDB();

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', profileRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
