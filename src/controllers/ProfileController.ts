import { Request, Response } from 'express';
import User from '../models/userModel';

// Get public profile
export const getPublicProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password -email');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get private profile
export const getPrivateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update profile
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user?._id, req.body, { new: true });
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
