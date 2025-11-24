const express = require('express');
const {
  addPost,
  deletePost,
  getPostById,
  getPosts
} = require('../controllers/postController');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(getPosts());
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const post = getPostById(id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json(post);
});

router.post('/', (req, res) => {
  const { id, name, dob } = req.body || {};
  if (typeof id === 'undefined' || !name || !dob) {
    return res.status(400).json({ message: 'id, name, and dob are required' });
  }
  try {
    const created = addPost({ id: Number(id), name, dob });
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const deleted = deletePost(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.status(204).send();
});

module.exports = router;
