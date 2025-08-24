import express from 'express';
import {
  createPost, updatePost, deletePost,
  getAllPosts, getSinglePost,
  likePost, commentPost
} from '../controllers/postController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getSinglePost);
router.post('/', requireAuth, createPost);
router.put('/:id', requireAuth, updatePost);
router.delete('/:id', requireAuth, deletePost);
router.post('/:id/like', requireAuth, likePost);
router.post('/:id/comment', requireAuth, commentPost);

export default router;
