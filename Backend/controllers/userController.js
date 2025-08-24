import User from '../models/User.js';
import Post from '../models/Post.js';

export const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  const posts = await Post.find({ author: req.user._id });
  res.json({ user, posts });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};
