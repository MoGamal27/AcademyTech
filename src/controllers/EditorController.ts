import { Request, Response } from 'express';
import Blog from '../models/blogModel';
import { IUser } from '../models/userModel';

// Publish a blog
export const publishBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    blog.isPublished = true;
    blog.publishedAt = new Date();
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Unpublish a blog
export const unpublishBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    blog.isPublished = false;
    blog.publishedAt = undefined;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a blog
export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    res.status(200).json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all published blogs
export const getAllPublished = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find({ isPublished: true }).populate('author');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all submissions
export const getAllSubmissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find({ isSubmitted: true }).populate('author');
    res.status(200).json(blogs);
  } catch (error) {
    res.status{500}.json({ error: error.message });
  }
};

// Get all drafts
export const getAllDrafts = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find({ isDraft: true }).populate('author');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get one blog
export const getOneBlog = async (req: Request, res: Response): Promise<void> => {
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
