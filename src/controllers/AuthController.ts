import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/userModel';

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password, confirmPassword, role, avatar } = req.body;

    if (password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
      avatar,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login a user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout the current user
export const logoutUser = (req: Request, res: Response): void => {
  res.status(200).json({ message: 'Logged out successfully' });
};

// Refresh the token
export const refreshToken = (req: Request, res: Response): void => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.status(200).json({ token: newToken });
  } catch (error) {
    res.status(401).json({ message: 'Token refresh failed', error: error.message });
  }
};
