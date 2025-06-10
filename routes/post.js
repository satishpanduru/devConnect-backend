import express from 'express'
import { createPost, getPosts, toggleLikePost, likePost, unlikePost, deletePost, updatePost } from '../controllers/postController.js'
import auth from '../middleware/authMiddleware.js'

const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);
router.put('/:id/like', auth, likePost);
router.put('/:id/unlike', auth, unlikePost);
router.put('/:id/toggle-like', auth, toggleLikePost);
router.delete('/:id', auth, deletePost);
router.put('/:id', auth, updatePost);

export default router;