import express from 'express'
import { register, login, updateProfile, getCurrentUser, getAllUsers } from '../controllers/authController.js'
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/update',auth, updateProfile);
router.get('/me',auth, getCurrentUser);

export default router;