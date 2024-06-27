import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './userModel'; 

interface IBlog extends Document {
  title: string;
  description: string;
  text?: string;
  draftText?: string;
  tags: string[];
  author: IUser;
  imgUrl?: string;
  blogUrl: string;
  likes?: number;
  score: number;
  isSubmitted: boolean;
  isDraft: boolean;
  isPublished: boolean;
  status?: boolean;
  publishedAt?: Date;
  createdBy?: IUser;
  updatedBy?: IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

const blogSchema: Schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  text: {
    type: String,
  },
  draftText: {
    type: String,
  },
  tags: {
    type: [String],
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imgUrl: {
    type: String,
  },
  blogUrl: {
    type: String,
    required: [true, 'Blog URL is required'],
  },
  likes: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    required: [true, 'Score is required'],
  },
  isSubmitted: {
    type: Boolean,
    required: [true, 'Submission status is required'],
  },
  isDraft: {
    type: Boolean,
    required: [true, 'Draft status is required'],
  },
  isPublished: {
    type: Boolean,
    required: [true, 'Publication status is required'],
  },
  status: {
    type: Boolean,
  },
  publishedAt: {
    type: Date,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;
