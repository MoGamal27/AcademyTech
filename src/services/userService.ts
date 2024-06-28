import { User } from '../models/userModel';

export const getAllUsers = async () => {
  return await User.find();
};

export const getUserById = async (id: string) => {
  return await User.findById(id);
};

export const createUser = async (userData: any) => {
  const user = new User(userData);
  return await user.save();
};

export const updateUser = async (id: string, userData: any) => {
  return await User.findByIdAndUpdate(id, userData, { new: true });
};

export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};
