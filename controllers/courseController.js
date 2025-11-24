const courseList = [
  { id: 1, name: 'Node.js Basics' },
  { id: 2, name: 'JavaScript Refresher' }
];

function addCourse(course) {
  if (!course || typeof course.id === 'undefined') {
    throw new Error('Course object with a valid id is required.');
  }

  const exists = courseList.some(existingCourse => existingCourse.id === course.id);
  if (exists) {
    throw new Error(`Course with id ${course.id} already exists.`);
  }

  courseList.push(course);
  return course;
}

function getCourseById(id) {
  return courseList.find(course => course.id === id) || null;
}

function getCourses() {
  return [...courseList];
}

function updateCourse(id, updatedFields) {
  const index = courseList.findIndex(course => course.id === id);
  if (index === -1) {
    return null;
  }

  courseList[index] = {
    ...courseList[index],
    ...updatedFields,
    id: courseList[index].id
  };

  return courseList[index];
}

function deleteCourse(id) {
  const index = courseList.findIndex(course => course.id === id);
  if (index === -1) {
    return false;
  }

  courseList.splice(index, 1);
  return true;
}

module.exports = {
  addCourse,
  getCourseById,
  getCourses,
  updateCourse,
  deleteCourse
};
