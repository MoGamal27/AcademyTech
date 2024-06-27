import { Router } from 'express';
import userRoutes from './userRoutes';
import profileRoutes from './profileRoutes';
import writerRoutes from './writerRoutes';
import editorRoutes from './editorRoutes';
import blogRetrievalRoutes from './blogRetrievalRoutes';

const router = Router();

router.use('/user', userRoutes);
router.use('/profile', profileRoutes);
router.use('/writer', writerRoutes);
router.use('/editor', editorRoutes);
router.use('/blog', blogRetrievalRoutes);

export default router;
