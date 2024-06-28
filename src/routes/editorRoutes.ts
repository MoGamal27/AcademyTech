import { Router } from 'express';
import {
  publishBlog,
  unpublishBlog,
  deleteBlog,
  getAllPublished,
  getAllSubmissions,
  getAllDrafts,
  getOneBlog,
} from '../controllers/EditorController';
import { protect } from '../middleware/authMiddleware.ts';

const router = Router();

router.put('/editor-blog-publish/:id', protect, publishBlog);
router.put('/editor-blog-unpublish/:id', protect, unpublishBlog);
router.delete('/editor-blog-delete/:id', protect, deleteBlog);
router.get('/editor-get-all-published', protect, getAllPublished);
router.get('/editor-get-all-submissions', protect, getAllSubmissions);
router.get('/editor-get-all-drafts', protect, getAllDrafts);
router.get('/editor-get-one-blog/:id', protect, getOneBlog);

export default router;
