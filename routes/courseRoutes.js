const express = require('express');
const {
  addCourse,
  deleteCourse,
  getCourseById,
  getCourses,
  updateCourse
} = require('../controllers/courseController');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(getCourses());
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const course = getCourseById(id);
  if (!course) {
    return res.status(404).json({ message: 'Course not found' });
  }
  res.json(course);
});

router.post('/', (req, res) => {
  const { id, name } = req.body || {};
  if (typeof id === 'undefined' || !name) {
    return res.status(400).json({ message: 'Both id and name are required' });
  }
  try {
    const created = addCourse({ id: Number(id), name });
    res.status(201).json(created);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const existing = getCourseById(id);
  if (!existing) {
    return res.status(404).json({ message: 'Course not found' });
  }
  const updated = updateCourse(id, req.body || {});
  res.json(updated);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const deleted = deleteCourse(id);
  if (!deleted) {
    return res.status(404).json({ message: 'Course not found' });
  }
  res.status(204).send();
});

module.exports = router;
