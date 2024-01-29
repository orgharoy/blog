import Blog from "../models/blogs.js";

export const createBlog = async (req, res) => {
  try {
    const { userId, title, body } = req.body;
    console.log(req.body);
    // Create a new blog post
    const newBlog = await Blog.create({ userId, title, body });

    res.status(201).json({
      message: 'Blog Successfully Posted',
      blog: newBlog,
    });
  } catch (error) {
    console.error('Error creating blog post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBlogsById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { userId, title, body } = req.body;

    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    await blog.update({ userId, title, body });
    res.json(blog);
  } catch (error) {
    console.error('Error updating blog by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    await blog.destroy();

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

