const posts = [
  { id: 1, name: 'Mr x', dob: '2025-11-08' },
  { id: 2, name: 'Mr y', dob: '2025-10-08' },
  { id: 3, name: 'Mr z', dob: '2025-09-23' }
];

function getPosts() {
  return [...posts];
}

function getPostById(id) {
  return posts.find(post => post.id === id) || null;
}

function addPost(post) {
  const exists = posts.some(existingPost => existingPost.id === post.id);
  if (exists) {
    throw new Error(`Post with id ${post.id} already exists.`);
  }
  posts.push(post);
  return post;
}

function deletePost(id) {
  const index = posts.findIndex(post => post.id === id);
  if (index === -1) {
    return false;
  }
  posts.splice(index, 1);
  return true;
}

module.exports = {
  getPosts,
  getPostById,
  addPost,
  deletePost
};
