import Comment from "../models/comments.js";
import Blog from "../models/blogs.js";

export const createComment = async (req, res) => {
    try {
      const { blogId, name, email, body } = req.body;
      console.log(req.body);

      const newComment = await Comment.create({ blogId, name, email, body });
  
      res.status(201).json({
        message: 'Comment Successfully Posted',
        comment: newComment,
      });
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getCommentByBlogId = async (req, res) => {
  try {
    const blogId = req.params.blogId;

    const comments = await Comment.findAll({
      where: { blogId },
      order: [['createdAt', 'DESC']] // Order by createdAt in descending order
    });

    res.json(comments);
  } catch (error) {
    console.error('Error fetching comments by blogId:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateCommentById = async (req, res) => {
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

export const deleteCommentByID = async (req, res) => {
    try {
      const commentId = req.params.id;
      const comment = await Comment.findByPk(commentId);
  
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      await comment.destroy();
  
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error('Error deleting comment by ID:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };