import { Request, Response } from 'express';
import Blog from '../models/blogModel';

// Get blog by ID
export const getBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author');
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get blog by endpoint
export const getBlogByEndpoint = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findOne({ blogUrl: req.params.endpoint }).populate('author');
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get blogs by tag
export const getBlogsByTag = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find({ tags: req.params.tag }).populate('author');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get latest blogs
export const getLatestBlogs = async (_req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(10).populate('author');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get blogs by author
export const getBlogsByAuthor = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find({ author: req.params.authorId }).populate('author');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get similar blogs
export const getSimilarBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    
    const similarBlogs = await Blog.find({
      _id: { $ne: blog._id },
      tags: { $in: blog.tags },
    }).limit(5).populate('author');
    
    res.status(200).json(similarBlogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
