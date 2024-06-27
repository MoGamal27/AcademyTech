import { Router } from 'express';
import {
  getBlogById,
  getBlogByEndpoint,
  getBlogsByTag,
  getLatestBlogs,
  getBlogsByAuthor,
  getSimilarBlogs,
} from '../controllers/BlogController';

const router = Router();

router.get('/blog-detail-by-id/:id', getBlogById);
router.get('/blog-detail-by-endpoint/:endpoint', getBlogByEndpoint);
router.get('/blogs-by-tag/:tag', getBlogsByTag);
router.get('/blogs-latest', getLatestBlogs);
router.get('/blogs-author/:authorId', getBlogsByAuthor);
router.get('/blogs-similar/:id', getSimilarBlogs);

export default router;
