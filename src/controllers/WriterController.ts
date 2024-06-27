import { Request, Response } from 'express';
import Blog from '../models/blogModel';
import { IUser } from '../models/userModel';

// Create a new blog
export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, text, draftText, tags, imgUrl, blogUrl, score, isSubmitted, isDraft, isPublished } = req.body;
    const author = req.user as IUser;

    const newBlog = new Blog({
      title,
      description,
      text,
      draftText,
      tags,
      author,
      imgUrl,
      blogUrl,
      score,
      isSubmitted,
      isDraft,
      isPublished,
      createdBy: author,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a blog
export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, text, draftText, tags, imgUrl, blogUrl, score, isSubmitted, isDraft, isPublished, status, publishedAt } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        text,
        draftText,
        tags,
        imgUrl,
        blogUrl,
        score,
        isSubmitted,
        isDraft,
        isPublished,
        status,
        publishedAt,
        updatedBy: req.user as IUser,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedBlog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Submit a blog
export const submitBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    blog.isSubmitted = true;
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Withdraw a blog
export const withdrawBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }
    blog.isSubmitted = false;
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

// Get all drafts
export const getAllDrafts = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find({ author: req.user?._id, isDraft: true }).populate('author');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all submissions
export const getAllSubmissions = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find({ author: req.user?._id, isSubmitted: true }).populate('author');
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all published blogs
export const getAllPublished = async (req: Request, res: Response): Promise<void> => {
    try {
      const blogs = await Blog.find({ author: req.user?._id, isPublished: true }).populate('author');
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  