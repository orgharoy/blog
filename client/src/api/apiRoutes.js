const API_URL = "http://localhost:3000/api";

const apiRoutes = {

  createBlog: `${API_URL}/blog/`,
  getBlogs: `${API_URL}/blogs/`,
  getBlogById: `${API_URL}/blog/`,
  getFavouriteBlog: `${API_URL}/blogs/favourite/`,
  deleteBlog: `${API_URL}/blog/`,
  updateBlog: `${API_URL}/blog/`,

  createComment: `${API_URL}/comment/`,
  getComments: `${API_URL}/comment/`,
  updateComment: `${API_URL}/comment/`,
  deleteComment: `${API_URL}/comment/`,

  makeFavourite: `${API_URL}/favorite/`,
  deleteFavourite: `${API_URL}/favorite/`,
  
};

export default apiRoutes;