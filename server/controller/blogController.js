import Blog from "../models/blogs.js";

export const createBlog = async (req, res) => {
  try {
    console.log(req.body);

    const { userId, title, body } = req.body;

    // Creating a new blog instance
    const newBlog = new Blog({ userId, title, body });

    // Saveing the blog record to the database
    const savedBlog = await newBlog.save();

    res.status(201).json(savedBlog);

  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const getBlogs = async (req, res) => {
  try {

    const allBlogs = await Blog.find();
    res.status(200).json(allBlogs);

  } catch (error) {

    console.error('Error fetching all blogs:', error);
    res.status(500).send('Internal Server Error');

  }
};

export const getBlogsById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const updateBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;

    // Find the blog by ID and update its title and body
    const updatedBlog = await Blog.findByIdAndUpdate(id, { title, body }, { new: true });

    if (!updatedBlog) {
      // If the blog with the specified ID is not found
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog by ID:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog by ID:', error);
    res.status(500).send('Internal Server Error');
  }
};

