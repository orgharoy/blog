const API_URL = "http://localhost:3000/api";

const apiRoutes = {

  createBlog: `${API_URL}/blog/`,
  getBlogs: `${API_URL}/blogs/`,
  getBlogById: `${API_URL}/blog/`,

  createComment: `${API_URL}/comment/`,
  getComments: `${API_URL}/comment/`,


  
};

export default apiRoutes;