import Post from '../models/Post.js';

export const createPost = async (req, res) => {
  const { title, content, category } = req.body;
  const post = await Post.create({ title, content, category, author: req.user._id });
  res.status(201).json(post);
};

export const updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post || post.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  post.title = req.body.title;
  post.content = req.body.content;
  post.category = req.body.category;
  await post.save();
  res.json(post);
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post || post.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  await post.deleteOne();
  res.json({ message: 'Post deleted' });
};

export const getAllPosts = async (req, res) => {
  const { search, category } = req.query;
  const query = {};
  if (search) query.title = { $regex: search, $options: 'i' };
  if (category) query.category = category;

  const posts = await Post.find(query).populate('author', 'username');
  res.json(posts);
};

export const getSinglePost = async (req, res) => {
  const post = await Post.findById(req.params.id).populate('author', 'username');
  res.json(post);
};

export const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const userId = req.user._id;

  const index = post.likes.indexOf(userId);
  if (index === -1) {
    post.likes.push(userId);
  } else {
    post.likes.splice(index, 1);
  }

  await post.save();
  res.json({ likes: post.likes.length });
};

export const commentPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.comments.push({ user: req.user._id, text: req.body.text });
  await post.save();
  res.json(post.comments);
};
