import { Router } from 'express';
import {
  createBlog,
  updateBlog,
  submitBlog,
  withdrawBlog,
  deleteBlog,
  getOneBlog,
  getAllDrafts,
  getAllSubmissions,
  getAllPublished,
} from '../controllers/WriterController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/writer-blog-create', protect, createBlog);
router.put('/writer-blog-update/:id', protect, updateBlog);
router.put('/writer-blog-submit/:id', protect, submitBlog);
router.put('/writer-blog-withdraw/:id', protect, withdrawBlog);
router.delete('/writer-blog-delete/:id', protect, deleteBlog);
router.get('/writer-get-one-blog/:id', protect, getOneBlog);
router.get('/writer-get-all-drafts', protect, getAllDrafts);
router.get('/writer-get-all-submissions', protect, getAllSubmissions);
router.get('/writer-get-all-published', protect, getAllPublished);

export default router;
