import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';
import blogRetrievalRoutes from './routes/blogRetrievalRoutes'
import editorRoutes from './routes/editorRoutes';
import profile from './routes/profileRoutes';
import writer from './routes/writerRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/blog', blogRetrievalRoutes);
app.use('/api/editor', editorRoutes);
app.use('/api/profile', profile);
app.use('/api/writer', writer);

mongoose.connect(process.env.MONGO_URI!, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });
